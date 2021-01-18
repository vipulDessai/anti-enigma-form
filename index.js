// 16 + 3 spaces
const _cardNumberMaxLength = 19;
const _cvvMaxLength = 5;

const cardNumberInputElement = document.getElementById('card-number');
const removeAllCharsAcceptDigits = (e) => {
    let cardNumberWithSpaces = e.target.value;
    let cardNumber = cardNumberWithSpaces.replace(/[\s]/g, '');

    if(/[^\s\d]/g.test(cardNumber)) {
        cardNumber = cardNumberWithSpaces.replace(/[^\s\d]/g, '');
        showError(e.target, 'Please enter numbers only');
    }

    let i = 0;
    let validatedCardNumber = '';
    let loopToFormCardNumberWithSpaces = true;
    while (loopToFormCardNumberWithSpaces) {
        let startIndex = i;
        let endIndex = i + 1;

        if(endIndex >= cardNumber.length) {
            endIndex = cardNumber.length;
            loopToFormCardNumberWithSpaces = false;
        }

        let space = '';
        if(validatedCardNumber.length == 4 || validatedCardNumber.length == 9 || validatedCardNumber.length == 14)
            space = ' '
                  
        validatedCardNumber += space + cardNumber.slice(startIndex, endIndex);   
        ++i;     
    }

    e.target.value = validatedCardNumber;
}
cardNumberInputElement.addEventListener('keypress', removeAllCharsAcceptDigits);
cardNumberInputElement.addEventListener('keyup', removeAllCharsAcceptDigits);

const cardNameInputElement = document.getElementById('card-user-name');
const removeAllAcceptWordChars = (e) => {
    let cardName = e.target.value;
    // remove only digits and 2 or more spaces
    if(/[\d]/g.test(cardName)) {
        cardName = cardName.replace(/[\d]/g, '');
        showError(e.target, 'Please dont enter any digits');
    }

    // check if the card number has more than 1 space
    if(/[\s]{2,}/g.test(cardName)) {
        cardName = cardName.replace(/[\s]{2,}/g, ' ');
        showError(e.target, null);
    }

    // remove non words and non spaces
    if(/[^\w\s]/g.test(cardName)) {
        cardName = cardName.replace(/[^\w\s]/g, '');
        showError(e.target, 'Please dont enter any special characters');
    }

    e.target.value = cardName;
}
cardNameInputElement.addEventListener('keyup', removeAllAcceptWordChars);
cardNameInputElement.addEventListener('keypress', removeAllAcceptWordChars);

// on change - country-code
const countryCodeInputElement = document.getElementById('country-code');
const onChangeCountryCode = (e) => {
    phoneNumberElement.value = '';
    phoneNumberElement.maxLength = e.target.selectedOptions[0].dataset.maxlength;
}
countryCodeInputElement.addEventListener('change', onChangeCountryCode);

const removeAllNonDigits = (e) => {
    let value = e.target.value;
    // remove only digits and 2 or more spaces
    if(/[\D]/g.test(value)) {
        value = value.replace(/[\D]/g, '');
        showError(e.target, 'Please enter digits only');
    }

    e.target.value = value;
}

// phone-number
const phoneNumberElement = document.getElementById('phone-number');
phoneNumberElement.addEventListener('keyup', removeAllNonDigits);
phoneNumberElement.addEventListener('keypress', removeAllNonDigits);

// expiry-date
const expiryDateInputElement = document.getElementById('expiry-date');
const removeAllNonDigitsAndAddSlash = (e) => {
    let date = e.target.value;

    if(/[\D]/g.test(date)) {
        date = date.replace(/[\D]/g, '');
        showError(e.target, 'Please dont enter characters or special characters');
    }

    let i = 0;
    let validatedDate = '';
    let loop = true;
    while (loop) {
        let startIndex = i;
        let endIndex = i + 1;

        if(endIndex >= date.length) {
            endIndex = date.length;
            loop = false;
        }

        let slash = '';
        if (validatedDate.length == 2)
            slash = '/';

        validatedDate += slash + date.slice(startIndex, endIndex);

        ++i;
    }

    e.target.value = validatedDate;

    // check valid expiry date
    if(validatedDate.length == _cvvMaxLength) {
        const currentYear = new Date().getFullYear();
        const [month, year] = validatedDate.split('/');
        if(month < 1 && month > 12)
            showError(e.target, 'Invalid Month')
        else if(`${20}${year}` < currentYear)
            showError(e.target, 'Invalid Year')
    }
}
expiryDateInputElement.addEventListener('keyup', removeAllNonDigitsAndAddSlash);
expiryDateInputElement.addEventListener('keypress', removeAllNonDigitsAndAddSlash);

// cvc
const cvvInputElement = document.getElementById('cvc');
cvvInputElement.addEventListener('keyup', removeAllNonDigits);
cvvInputElement.addEventListener('keypress', removeAllNonDigits);

const onfucusCvv = (e) => {
    const card = document.getElementById('credit-card');
    card.classList.add('active');
}
const onBlurCvv = (e) => {
    const card = document.getElementById('credit-card');
    card.classList.remove('active');
}
cvvInputElement.addEventListener('focus', onfucusCvv);
cvvInputElement.addEventListener('blur', onBlurCvv);

// add err to the element
function showError(targetElement, message) {
    if(!message)
        return;
    
    
}