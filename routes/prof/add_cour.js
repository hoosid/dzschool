const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

/* GET home page. */


router.get('/prof_crud_prof', async (req, res) => {
    try {
        const user = req.query.user ? decodeURIComponent(req.query.user) : null;
        const searchQuery = req.query.search ? req.query.search.trim().toLowerCase() : ''; 
        const prof = await prisma.prof.findMany();
        const etudiants = await prisma.etudiant.findMany(); 
        let cour;
      if (user) {
        cour = await prisma.cour.findMany({
          where: {
            OR: [
              {
                user: user,  // Filter by user
                titre: {
                  contains: searchQuery,
                }
              },
              {
                user: user,  // Filter by user
                niveau: {
                  contains: searchQuery,
                }
              }
            ]
          }
        });
      } else {
        // If no user specified, search without user constraint
        cour = await prisma.cour.findMany({
          where: {
            OR: [
              {
                titre: {
                  contains: searchQuery,
                }
              },
              {
                niveau: {
                  contains: searchQuery,
                }
              }
            ]
          }
        });
      }

      // Filter results manually to ensure case-insensitivity
      const filteredCour = cour.filter(c => 
        c.titre.toLowerCase().includes(searchQuery) || 
        c.niveau.toLowerCase().includes(searchQuery)
      ); 
        res.render('dachborde/prof/add_cour', {  user,prof: prof,etudiants:etudiants ,cour:cour});
    } catch (error) {
        console.error('Erreur lors de la récupération des professeurs :', error);
        res.status(500).send('Une erreur s\'est produite lors de la récupération des professeurs');
    }
});

// Route to handle course registration
router.post('/prof_crud_prof', upload.single('image'), async (req, res) => {
    const { user, titre, niveau, video  } = req.body;

    try {
        // Convert phone to an integer
        let imageData = null;

        if (req.file) {
          imageData = req.file.buffer;
        }
        const Data = {
            user: user,
            titre :  titre ,
            niveau:  niveau,
            video: video,
            image:imageData
        };

        await prisma.cour.create({
            data: Data
        });
        
        res.redirect("/prof_crud_prof?user=" + encodeURIComponent(user));
      
    } catch (error) {
        console.error('Erreur lors de la création de l\'étudiant:', error.message);
        res.status(500).send('Erreur lors de la création du cours : ' + error.message);
    }
});
router.get('/prof_crud_prof/:titre', async (req, res) => {
    const titre = req.params.titre;
    const user = req.query.user; // Récupère le paramètre user de la requête

    try {
        // Supprimer les éléments liés dans d'autres tables
        await prisma.cour.deleteMany({
            where: {
                titre: titre
            }
        });

        res.redirect("/prof_crud_prof?user=" + encodeURIComponent(user));
    } catch (error) {
        console.error('Erreur lors de la suppression de l\'élément:', error);
        res.status(500).send('Erreur lors de la suppression de l\'élément');
    }
});




module.exports = router;
