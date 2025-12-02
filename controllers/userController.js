const User = require('../models/userModel');
const bcrypt = require('bcrypt');

//nestamlou l methode async o await bch njibou l getallusers o nekhdmou b requeste o response
exports.getAllUsers = async (req, res) => {
  try {
        if (req.user.id !== id && req.user.role !== 'manager') {

    const users = await User.find();
    res.status(200).json({ users });}
  } catch (err) {
    res.status(500).json({ message: 'Erreur' });
  }
};


exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    // bch nchoufou el role lezm ykoun manager
    if (req.user.id !== id && req.user.role !== 'manager') {
      return res.status(403).json({ message: 'Seule le manager peut voir les utilisateurs' });
    }
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur nexiste pas' });
    }
    res.status(200).json({ user });
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de laffichage' });
  }
};

exports.deleteUser = async (req, res) => {
  try {
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
    const { id } = req.params;
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
