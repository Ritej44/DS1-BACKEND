const Task = require('../models/Task');
const Project = require('../models/Project');
const User = require('../models/User');

//task ashel wahda puisque stenest bel experience maa express o fhemto belgdee


// 1. (réservé ken ll manager)
const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find()
      .populate('projet', 'name') // populate eejbtni tatik fel get el id o name mteou
      .populate('utilisateurAssigne', 'nom'); // tati l user id o nom mteou 
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des tâches", error });
  }
};

// réservé ken lel manager bel req o res kiladaa nafs les methodes lhak kol chy sehl tw 
const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByIdAndDelete(id);
    if (!task) {
      return res.status(404).json({ message: "Tâche non trouvée" });
    }
    res.status(200).json({ message: "Tâche supprimée avec succès" });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la suppression de la tâche", error });
  }
};

// update zeda nestamlou  req params ll id o lbeki bl body 
const updateTask = async (req, res) => {
  try {
    //naffectiw l id fel params
    const { id } = req.params;
    //naffectiw les consts fel req.body
    const { statut, titre, description, deadline } = req.body;

    // nverifiw el statut valide walee
    if (statut && !['todo', 'doing', 'done'].includes(statut)) {
      return res.status(400).json({ message: "Statut invalide. Doit être : todo, doing ou done" });
    }

    //nekhdmou b find baad namlou update 
    const task = await Task.findByIdAndUpdate(
      id,
      { statut, titre, description, deadline },
      { new: true }
    );

    //ken task mahesh valide nraj3ou erreur
    if (!task) {
      return res.status(404).json({ message: "Tâche non trouvée" });
    }

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la mise à jour de la tâche", error });
  }
};

// ay user authentifié yajm yasnaa tache 
const createTask = async (req, res) => {
  try {
    const { titre, description, statut, deadline, projet } = req.body;
    const utilisateurCreat = req.user.id; // ID mta user connecté

    // verifiw ken projet existe
    const project = await Project.findById(projet);
    if (!project) {
      return res.status(404).json({ message: "Projet non trouvé" });
    }

    // b new Task namlou task jdida b les attribut mteha 
    const task = new Task({
      titre,
      description,
      statut: statut || 'todo', // Par défaut : 'todo'
      deadline,
      projet,
      utilisateurCreat,
    });

    //tw save fel mongo
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la création de la tâche", error });
  }
};

// l'affectation réservé ken ll manager
const AffectTask = async (req, res) => {
  try {
    const { taskId, userId } = req.body;

    // nverifiw el  tâche existe
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: "Tâche non trouvée" });
    }

    // if okhra bch nverifiw l'utilisateur existe wale
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    // tw namou l mise à jour l tache bel l'utilisateur assigné
    task.utilisateurAssigne = userId;
    await task.save();

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de l'affectation de la tâche", error });
  }
};


//aw fel tache stamlt module exports lel kol moush kol wehd wahdou 
module.exports = {
  getAllTasks,
  deleteTask,
  updateTask,
  createTask,
  AffectTask,
};
