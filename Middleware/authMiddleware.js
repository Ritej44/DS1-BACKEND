// Middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

// Middleware ll token JWT
const authenticateToken = (req, res, next) => {
  // bch nekhdhou token ml header
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; //split en '' ll méthode

  //ken token invalid yabath accées refusè
  if (!token) {
    return res.status(401).json({ message: "Accès refusé. Aucun token fourni." });
  }

  // Vérifier le token l defineh f .env
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Token invalide ou expiré." });
    }
    req.user = user; // najoutiw les informations mta user ll requête
    next(); 
  });
};


// Middleware bch nverifiw bih luser manager wale 
const isManager = (req, res, next) => {
  // if loula nchoufou ken user authentifié wale (req.user lezm tkoun defini m authenticateToken kbal next)
  if (!req.user) {
    return res.status(401).json({ message: "Utilisateur non authentifié." });
  }

  // el if thenya ken mahouch manager
  if (req.user.role !== 'manager') {
    return res.status(403).json({ message: "Accès refusé. Réservé aux managers." });
  }

  next(); //net3adew
};


module.exports = { authenticateToken, isManager };
