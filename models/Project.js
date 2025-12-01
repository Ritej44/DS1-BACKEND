const mongoose = require('mongoose');

// Schema ta3 projet
const projectSchema = new mongoose.Schema({
  nom: { type: String, required: true }, // nom du projet (obligatoire)
  description: { type: String }, // description du projet
  proprietaire: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // ID ta3 l'utilisateur 
  statut: { type: String, enum: ['Todo', 'done', 'doing'], default: 'en cours' }, // statut du projet
  dateCreation: { type: Date, default: Date.now } // date ta3 création
});

module.exports = mongoose.model('Project', projectSchema);
