const Project =require('../models/Project');
const User =require('../models/User');

//dima nestamlou exports f kol handler wla lkol nlemouhom fel lekher f module
exports.getAllProjects = async (req, res) => {
  try {
    // nestamlou l find bch njibou les projets lmawjoudin fel base
    //hatinehom f projects bch resultat tethat fih en format json 
    const projects = await Project.find();
    //hedhi verif ken manager awka nkarnou l id b id l mawjoud f authmiddleware o nchoufou role mteou 
     if (projects.userId.toString() !== req.user.id && req.user.role !== 'manager') {
      return res.status(403).json({ message: "Accès refusé. Vous n'êtes pas autorisé à voir ce projet." });
    }  
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des projets." });
  }
};

//dima nestamlou req o res kima fel user req bch utilisateur yhot id f test p res feha l reponse mta requette
exports.getProjectById = async (req, res) => {
  try {
    //nlawjouh b id mteou
    const project = await Project.findById(req.params.id);
    //ken moush mwajoud yraja erreur snn yrajaa f const project
    if (!project) {
      return res.status(404).json({ message: "Projet non trouvé." });
    }
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération du projet." });
  }
};
//kifkif f delete tekhou id o tfasakh traaja msg f res format json
exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);

    //if loula ken manager yfasakh snn erreur
     if (projects.userId.toString() !== req.user.id && req.user.role !== 'manager') {
      return res.status(403).json({ message: "Accès refusé. Vous n'êtes pas autorisé à voir ce projet." });
    }

    res.status(200).json({ message: "Projet supprimé avec succès." });

    //if thenya ken projet mfamesh meno f base
    if (!project) {
      return res.status(404).json({ message: "Projet non trouvé." });
    }
    res.status(200).json({ message: "Projet supprimé avec succès." });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la suppression du projet." });
  }
};

//f update req feha id o body l bch yektbou user k yheb ybadll o res feha msg 
exports.updateProject = async (req, res) => {
  try {
    //id comme params o requette fel body 
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!project) {
      return res.status(404).json({ message: "Projet non trouvé." });
    }
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la mise à jour du projet." });
  }
};

//hnee bch nasn3ou projet jdid kifkif b req o res o baaed b methode prédefini fel mongo save 
exports.createProject = async (req, res) => {
  try {
    const newProject = new Project(req.body);
    await newProject.save();
    res.status(201).json(newProject);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la création du projet." });
  }
};
