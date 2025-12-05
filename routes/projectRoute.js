const express = require('express');
const {
  getAllProjects,    
  getProjectById,    
  deleteProject,     
  updateProject,  
  createProject   
} = require('../controllers/projectController.js');
//adhoukom les methode l bch yetkhedmou f projectcontroller 
//o l middleware ll authentification o verification l howa manager
const { authenticateToken, isManager } = require('../Middleware/authMiddleware'); // middlewares ta3 l'authentification
const router = express.Router();


// Routes ta3 gestion des projets
router.get('/all', authenticateToken, isManager, getAllProjects); //(ken l manager) // api tekhdem avec sucées
router.get('/:id', authenticateToken,getProjectById); // testiou postman o yekhdm
router.delete('/:id', authenticateToken, isManager, deleteProject); // (ken l manager yajm yfasakh) // yekhdem zedaa
router.put('/:id', authenticateToken, updateProject); // api marche avec succées
router.post('/', authenticateToken, createProject);// methode run avec succés aussi

module.exports = router;
