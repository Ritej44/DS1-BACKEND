const mongoose = require('mongoose');

// Schema ta3 tâche
const taskSchema = new mongoose.Schema({
  titre: { type: String, required: true }, // titre ta3 tâche (obligatoire)
  description: { type: String }, // description ta3 tâche
  statut: { type: String, enum: ['todo', 'doing', 'done'], default: 'todo' }, // statut ta3 tâche
  deadline: { type: Date }, // date limite
  projet: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true }, // ID ta3 projet li associé maah 
  utilisateurAssigne: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // ID ta3 l'utilisateur l andou el tache
  dateCreation: { type: Date, default: Date.now } // date ta3 création
});

module.exports = mongoose.model('Task', taskSchema);
