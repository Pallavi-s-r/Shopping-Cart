const mongoose = require("mongoose");


const isValid = function (value) {
  if (typeof value == undefined || value == null || value.length == 0 ) return false;
  if (typeof value === "string" && value.trim().length === 0) return false;
  return true;
};

const isValidBody = function (data) {
  return Object.keys(data).length > 0;
};


const isValidPassword = function (password) {
    const length = password.length;
    if (length < 9 || length > 14) {
        return false;
      }
      return true;
};


const isValidName = function (name) {
  if (/^[a-z ,.'-]+$/i.test(name)) return true;
  return false;
};

const isValidNumber = function (number) {
  if (/^[0]?[6789]\d{9}$/.test(number)) return true;
  return false;
};

const isValidId = function (id) {
  return mongoose.Types.ObjectId.isValid(id);
};

const isValidPincode = function (pincode){
  return /^[1-9][0-9]{5}$/.test(pincode);
};

const isValidEmail = function (mail) {
  if (/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(mail)) {
    return true;
  }
};



module.exports = {
  isValid,
  isValidBody,
  isValidPassword,
  isValidName,
  isValidNumber,
  isValidId,
  isValidPincode,
  isValidEmail,
};