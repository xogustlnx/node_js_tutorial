const db = require("../models");
const GoogleForm = db.GoogleForm;
const FormQuestion = db.FormQuestion;
const FormQuestionOption=db.FormQuestionOption;

exports.getFirst = async (req, res) => {
    console.log('---');
    const googleForm = await GoogleForm.findOne({})
    return res.json({ message: "Welcome to our application.", googleForm: googleForm });
  }

exports.create=async(req,res) =>{
  const form = await GoogleForm.create({
    title: req.body.title,
    desc: req.body.desc
  })

  const questions= req.body.questions
  await questions.forEach(async(question, index)=>{
    const options = question.options
    const formQuestion= await FormQuestion.create({
      googleFormId: form.id,
      title :  question.title,
      desc : question.desc,
      qType :  question.qType,
    })
    await options.forEach(async(option,index)=>{
      const formQuestionOption=await FormQuestionOption.create({
        formQuestionId : formQuestion.id,
        title: option.title,
        desc: option.desc,
      })
    })

  })
  return res.json({success: true, from: form})
}