const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

/* GET home page. */
router.get('/prof_crud', async (req, res) => {
    try {
        const user = req.query.user ? decodeURIComponent(req.query.user) : null;
        const searchQuery = req.query.search ? req.query.search.trim() : '';  // Get search query from request

        const etudiant = await prisma.etudiant.findMany();
        
        // Filter professeurs based on searchQuery and user
        const prof = await prisma.prof.findMany({
            where: {
                OR: [
                    {
                        user: {
                            contains: searchQuery,
                        }
                    }
                ]
            }
        });

        res.render('dachborde/adminictraction/prof', { user, prof, etudiant });
    } catch (error) {
        console.error('Erreur lors de la récupération des professeurs :', error);
        res.status(500).send('Une erreur s\'est produite lors de la récupération des professeurs');
    }
});


router.post('/prof_crud', upload.single('image'), async (req, res) => {
    const { user, password ,admin} = req.body;

    try {
        const prof_Data = {
            user: user,
            password: password,
            code: password ,
            admin:admin
        };

        await prisma.prof.create({
            data: prof_Data
        });
        res.redirect("/prof_crud?user=" + encodeURIComponent( admin));
        // res.redirect("/prof_crud");
    } catch (error) {
        console.error('Erreur lors de la création du professeur:', error);
        res.status(500).send('Erreur lors de la création du professeur');
    }
});

router.get('/prof_crud/:password', async (req, res) => {
    const pass = req.params.password; // Récupère le mot de passe depuis les paramètres de l'URL
    const user = req.query.user ? decodeURIComponent(req.query.user) : null;
   
    try {

     
      
        // Suppression des professeurs avec le mot de passe spécifié
        const deleteResult = await prisma.prof.deleteMany({
            where: {
                password: pass
            }
        });

        // Redirection vers la page d'administration avec le nom d'admin encodé
        res.redirect("/prof_crud?user=" + encodeURIComponent(user));
    } catch (error) {
        console.error('Erreur lors de la suppression des professeurs :', error);
        res.status(500).send('Erreur lors de la suppression des professeurs');
    }
});

module.exports = router;
