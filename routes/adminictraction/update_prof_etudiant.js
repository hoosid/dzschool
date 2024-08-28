const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const multer = require('multer');


// update prof


router.get('/update_prof', async (req, res) => {
    try {
        const user = req.query.user ? decodeURIComponent(req.query.user) : null;
        const password = req.query.password ? decodeURIComponent(req.query.password) : null;
        const jam3iya = req.query.jam3iya ? decodeURIComponent(req.query.jam3iya) : null;

        // Optionnel : récupérez d'autres données nécessaires comme les étudiants
        const etudiant = await prisma.etudiant.findMany();

        res.render('dachborde/adminictraction/update_prof', { user, password, jam3iya,etudiant });
    } catch (error) {
        console.error('Erreur lors de la récupération des professeurs :', error);
        res.status(500).send('Une erreur s\'est produite lors de la récupération des professeurs');
    }
});
router.post('/update_prof/:password', async (req, res) => {
    const profpass = req.params.password; // Récupère le mot de passe du professeur depuis les paramètres d'URL
    const { user, pass ,admin} = req.body; // Récupère les données du formulaire (user et pass correspondant à vos champs)

    try {
        // Met à jour le professeur dans la base de données
        const updatedProf = await prisma.prof.update({
            where: { password: profpass },
            data: {
                user: user,
                password: pass,
                code: pass, // Assurez-vous que cela est correct selon votre modèle
            }
        });
        res.redirect("/prof_crud?user=" + encodeURIComponent( admin));
      
    } catch (error) {
        console.error(`Erreur lors de la mise à jour du professeur avec l'ID ${profpass} :`, error);
        res.status(500).send(`Une erreur s'est produite lors de la mise à jour du professeur avec l'ID ${profpass}`);
    }
});





// update etudiant
  router.get('/update_etudiant', async (req, res) => {
    try {
        const user = req.query.user ? decodeURIComponent(req.query.user) : null;
        const email= req.query.email ? decodeURIComponent(req.query.email) : null;
        const phone = req.query.phone ? decodeURIComponent(req.query.phone) : null;
        const password = req.query.password ? decodeURIComponent(req.query.password) : null;
        const jam3iya = req.query.jam3iya ? decodeURIComponent(req.query.jam3iya) : null;
      
        const etudiant = await prisma.etudiant.findMany();
        res.render('dachborde/adminictraction/update_etudiant', {   user,email,phone,password,jam3iya,etudiant });
    } catch (error) {
        console.error('Erreur lors de la récupération des administrateurs :', error);
        res.status(500).send('Une erreur s\'est produite lors de la récupération des administrateurs');
    }
  });


  router.post('/update_etudiant/:password', async (req, res) => {
    const profpass = req.params.password;
    const { user, pass, email, phone, admin } = req.body;

    try {
        const phoneInt = parseInt(phone, 10);
        if (isNaN(phoneInt)) {
            throw new Error('Le numéro de téléphone doit être un entier valide');
        }

        const updatedEtudiant = await prisma.etudiant.update({
            where: { password: profpass },
            data: {
                user: user,
                email: email,
                phone: phoneInt,
                password: pass,
                admin: admin
            }
        });

        const updatedEtudiant_admin = await prisma.etudiant_admin.update({
            where: { password: profpass },
            data: {
                user: user,
                email: email,
                phone: phoneInt,
                password: pass,
                admin: admin
            }
        });

        res.redirect("/etudiant_crud?user=" + encodeURIComponent(admin));
      
    } catch (error) {
        console.error(`Erreur lors de la mise à jour de l'étudiant avec le mot de passe ${profpass} :`, error);
        res.status(500).send(`Une erreur s'est produite lors de la mise à jour de l'étudiant avec le mot de passe ${profpass}`);
    }
});



  module.exports = router;