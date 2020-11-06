/* 
LUHN ALGORITHM -> https://en.wikipedia.org/wiki/Luhn_algorithm#Description

The formula verifies a number against its included check digit, which is usually appended to a partial account number to generate the full account number. This number must pass the following test:

1- From the rightmost digit (excluding the check digit) and moving left, double the value of every second digit. The check digit is neither doubled nor included in this calculation; the first digit doubled is the digit located immediately left of the check digit. If the result of this doubling operation is greater than 9 (e.g., 8 × 2 = 16), then add the digits of the result (e.g., 16: 1 + 6 = 7, 18: 1 + 8 = 9) or, alternatively, the same final result can be found by subtracting 9 from that result (e.g., 16: 16 − 9 = 7, 18: 18 − 9 = 9).
2- Take the sum of all the digits (including the check digit).
3- If the total modulo 10 is equal to 0 (if the total ends in zero) then the number is valid according to the Luhn formula; otherwise it is not valid.

---------------------------------------

First Digit /	Company
     3	    / Amex (American Express)
     4	    / Visa
     5	    / Mastercard
     6	    / Discover
*/

// All valid credit card numbers
const valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8];
const valid2 = [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9];
const valid3 = [3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6];
const valid4 = [6, 0, 1, 1, 1, 4, 4, 3, 4, 0, 6, 8, 2, 9, 0, 5];
const valid5 = [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6];

// All invalid credit card numbers
const invalid1 = [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5];
const invalid2 = [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3];
const invalid3 = [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4];
const invalid4 = [6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5];
const invalid5 = [5, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4];

// Can be either valid or invalid
const mystery1 = [3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4];
const mystery2 = [5, 4, 6, 6, 1, 0, 0, 8, 6, 1, 6, 2, 0, 2, 3, 9];
const mystery3 = [6, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3];
const mystery4 = [4, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3];
const mystery5 = [4, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3];

// An array of all the arrays above
const batch = [valid1, valid2, valid3, valid4, valid5, invalid1, invalid2, invalid3, invalid4, invalid5, mystery1, mystery2, mystery3, mystery4, mystery5];

// Return true when an array contains digits of a valid credit card number and false when it is invalid
function validateCred(arr) {
  newArr = arr; // creates a copy
  newArr.reverse(); // reverse the array to loop forward
  let sum = 0;
  let oddSum = 0;
  // start from 1 to not consider the last digit
  for(let i = 1; i < newArr.length; i++) {
    if(i % 2 === 0) {
      sum += newArr[i];
    } else {
      oddSum = newArr[i] * 2;
      if(oddSum > 9) {
        sum += oddSum - 9;
      } else {
        sum += oddSum;
      };
    };
  };

  // here adds the last digit
  sum += newArr[0];

  return sum % 10 === 0;
};

// Check through the nested array for which numbers are invalid, and return another nested array of invalid cards
function findInvalidCards(arr) {
  let invalidCards = [];
  arr.forEach(card => {
    if(!validateCred(card)) {
      invalidCards.push(card.reverse()); // need to reverse the array because of validateCred
    };
  });

  return invalidCards;
};

// Return an array of companies that have mailed out cards with invalid numbers, without duplicates
function idInvalidCardCompanies(arr) {
  let companiesArray = [];

  for(let i = 0; i < arr.length; i++) {
    if(arr[i][0] === 3 && companiesArray.indexOf("Amex") === -1) {
      companiesArray.push("Amex");
    } else if(arr[i][0] === 4 && companiesArray.indexOf("Visa") === -1) {
        companiesArray.push("Visa");
    } else if(arr[i][0] === 5 && companiesArray.indexOf("Mastercard") === -1) {
        companiesArray.push("Mastercard");
    } else if(arr[i][0] === 6 && companiesArray.indexOf("Discover") === -1) {
        companiesArray.push("Discover");
    } else {
      console.log("Company not found");
    };
  };

  return companiesArray;
};

// Test
console.log(idInvalidCardCompanies(findInvalidCards(batch)));
