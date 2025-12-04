const User = require('../models/User');
const bcrypt = require('bcrypt');


//nestamlou l methode async o await bch njibou l getallusers o nekhdmou b requeste o response
exports.getAllUsers = async (req, res) => {
  try {
    // Vérifier si l'utilisateur est un manager
    if (req.user.role !== 'manager') {
      return res.status(403).json({ message: "Accès refusé. Réservé aux managers." });
    }

    // Récupérer tt users
    const users = await User.find();

    // Renvoie tt users
    res.status(200).json({ users });
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la récupération des utilisateurs', error: err.message });
  }
};


exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    // Vérifier si l'utilisateur est un manager ou si c'est son propre compte
    if (req.user.id !== id && req.user.role !== 'manager') {
      return res.status(403).json({ message: 'Seul le manager peut voir les utilisateurs' });
    }

    // Récupérer l'utilisateur par son ID
    const user = await User.findById(id);

    // Vérifier si l'utilisateur existe
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur n\'existe pas' });
    }

    // Renvoie les données mta l'utilisateur
    res.status(200).json({ user });
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de l\'affichage', error: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    //declarit l id f parametre
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ message:'utilisateur n\'existe pas' });
    }
    res.status(200).json({ message: 'utilisateur ' });
  } catch (err) {
    res.status(500).json({ message: 'erreur lors de la suppression ' });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params.id;
    const { nom, login, motDePasse } = req.body;

    // check el role mta user
    if (req.user.id !== id && req.user.role !== 'manager') {
      return res.status(403).json({ message: 'vous n\'etes pas autorisé' });
    }

    //ken user yjareb yupdati mankhaliwhch
    if (req.body.role && req.user.role !== 'manager') {
      return res.status(403).json({ message: 'vous n\'etes pas autorisé' });
    }

    //namlo hachage ll mot de passe
    let hashedPassword;
    if (motDePasse) {
      hashedPassword = await bcrypt.hash(motDePasse, 10);
    }

    //nlawjou al user baad nupatiwh
    const user = await User.findByIdAndUpdate(
      id,
      {
        nom: nom || undefined,
        login: login || undefined,
        motDePasse: hashedPassword || undefined,
       //ken manager
        role: req.user.role === 'manager' ? req.body.role : undefined,
      },
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'user n\'existe pas' });
    }

    res.status(200).json({ user });
  } catch (err) {
    res.status(500).json({ message: 'erreur lors de l\'update' });
  }
};

// Méthode pour créer un nouvel utilisateur
exports.createUser = async (req, res) => {
  try {
    const { nom, login, motDePasse, role } = req.body;

    // nverifiw l user mawjoud wale
    const existingUser = await User.findOne({ login });
    if (existingUser) {
      return res.status(400).json({ message: "Un utilisateur avec cet identifiant existe déjà." });
    }

    // Hacher l mot de passe
    const hashedPassword = await bcrypt.hash(motDePasse, 10);

    // nasn3ou utilisateur jdid
    const newUser = new User({
      nom,
      login,
      motDePasse: hashedPassword,
      role: role || 'user', // Par défaut, le rôle est 'user'
    });

    // nsajlou l user f base
    await newUser.save();

    res.status(201).json({ message: "Utilisateur créé avec succès." });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la création de l'utilisateur.", error: error.message });
  }
};
