const checkPassword = (password) => {
    const rules = {
        lowercase: /[a-z]/,
        uppercase: /[A-Z]/,
        numberAndSymbol: /[\d!@#$%^&*()\-_=+[\]{}|;:'",.<>?/~`]/,
        minimumChar: /.{8,}/
    };

    return Object.fromEntries(
        Object.entries(rules).map(([key, regex]) => [key, regex.test(password)])
    );
};

const passwordStrength = (validation) => {
    const strength = Object.values(validation).filter(Boolean).length;
    return ['weak', 'weak', 'weak', 'mid', 'strong'][strength];
};

const formPassword = document.getElementById('form-password');
const inputPassword = document.getElementById('password');
const strengthBox = document.getElementById('strength');
const validationContainer = document.getElementById('validation-container');

const updateValidationUI = (validation) => {
    ['lowercase', 'uppercase', 'numberAndSymbol', 'minimumChar'].forEach((key, index) => {
        const row = Math.floor(index / 2);
        const col = index % 2;
        validationContainer.children[row].children[col].style.backgroundColor = validation[key] ? 'green' : 'white';
    });
};

let validatedPassword;
inputPassword.addEventListener('input', (e) => {
    validatedPassword = checkPassword(e.target.value);
    strengthBox.textContent = passwordStrength(validatedPassword);
    updateValidationUI(validatedPassword);
});

formPassword.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!Object.values(validatedPassword).every(Boolean)) {
        alert('Password anda tidak sesuai');
    } else {
        alert('Password anda sangat crot');
    }
});