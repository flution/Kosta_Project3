function loginWithGoogle() {
    // Google 로그인 창을 팝업으로 열기
    window.open('https://accounts.google.com/o/oauth2/auth' +
        '?client_id=184810592518-q1dsp9gb1pqq3g8dmujuo2k3sks81ub2.apps.googleusercontent.com' + // 클라이언트 ID
        '&redirect_uri=http://127.0.0.1:5500/html/googleRedirect.html' + // 리다이렉트 URI
        '&response_type=token' +
        '&scope=email profile', // 요청할 권한(scope)
        'google-login', 'width=500, height=600');
}

// 로그인 후 리다이렉트되는 페이지에서 사용될 함수
function handleGoogleLogin() {
    // URL에서 액세스 토큰 파싱
    const urlParams = new URLSearchParams(window.location.hash.substring(1));
    const accessToken = urlParams.get('access_token');

    // 액세스 토큰을 로컬 스토리지에 저장
    localStorage.setItem('access_token', accessToken);

    // 액세스 토큰을 사용하여 사용자 정보 요청
    fetch('https://www.googleapis.com/oauth2/v1/userinfo', {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    })
    .then(response => response.json())
    .then(userInfo => {
        console.log('사용자 정보:', userInfo);
        alert('구글 로그인 성공!\n사용자 이름: ' + userInfo.name);
    
    })
    .catch(error => {
        console.error('사용자 정보 가져오기 실패:', error);
        alert('사용자 정보 가져오기 실패');
    });
}