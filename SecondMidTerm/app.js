const express = require("express");
const bodyParser = require("body-parser");
const moongose = require("mongoose");
const Users = require("./models/userModels");
const app = express();
const path = require('path');
const fileUplaod = require('express-fileupload');

app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUplaod());

app.use("/images", express.static("public/imgs"))
app.get("/", (req, res) => {
    res.render("registration");
});


app.post("/display", async (req, res) => {

    console.log(req.files);

    const user1 = new Users({ path: req.files.profilepic.name, fullname: req.body.fullname, email: req.body.email, phone: req.body.phone, country: req.body.country, state: req.body.state, city: req.body.city, address:req.body.address, zip:req.body.zip });
    console.log(user1);

    await user1.save().then(() => console.log('user saved'));
    req.files.profilepic.mv(path.resolve(__dirname, "public/imgs", req.files.profilepic.name));
    res.redirect("/display")
})
app.get("/display", async (req, res) => {
    await Users.find({}, function (err, docs) {
        var d = { "docs": docs };
        console.log(d);
        res.render("display", d)
    }).clone();
})
app.get("/delete/:id", async (req, res) => {
    await Users.deleteOne({ _id: req.params.id });
    res.redirect("/display")
})
app.listen(8000, () => {
    console.log("listing the port 8000");
});