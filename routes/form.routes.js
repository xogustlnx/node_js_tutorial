
const db = require("../models");
const GoogleForm = db.GoogleForm;
const FormQuestion = db.FormQuestion;
const FormQuestionOption=db.FormQuestionOption;

const controller= require("../controllers/form.controller");
const req= require("express/lib/request")

module.exports = (app) =>{
    app.get("/form/first", controller.getFirst)
    app.post("/", controller.create)
  }