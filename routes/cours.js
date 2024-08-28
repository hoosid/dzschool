const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

/* GET home page. */
router.get('/coures', async (req, res) => {
  try {
    const user = req.query.user ? decodeURIComponent(req.query.user) : null;
    const searchQuery = req.query.search ? req.query.search : '';  // Get search query from request

    const prof = await prisma.prof.findMany({
      where: {
          OR: [
              {
                  user: {
                      contains: searchQuery,  // Filter by the search query for the user
                  }
              },
              {
                  admin: {
                      contains: searchQuery,  // Filter by the search query for the admin
                  }
              }
          ]
      }
  });
      const etudiants = await prisma.etudiant.findMany(); 
      res.render('cours/courses', { user, prof, etudiants, searchQuery });
      
  } catch (error) {
      console.error('Erreur lors de la récupération des professeurs :', error);
      res.status(500).send('Une erreur s\'est produite lors de la récupération des professeurs');
  }
});


router.get('/coures_complet', async (req, res) => {
  try {
      const user = req.query.user ? decodeURIComponent(req.query.user) : null;
      const searchQuery = req.query.search ? req.query.search.trim().toLowerCase() : '';  // Get search query from request and convert to lowercase

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

      res.render('cours/cour_complet', { user, prof, etudiants, cour: filteredCour });
  } catch (error) {
      console.error('Erreur lors de la récupération des cours :', error);
      res.status(500).send('Une erreur s\'est produite lors de la récupération des cours');
  }
});





module.exports = router;