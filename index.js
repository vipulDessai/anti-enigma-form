// 16 + 3 spaces
const cardNumberMaxLength = 19;

const cardNumberInputElement = document.getElementById('card-number');
const removeAllCharsAcceptDigits = (e) => {
    let cardNumberWithSpaces = e.target.value;
    let cardNumber = cardNumberWithSpaces.replace(/ /g, '');

    if(isNaN(cardNumber)) {
        cardNumber = cardNumberWithSpaces.replace(/[^\s\d]/g, '');
        showError(e.target);
    }

    let i = 0;
    let validatedCardNumber = '';
    let loopToFormCardNumberWithSpaces = true;
    while (loopToFormCardNumberWithSpaces) {
        let startIndex = i;
        let endIndex = i + 4;

        if(endIndex >= cardNumber.length) {
            endIndex = cardNumber.length;
            loopToFormCardNumberWithSpaces = false;
        }

        let space = '';
        if(endIndex > 0 && endIndex % 4 == 0 && endIndex != cardNumberMaxLength - 3)
            space = ' '
                  
        validatedCardNumber += cardNumber.slice(startIndex, endIndex) + space;   
        i = i + 4;     
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
        showError(e.target);
    }

    // check if the card number has more than 1 space
    if(/[\s]{2,}/g.test(cardName)) {
        cardName = cardName.replace(/[\s]{2,}/g, ' ');
        showError(e.target);
    }

    // remove non words and non spaces
    if(/[^\w\s]/g.test(cardName)) {
        cardName = cardName.replace(/[^\w\s]/g, '');
        showError(e.target);
    }

    e.target.value = cardName;
}
cardNameInputElement.addEventListener('keyup', removeAllAcceptWordChars);
cardNameInputElement.addEventListener('keypress', removeAllAcceptWordChars);


function showError(targetElement) {
    // add err to the element
}