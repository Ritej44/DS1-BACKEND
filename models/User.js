const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Schema ta3 l'utilisateur
const userSchema = new mongoose.Schema({
  nom: { type: String, required: true }, // nom mta3 l'utilisateur
  login: { type: String, required: true, unique: true }, // identifiant unique
  motDePasse: { type: String, required: true }, // mot de passe crypté
  role: { type: String, enum: ['user', 'manager'], default: 'user' }, // rôle : user wala manager
  dateCreation: { type: Date, default: Date.now } // date ta3 création
});

// kbal save ncryptiw l mot de passe
userSchema.pre('save', async function(next) {
  if (!this.isModified('motDePasse')) return next();
  this.motDePasse = await bcrypt.hash(this.motDePasse, 10);
  next();
});

// n9arnou les mots de passe kifkif walee
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.motDePasse);
};


module.exports = mongoose.model('User', userSchema);
