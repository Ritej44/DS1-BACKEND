const express = require('express');

const{
    getAllTasks,
    deleteTask,
    updateTask,
    createTask,
    AffectTask
}= require('../controllers/taskController.js');
//adhoukom les methode l bch yetkhedmou f projectcontroller 
//o l middleware ll authentification o verification l howa manager
const { authenticateToken, isManager } = require('../Middleware/authMiddleware'); // middlewares ta3 l'authentification
const { route } = require('./projectRoute');
const router = express.Router();

//Route mta gestion des tasks
router.get('/all',authenticateToken,isManager,getAllTasks); //ken manager ynajm ychouf les tasks parfait
router.delete('/:id',authenticateToken,isManager,deleteTask); //kifkif delete ken manager o tekhdm  
router.put('/:id',authenticateToken,updateTask);//update hata user ynajm o elle fonctionne
router.post('/',authenticateToken,createTask);//create ay wehd yajm yasna3 tache api fonctionne
router.post('/affect',authenticateToken,isManager,AffectTask);//ken manager yajm yaffecti o tekhdm parfaitement tati l taskid o userID

module.exports=router;
