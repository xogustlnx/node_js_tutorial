const http = require('http');

const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 8000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(cors());

app.use('/static', express.static('public')); 

app.listen(port, () => console.log(`Server up and running on port ${port}.`));

require('./routes/form.routes')(app);

const db = require("./models");
const GoogleForm = db.GoogleForm;
const FormQuestion=db.FormQuestion;
const FormQuestionOption=db.FormQuestionOption;


app.get("/", async (req, res) => {
  console.log('---');
  const googleForm = await GoogleForm.findOne({})
  res.json({ message: "Welcome to our application.", googleForm:  googleForm});
});

app.get("/googleform/create", async (req, res) => {
  const googleForm = await GoogleForm.create({
    title: `${Math.random()}`,
  })

  res.json({ message: "welcome to our application", googleForm: googleForm});
});

app.get("/googleform/last", async(req,res)=>{
    const googleForm=await GoogleForm.findOne({
        order: [["createdAt", "DESC"]]
    })
    console.log('last google form')
    console.log(googleForm)
    console.log(googleForm.dataValues.title)
    

    const rawGoogleForm=await GoogleForm.findOne({
        order: [["createdAt", "DESC"]],
        raw: true
    })

    console.log('raw google form')
    console.log(rawGoogleForm)

    res.json({googleForm: googleForm, rawGoogleForm:rawGoogleForm})

})

app.get("/googleform/all", async(req, res)=>{
    const googleForm=await GoogleForm.findAll({
        order: [['id', 'DESC']]
    })

    res.json({googleForm:googleForm})
}) 

app.get("/googleform/first", async(req, res)=>{
    const googleForm= await GoogleForm.findOne({
        order: [["createdAt", "ASC"]],
    })

    const formQuestions = await googleForm.getFormQuestions()

    res.json({googleForm:googleForm, formQuestions:formQuestions})
    console.log(googleForm)
    console.log(formQuestions)
})

app.get("/googleform/:id", async (req,res) => {
  const googleFormId = req.params.id
  const googleForm = await GoogleForm.findOne({
    include: FormQuestion,
    where:{id:googleFormId}
  })

  console.log(googleForm);
  res.json({result: googleForm})
})

app.get("/googleformentire/:id", async (req,res) => {
  const googleFormId = req.params.id
  const googleForm = await GoogleForm.findOne({
    where: {id: googleFormId},
    include: [{model : FormQuestion, include: FormQuestionOption }]
  })
  
  res.json({result: googleForm})
})

app.get("/googleformentire", async (req,res) => {
  const googleForm = await GoogleForm.findAll({
    include: [{model : FormQuestion, include: FormQuestionOption }]
  })
  
  res.json({result: googleForm})
})

app.delete("/googleform/delete/:id", async (req,res) => {
  const googleFormId = req.params.id
  const deletedEntry = await GoogleForm.destroy({
    where: {id: googleFormId}
  })

  if (!deletedEntry){
    return res.status(404).send("not found")
  }

  return res.json({message: "success"})
})
app.delete("/googleform/deleteall", async (req,res) => {
  const deletedEntry = await GoogleForm.destroy({
  })

  if (!deletedEntry){
    return res.status(404).send("not found")
  }

  return res.json({message: "success"})
})

app.get("/formquestion/form", async(req, res)=>{
  const question = await FormQuestion.findOne({
    order: [["createdAt", "DESC"]]
  })

  const googleForm= await question.getGoogleForm()

  res.json({googleForm:googleForm, question:question})
}
)

app.get("/formquestion/create", async (req, res) => {
    const question = await FormQuestion.create({
      googleFormId: 1,
    })
  
    res.json({ message: "welcome to our application", question:question});
  });

app.delete("/formquestion/delete/:id", async (req,res) => {
    const formQuestionId = parseInt(req.params.id);
  
    const deletedEntry = await FormQuestion.destroy({
      where: {id: formQuestionId}
    })
  
    if (!deletedEntry){
      return res.status(404).send("not found")
    }
  
    return res.json({message: "success"})
  })

  app.delete("/formquestion/deleteall", async (req,res) => {
  
    const deletedEntry = await FormQuestion.destroy({
    })
  
    if (!deletedEntry){
      return res.status(404).send("not found")
    }
  
    return res.json({message: "success"})
  })

  