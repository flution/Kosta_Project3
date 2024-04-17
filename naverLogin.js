var naverLogin = new naver.LoginWithNaverId({
    clientId: "CdRZPSjvywZeSCNP6MBF",
    callbackUrl: "http://127.0.0.1:5500/naverRedirect.html",
    loginButton: { color: "green", type: 1, height: 50}
});

// 네이버 로그인 버튼 생성
naverLogin.init();

// 로그인 완료 후 콜백 함수 정의
naverLogin.getLoginStatus(function (status) {
    if (status) {
        var accessToken = naverLogin.getAccessToken();
        // 사용자 정보 가져오기
        naverLogin.getUserProfile(function (userProfile) {
            // 사용자 정보 출력
            console.log("네이버 아이디로 로그인이 완료되었습니다.");
            console.log("사용자 이름:", userProfile.getName());
            console.log("사용자 이메일:", userProfile.getEmail());
            console.log("프로필 사진 URL:", userProfile.getProfileImage());
        });
    } else {
        console.log("네이버 아이디로 로그인 실패");
    }
});