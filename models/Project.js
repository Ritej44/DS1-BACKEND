// model hedha mtaa "Project" bch n5abiw fih projets fi database

const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({

  name: { type: String, required: true },

  description: { type: String },

  // L’owner houwa l’utilisateur li 3mal projet (référence tsirbel id)
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

  status: { 
    type: String, 
    enum: ['en cours', 'termine', 'en pause'], // valeurs autorisées
    default: 'en cours' // par défaut projet mched fih
  },

  //automatiquement fi Date.now
  createdAt: { type: Date, default: Date.now }
});

// Nsajjlou schema bch nestamlou mbaedf controller 
module.exports = mongoose.model('Project', projectSchema);