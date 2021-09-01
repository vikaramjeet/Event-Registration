function validateForm() {
    if (validateFormDetails()) {
        document.getElementById('errorMsg').style.display = 'none';
        alert("Record is saved.");
    }
    return false;
}

function newRegistration() {
    window.location.href = "newForm.html";
}

var firstName;
var lastName;
var address;
var city;
var province;
var postalCode;
var phoneNumber;
var email;
var noOfUsers;
var btn;
var isDay1Checked;
var isDay2Checked;
var price;

let nameRegex = /^[a-zA-Z]+$/;
let cityRegex = /^[a-zA-Z]+$/;
let provinceRegex = /^[a-zA-Z]+$/;
let phoneRegex = /^[0-9]{3}[\-\s]?[0-9]{3}[\-\s]?[0-9]{4}$/;
let phoneRegexWithBracket = /^[(]?[0-9]{3}[)]?[0-9]{3}[\-\s]?[0-9]{4}$/;
let postalCodeRegex = /^[A-Za-z][0-9][A-Za-z][\s]?[0-9][A-Za-z][0-9]$/;
let emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+[\.][a-zA-Z0-9]+$/;
let noOfUsersRegex = /^[1-9][0-9]*$/;

function validateFormDetails() {
    firstName = document.getElementById('txtFirstName').value.trim();
    if (firstName == '') {
        showError('Please enter your first name');
        return false;
    }
    if (!nameRegex.test(firstName)) {
        showError('Special character or digits are not allowed in firstname');
        return false;
    }

    lastName = document.getElementById('txtLastName').value.trim();
    if (lastName == '') {
        showError('Please enter your last name');
        return false;
    }
    if (!nameRegex.test(lastName)) {
        showError('Special character or digits are not allowed in lastname');
        return false;
    }

    address = document.getElementById('txtAddress').value.trim();
    if (address == '') {
        showError('Please enter your address');
        return false;
    }

    city = document.getElementById('txtCity').value.trim();
    if (city == '') {
        showError('Please enter your city');
        return false;
    }
    if (!cityRegex.test(city)) {
        showError('Special character or digits are not allowed in city');
        return false;
    }

    province = document.getElementById('txtProvince').value.trim();
    if (province == '') {
        showError('Please enter your province');
        return false;
    }
    if (!provinceRegex.test(province)) {
        showError('Special character or digits are not allowed in province');
        return false;
    }

    postalCode = document.getElementById('txtPostalCode').value.trim();
    if (postalCode == '') {
        showError('Please enter your postal Code');
        return false;
    }
    if (!postalCodeRegex.test(postalCode)) {
        showError('Please enter postal code in proper format(A1A1A1)');
        return false;
    }

    phoneNumber = document.getElementById('txtPhoneNumber').value.trim();
    if (phoneNumber == '') {
        showError('Please enter your Phone number');
        return false;
    }
    
    if (!phoneRegex.test(phoneNumber) && !phoneRegexWithBracket.test(phoneNumber)) {
        showError('Please enter Phone number in proper format (111-111-1111) or (111)111-1111');
        return false;
    }

    email = document.getElementById('txtEmail').value.trim();
    if (email == '') {
        showError('Please enter your email address');
        return false;
    }
    if (!emailRegex.test(email)) {
        showError('Please enter email address in proper format including . and @ in it.');
        return false;
    }

    isDay1Checked = document.getElementById('chkDay1').checked;
    isDay2Checked = document.getElementById('chkDay2').checked;
    noOfUsers = document.getElementById('txtNoUsers').value.trim();

    if(!isDay1Checked && !isDay2Checked) {
        showError('Please choose any day for the registration or you can choose both.');
        return false;
    }

    
    if(noOfUsers == '') {
        showError('Please enter number of users you want to register for an event.');
        return false;
    }
    if(!noOfUsersRegex.test(noOfUsers)) {
        showError('Value should be greater than 0.');
        return false;        
    }

    if(isDay1Checked == true && !isDay2Checked) {
        price = 350 * noOfUsers;
        sessionStorage.setItem('days', 'Day 1');
    }

    if(isDay2Checked == true && !isDay1Checked) {
        price = 450 * noOfUsers;
        sessionStorage.setItem('days', 'Day 2');
    }

    if(isDay1Checked == true && isDay2Checked == true) {
        price = 750 * noOfUsers;
        sessionStorage.setItem('days', 'Day 1 & Day 2');
    }

    if(isDay1Checked == true && noOfUsers > 5) {
        price = (350 * noOfUsers) - (0.10 * 350 * noOfUsers) ;
        sessionStorage.setItem('days', 'Day 1');
    }

    if(isDay2Checked == true && noOfUsers > 5) {
        price = (450 * noOfUsers) - (0.10 * 450 * noOfUsers);
        sessionStorage.setItem('days', 'Day 2');
    }

    if(isDay1Checked == true && isDay2Checked == true && noOfUsers > 5) {
        price = (750 * noOfUsers) - (0.10 * 750 * noOfUsers);
        sessionStorage.setItem('days', 'Day 1 & Day 2');
    }

    sessionStorage.setItem('firstname', firstName);
    sessionStorage.setItem('lastname', lastName);
    sessionStorage.setItem('address', address);
    sessionStorage.setItem('city', city);
    sessionStorage.setItem('province', province);
    sessionStorage.setItem('postalcode', postalCode);
    sessionStorage.setItem('phonenumber', phoneNumber);
    sessionStorage.setItem('email', email);
    sessionStorage.setItem('noofusers', noOfUsers);
    sessionStorage.setItem('price', price);

    window.location.href = "output.html";
    return true;
}

function displaySavedItem() {
    document.getElementById('myResultDiv').style.display = 'block';
    document.getElementById('txtRName').innerHTML = sessionStorage.getItem('firstname') + " " + sessionStorage.getItem('lastname');
    document.getElementById('txtRAddress').innerHTML = sessionStorage.getItem('address');
    document.getElementById('txtRCity').innerHTML = sessionStorage.getItem('city');
    document.getElementById('txtRProvince').innerHTML = sessionStorage.getItem('province');
    document.getElementById('txtRPostalCode').innerHTML = sessionStorage.getItem('postalcode');
    document.getElementById('txtRPhoneNumber').innerHTML = sessionStorage.getItem('phonenumber');
    document.getElementById('txtREmail').innerHTML = sessionStorage.getItem('email');
    document.getElementById('txtRNoOfUsers').innerHTML = sessionStorage.getItem('noofusers');
    document.getElementById('txtRPrice').innerHTML = sessionStorage.getItem('price');
    document.getElementById('txtRNoOfDays').innerHTML = sessionStorage.getItem('days');
}

function showError(errorMsg) {
    document.getElementById('errorMsg').style.display = 'block';
    document.getElementById('errorMsg').innerHTML = errorMsg;
}