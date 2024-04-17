function loginWithKakao() {
    const clientId = 'YOUR_CLIENT_ID'; // 카카오 개발자 웹 사이트에서 발급받은 클라이언트 아이디
    const redirectUri = encodeURIComponent(window.location.origin + '/kakaoRedirect.html'); // 리다이렉트 URI를 현재 도메인의 kakaoRedirect.html로 설정
    const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code`;
    window.location.href = kakaoAuthUrl; // 현재 창에서 카카오 로그인 페이지로 이동합니다.
}

// 로그인 후 리다이렉트되는 페이지에서 사용될 함수
function handleKakaoLogin() {
    // URL에서 인증 코드 파싱
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    // 클라이언트 아이디와 클라이언트 시크릿 설정
    const clientId = 'YOUR_CLIENT_ID'; // 카카오 개발자 웹 사이트에서 발급받은 클라이언트 아이디
    const clientSecret = 'YOUR_CLIENT_SECRET'; // 카카오 개발자 웹 사이트에서 발급받은 클라이언트 시크릿

    // 리다이렉트 URI 설정
    const redirectUri = window.location.origin + '/kakaoRedirect.html'; // 현재 도메인의 kakaoRedirect.html로 설정

    // 인증 코드를 사용하여 액세스 토큰 요청
    fetch('https://kauth.kakao.com/oauth/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `grant_type=authorization_code&client_id=${clientId}&client_secret=${clientSecret}&redirect_uri=${redirectUri}&code=${code}`
    })
    .then(response => response.json())
    .then(data => {
        const accessToken = data.access_token;
        console.log('액세스 토큰:', accessToken);

        // 액세스 토큰을 사용하여 사용자 정보 요청
        fetch('https://kapi.kakao.com/v2/user/me', {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        .then(response => response.json())
        .then(userInfo => {
            console.log('사용자 정보:', userInfo);
            alert('카카오 로그인 성공!\n사용자 이름: ' + userInfo.properties.nickname);
        })
        .catch(error => {
            console.error('사용자 정보 가져오기 실패:', error);
            if (error.message !== 'Failed to fetch') {
                alert('사용자 정보 가져오기 실패');
            }
        });
    })
    .catch(error => {
        console.error('액세스 토큰 요청 실패:', error);
        if (error.message !== 'Failed to fetch') {
            alert('액세스 토큰 요청 실패');
        }
    });
}

// 페이지 로드 시 호출하여 카카오 로그인 처리