// 16 + 3 spaces
const _cardNumberMaxLength = 19;
const _expiryDateMaxLength = 5;
const _cvvMaxLength = 3;

const cardNumberInputElement = document.getElementById('card-number');
const dummyCardNumberElement = document.getElementById('dummy-card-number');
const removeAllCharsAcceptDigits = (e) => {
    let cardNumberWithSpaces = e.target.value;
    let cardNumber = cardNumberWithSpaces.replace(/[\s]/g, '');

    let errorNotFound = true;

    if(/[^\s\d]/g.test(cardNumber)) {
        cardNumber = cardNumberWithSpaces.replace(/[^\s\d]/g, '');
        showError(e.target, 'Please enter numbers only');
        
        errorNotFound = false;
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

    if(errorNotFound)
        hideErrorToolTip(e);
    
    dummyCardNumberElement.innerText = validatedCardNumber + '•••• •••• •••• ••••'.substring(validatedCardNumber.length, _cardNumberMaxLength);
}
cardNumberInputElement.addEventListener('keypress', removeAllCharsAcceptDigits);
cardNumberInputElement.addEventListener('keyup', removeAllCharsAcceptDigits);

const cardNameInputElement = document.getElementById('card-user-name');
const dummyCardNameElement = document.getElementById('dummy-card-user-name');
const removeAllAcceptWordChars = (e) => {
    let cardName = e.target.value;

    let errorNotFound = true;

    // remove only digits and 2 or more spaces
    if(/[\d]/g.test(cardName)) {
        cardName = cardName.replace(/[\d]/g, '');
        showError(e.target, 'Please dont enter any digits');

        errorNotFound = false;
    }

    // check if the card number has more than 1 space
    if(/[\s]{2,}/g.test(cardName)) {
        cardName = cardName.replace(/[\s]{2,}/g, ' ');
        showError(e.target, null);

        errorNotFound = false;
    }

    // remove non words and non spaces
    if(/[^\w\s]/g.test(cardName)) {
        cardName = cardName.replace(/[^\w\s]/g, '');
        showError(e.target, 'Please dont enter any special characters');

        errorNotFound = false;
    }

    e.target.value = cardName;

    if(errorNotFound)
        hideErrorToolTip(e);

    const dummyString = 'XXXX XXXX XXXX';
    dummyCardNameElement.innerText = cardName.length ? cardName : dummyString;
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

    let errorNotFound = true;

    // remove only digits and 2 or more spaces
    if(/[\D]/g.test(value)) {
        value = value.replace(/[\D]/g, '');
        showError(e.target, 'Please enter digits only');

        errorNotFound = false;
    }

    e.target.value = value;

    if(errorNotFound)
        hideErrorToolTip(e);

    if(e.target.id == 'cvc')
        dummyCvvElement.innerText = value + '•••'.substring(value.length, _cvvMaxLength)
}

// phone-number
const phoneNumberElement = document.getElementById('phone-number');
phoneNumberElement.addEventListener('keyup', removeAllNonDigits);
phoneNumberElement.addEventListener('keypress', removeAllNonDigits);

// expiry-date
const expiryDateInputElement = document.getElementById('expiry-date');
const dummyExpiryDateElement = document.getElementById('dummy-valid-thru');
const removeAllNonDigitsAndAddSlash = (e) => {
    let date = e.target.value;

    let errorNotFound = true;

    // remove added forward slash
    date = date.replace(/\//g, '');

    if(/[\D]/g.test(date)) {
        date = date.replace(/[\D]/g, '');
        showError(e.target, 'Please dont enter characters');

        errorNotFound = false;
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

    if(errorNotFound)
        hideErrorToolTip(e);

    dummyExpiryDateElement.innerText = validatedDate + '••/••'.substring(validatedDate.length, _expiryDateMaxLength);

    // check valid expiry date
    if(validatedDate.length == _expiryDateMaxLength) {
        const currentYear = new Date().getFullYear();
        const [month, year] = validatedDate.split('/');
        if(month < 1 || month > 12)
            showError(e.target, 'Please enter a month between 1 to 12');
        else if(`${20}${year}` < currentYear)
            showError(e.target, `Please enter a year greater than ${currentYear}`);
    }
}
expiryDateInputElement.addEventListener('keyup', removeAllNonDigitsAndAddSlash);
expiryDateInputElement.addEventListener('keypress', removeAllNonDigitsAndAddSlash);

// cvc
const cvvInputElement = document.getElementById('cvc');
const dummyCvvElement = document.getElementById('dummy-cvc');
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

const errorTooltip = document.getElementById('error-tooltip');
// hide tooltip on each blur event
const hideErrorToolTip = (e) => {
    errorTooltip.classList.add('hide');
}
cardNumberInputElement.addEventListener('blur', hideErrorToolTip);
cardNameInputElement.addEventListener('blur', hideErrorToolTip);
phoneNumberElement.addEventListener('blur', hideErrorToolTip);
expiryDateInputElement.addEventListener('blur', hideErrorToolTip);
cvvInputElement.addEventListener('blur', hideErrorToolTip);

// add err to the element
const showError = (targetElement, message) => {
    if(!message)
        return;

    errorTooltip.style.top = `${targetElement.offsetTop + 35}px`;
    errorTooltip.style.left = `${targetElement.offsetLeft + 5}px`;
    
    errorTooltip.classList.remove('hide');
    errorTooltip.querySelector('p').innerText = message;
}