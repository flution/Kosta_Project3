document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signup-form');

    signupForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        
        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
            const response = await fetch('/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, email, password })
            });

            if (response.ok) {
                window.location.href = '/'; // 회원가입 성공 시 루트 페이지로 이동
            } else {
                const data = await response.json();
                alert(data.error); // 실패 시 에러 메시지를 알림창으로 표시
            }
        } catch (error) {
            console.error('Error during signup:', error);
            alert('회원가입 중 오류가 발생했습니다.');
        }
    });
});