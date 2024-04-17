let signUpBtn = document.getElementById("signUpBtn");
let signInBtn = document.getElementById("signInBtn");
let nameField = document.getElementById("namefield");
let title = document.querySelector(".form-box h1"); // h1 요소를 선택하기 위해 수정

signInBtn.onclick = () => {
    nameField.style.maxHeight = "0";
    title.textContent = "로그인"; // h1 요소의 텍스트를 변경
    signUpBtn.classList.add("disable");
    signInBtn.classList.remove("disable");
};

signUpBtn.onclick = () => {
    nameField.style.maxHeight = "60px";
    title.textContent = "회원가입"; // h1 요소의 텍스트를 변경
    signUpBtn.classList.remove("disable");
    signInBtn.classList.add("disable");
}

