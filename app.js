const checkPassword = (password) => {
    const validation = {
        lowercase: false,
        uppercase: false,
        numberAndSymbol: false,
        minimumChar: false,
    };
    const rules = {
        lowercase: /[a-z]/,
        uppercase: /[A-Z]/,
        numberAndSymbols: /[\d!@#$%^&*()\-_=+\[\]{}|;:'",.<>?/~`]/,
    };

    for (const key in rules) {
        if (rules[key].test(password)) {
            validation[key] = true;
        }
    }

    if(password.length >= 8) {
        validation.minimumChar = true
    }

    return validation;
}

const passwordStrength = (validation) => {
    const strength = Object.values(validation).filter(Boolean).length;
    return strength === 4 ? 'strong' : strength === 3 ? 'mid' : strength === 2 ? 'weak' : 'weak'
};

const formPassword = document.getElementById('form-password')
const inputPassword = document.getElementById('password')
const strengthBox = document.getElementById('strength')
const validationContainter = document.getElementById('validation-container')
const buttonSubmit = document.getElementById('button-submit')

const lowercaseValidated = validationContainter.children[0].children[0]
const uppercaseValidated = validationContainter.children[0].children[1]
const numberAndSymbolsValidated = validationContainter.children[1].children[0]
const minimumCharValidated = validationContainter.children[1].children[1]


let validatedPassword 
inputPassword.addEventListener('input', (e) => {
    let password = e.target.value
    validatedPassword = checkPassword(password)
    const strength = passwordStrength(validatedPassword)
    strengthBox.textContent = strength
    validatedPassword.lowercase ? lowercaseValidated.style.backgroundColor = 'green' : lowercaseValidated.style.backgroundColor = 'white'
    validatedPassword.uppercase ? uppercaseValidated.style.backgroundColor = 'green' : uppercaseValidated.style.backgroundColor = 'white'
    validatedPassword.numberAndSymbols ? numberAndSymbolsValidated.style.backgroundColor = 'green' : numberAndSymbolsValidated.style.backgroundColor = 'white'
    validatedPassword.minimumChar ? minimumCharValidated.style.backgroundColor = 'green' : minimumCharValidated.style.backgroundColor = 'white'
})

formPassword.addEventListener('submit', (e) => {
    e.preventDefault()
    if(validatedPassword) {
        if (!(validatedPassword.lowercase && validatedPassword.uppercase && validatedPassword.numberAndSymbol && validatedPassword.minimumChar)) {
            alert('Password anda tidak sesuai')
        } else {
            alert('Password anda sangat crot');
        }
    }
})
