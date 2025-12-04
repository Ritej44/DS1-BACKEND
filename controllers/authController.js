const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Méthode register
const register = async (req, res) => {
  try {
    const { nom, login, motDePasse, role } = req.body;

    // nverifiw user mawjoud déjà wale
    const existingUser = await User.findOne({ login });
    if (existingUser) {
      return res.status(400).json({ message: "Un utilisateur avec cet identifiant existe déjà." });
    }

    // nasn3ou user jdid
    const newUser = new User({
      nom,
      login,
      motDePasse, // pre-save amlneha fel modèle heya l taml cryptage auto ll passe
      role: role || 'user', // declarit eli rôle par défaut user
    });

    // save fel mongo
    await newUser.save();

    res.status(201).json({ message: "Utilisateur enregistré avec succès." });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de l'enregistrement de l'utilisateur.", error: error.message });
  }
};

// fct connecter utilisateur
const login = async (req, res) => {
  try {
    const { login, motDePasse } = req.body;

    // nverifiw l user mawjoud walee
    const user = await User.findOne({ login });
    if (!user) {
      return res.status(401).json({ message: "Identifiant ou mot de passe incorrect." });
    }

    // nchoufou ken password valid ou non 
    const isPasswordValid = await user.comparePassword(motDePasse);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Identifiant ou mot de passe incorrect." });
    }

    // nasn3ou token nkhaliw l id o role 
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '1h' }
    );

    //houni bch nraj3ou el token en format json
    res.status(200).json({ token, userId: user._id, role: user.role });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la connexion.", error: error.message });
  }
};

//  déconnecter el utilisateur
const logout = (req, res) => {
  res.status(200).json({ message: "Déconnexion réussie. Supprimez le token côté client." });
};

// ya namlou export b module ya f kol methode namlou exports wahadha
module.exports = {
  register,
  login,
  logout,
};
