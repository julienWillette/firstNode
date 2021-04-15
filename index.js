const express = require("express");
const mongoose = require("mongoose")
const WilderModel = require("./models/Wilder")
const cors = require("cors");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const wilderModel = require("./models/Wilder");

const wilderController = require("./controllers/wilders");


//database
mongoose
    .connect("mongodb://127.0.0.1:27017/wilderdb", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        autoIndex: true,
    })
    .then(() => console.log("Connexion réussi"))
    .catch((err) => console.log("Connexion échoué", err));

app.get("/", (req, res) => {
    res.send("Hello World");
    // test a wilder creation
    WilderModel.init().then(() => {
        const firstWilder = new WilderModel({
            name: "Julien",
            city: "Marolles en Brie",
            skills: [
                { title: "HTML", votes: 10 },
                { title: "React", votes: 5 },
            ],
    });
    firstWilder
        .save()
        .then((result) => {
            console.log("sucess:", result);
        })
        .catch((err) => {
            console.log("error:", err);
        }); 
    });
});

app.post("/api/wilder/create", wilderController.create);

app.get("/api/wilder/read", wilderController.read);

app.put("/api/wilder/update", wilderController.update);

app.delete("/api/wilder/delete", wilderController.delete);

//start Server
app.listen(3001, () => console.log("Server started on 3001"));