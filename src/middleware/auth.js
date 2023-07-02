const jwt = require("jsonwebtoken");
const userModel = require("../model/userModel");
const { isValidId } = require("../utils/validator");
const dotenv =require('dotenv').config()
const {SECRET_KEY}=process.env;


//athentication

const authenticate = function (req, res, next) {
  try {
    let token = req.headers.authorization;
    // console.log(req.headers.authorization)
    if (!token) {
        return res.status(401).send({ status: false, message: "token is missing" });
    }
    token = token.replace("Bearer", "").trim();
    // console.log(token)
    const decodedToken = jwt.verify(token, SECRET_KEY); 
    req.decodedToken = decodedToken.userId;
    next();
} catch(error){
  if(error.message =="Invalid token"){
      return res.status(401).send({status : false, message : "Enter valid token"})
  }
  return res.status(500).send({status : false, message : error.message})
}
};

//authorisation

const authorisation = async function (req, res, next) {
  try {
    let updateuserId = req.params.userId;

    if (!isValidId(updateuserId)) {
      return res.status(400).send({
        status: false,
        message: "Please provide valid UserId for details",
      });
    }

    let updatinguserId = await userModel.findById(updateuserId);
    if (!updatinguserId) {
      return res
        .status(404)
        .send({ status: false, message: "No user details found with this id" });
    }
    let userId = updatinguserId._id.toString();
    let id = req.decodedToken;
  
    if (id != userId)
      return res.status(403).send({
        status: false,
        message: "You are not authorised to perform this task",
      });

    next();
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error.message });
  }
};

module.exports = { authenticate, authorisation };