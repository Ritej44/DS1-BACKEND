//nhadhrou l bch nekhdmou b express 
const express = require('express');
const app = express();

// hnee dotenv maneha bch nekhdhou les variables ml fichier env
require('dotenv').config();
//importina les routes handler
const userRoute= require('./routes/userRoute');
const authRoute = require('./routes/authroute')
const projectRoute = require('./routes/projectRoute')
const taskRoute = require('./routes/taskRoute')//hne ndeclariw el route o louta natiw l endpoint l bch naytoulha bih

//hedha variable port l jebneh m env
const PORT = process.env.PORT;

//importit les middleware cors header
const cors= require ('cors')
const cookieParser = require('cookie-parser');
const mongoose= require('mongoose')

//  middleware hedha bch activina bih CORS
//  bch nkhaliw l backend yekbel les requetes avec les methodes l hatinehom
app.use(cors({
  origin: ['http://localhost:4200', 'http://localhost:60398'],
  methods: ['GET', 'POST', 'PUT', 'DELETE','PATCH'],
 //Activit l’envoi des HTTP cookies et des Authorization headers l JWT bin front o back
  credentials: true
}));

// Ce middleware dit à Express :
// hnee bch el middleware ybadl l requete ml JSON l objet JavaScript.”
app.use(express.json());
// Celui-là permet à Express de lire les données envoyées depuis un formulaire HTML classique.
app.use(express.urlencoded({ extended: true }));
//  middleware ykhali Express  yakra l cookies l tba3thou ml navigateur.
app.use(cookieParser());
// atineh userroute o authroute bch nekhdmou bihom
app.use('/user',userRoute);
app.use('/auth', authRoute);
app.use('/project',projectRoute) ;
app.use('/task',taskRoute);//kol mara nzidou les endpoints bch ntestiw bihom o ywaliw yfonctionniw f api
// CONNEXION ll MongoDB
const connect = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/M1ISIDS");
    console.log("MongoDB database connected");
  } catch (err) {
    console.error(" MongoDB connection failed:", err);
    process.exit(1);
  }
};
//connect teb3a l mongo
connect();
//hnee bch naiw ll api enehou el port l bch yekhdm bih declarineh lfouk o jebneh m env
app.listen(PORT, () => {
    console.log(`Serveur lancé sur http://localhost:${PORT}`);
});