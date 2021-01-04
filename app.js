const express = require('express')
const bodyParser = require('body-parser')

const app = express();

const date = require(__dirname + '/date.js');

// To use ejs template we need to set view engine of app to ejs. It is similar to handlebar but a lot better.
app.set("view engine", "ejs")
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));
const port = process.env.PORT || 3000;
const items = ["Cook Food", "Eat Food"];
const works = [];

// Routes
app.get("/", (req, res) => {
  let day = date.getDate();
  res.render('list', {
    listTitle: day,
    newListItems: items
  });
});

app.post("/", (req, res) => {
  console.log(req.body)
  let newItem = req.body['newitem']
  if (req.body.list === 'Work') {
    works.push(newItem)
    res.redirect("/work")
  } else {
    items.push(newItem);
    res.redirect("/");
  }
})

app.get("/work", (req, res) => {
  res.render('list', {
    listTitle: "Work List",
    newListItems: works
  });
});

app.post("/work", (req, res) => {
  let newWork = req.body.newitem;
  works.push(newWork);
  res.redirect("/work");
});

app.get("/about", (req, res) => {
  res.render('about');
});

app.listen(port || 3000, () => {
  console.log('ToDo server is up and running on port ', port)
});
