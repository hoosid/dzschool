const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const multer = require('multer');


const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


  router.get('/admin_crud', async (req, res) => {
    try {
        const user = req.query.user ? decodeURIComponent(req.query.user) : null;
        const searchQuery = req.query.search ? req.query.search.trim() : '';
        const prof = await prisma.prof.findMany();
        const coures = await prisma.cour.findMany();
        const etudiant = await prisma.etudiant.findMany({
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
        const  contact = await prisma. contact.findMany();
        res.render('dachborde/admin/admin_etudiant', {  user,prof: prof,etudiant:etudiant , contact: contact,coures:coures});
    } catch (error) {
        console.error('Erreur lors de la récupération des professeurs :', error);
        res.status(500).send('Une erreur s\'est produite lors de la récupération des professeurs');
    }
});

  router.get('/admin_prof', async (req, res) => {
    try {
        const user = req.query.user ? decodeURIComponent(req.query.user) : null;
        const searchQuery = req.query.search ? req.query.search.trim() : '';
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
        const etudiant = await prisma.etudiant.findMany(); 
        const  contact = await prisma. contact.findMany();
        const coures = await prisma.cour.findMany();
        res.render('dachborde/admin/admin_prof', {  user,prof: prof,etudiant:etudiant , contact: contact,coures:coures});
    } catch (error) {
        console.error('Erreur lors de la récupération des professeurs :', error);
        res.status(500).send('Une erreur s\'est produite lors de la récupération des professeurs');
    }
});
  //contact admin
  router.get('/admin_contact', async (req, res) => {
    try {
        const contact = await prisma.contact.findMany(); 
        const user = req.query.user ? decodeURIComponent(req.query.user) : null;
        const prof = await prisma.prof.findMany();
        const etudiant = await prisma.etudiant.findMany(); 
        res.render('dachborde/admin/admin_contact', { user,contact: contact ,prof,etudiant});
    } catch (error) {
        console.error('Erreur lors de la récupération des administrateurs :', error);
        res.status(500).send('Une erreur s\'est produite lors de la récupération des administrateurs');
    }
  });
  

  router.get('/admin_jm3iya', async (req, res) => {
    try {
      const contact = await prisma.contact.findMany(); 
      const user = req.query.user ? decodeURIComponent(req.query.user) : null;
      const searchQuery = req.query.search ? req.query.search.trim() : '';
      const prof = await prisma.prof.findMany();
      const etudiant = await prisma.etudiant.findMany();
    
      const admin = await prisma.admin.findMany({
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
        res.render('dachborde/admin/admin_jm3iya', { user,prof,etudiant ,contact, admin: admin });
    } catch (error) {
        console.error('Erreur lors de la récupération des administrateurs :', error);
        res.status(500).send('Une erreur s\'est produite lors de la récupération des administrateurs');
    }
});


router.post('/admin_jm3iya', upload.single('image'), async (req, res) => {
  const user = req.body.user;
  const code = req.body.password;
  const willaya = req.body.willaya;
  const phone = parseInt(req.body.phone, 10); // convert phone to an integer

  try {
    let imageData = null;

    if (req.file) {
      imageData = req.file.buffer;
    }

    const jm3iya_Data = {
      user: user,
      phone: phone,
      password: code,
      willaya: willaya,
      image: imageData
    };

    await prisma.admin.create({
      data: jm3iya_Data
    });
    res.redirect("/admin_jm3iya");
  } catch (error) {
    console.error('Erreur lors de la création du cours:', error);
    res.status(500).send('Erreur lors de la création du cours');
  }
});

router.get('/admin_jm3iya/:code', async (req, res) => {
  const code = req.params.code ; // Assurez-vous que vous extrayez la valeur correctement

  try {
    // Supprimer les éléments liés dans d'autres tables
    await prisma.admin.deleteMany({
      where: {
        password  : code 
      }
    });
   
   
  
    res.redirect("/admin_jm3iya");
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'élément:', error);
    res.status(500).send('Erreur lors de la suppression de l\'élément');
  }
});



//etudiant non delete
router.get('/admin_delete', async (req, res) => {
  try {
      const user = req.query.user ? decodeURIComponent(req.query.user) : null;
      const searchQuery = req.query.search ? req.query.search.trim() : '';
      const prof = await prisma.prof.findMany();
      const etudiant = await prisma.etudiant_admin.findMany({
        where: {
          OR: [
            {
              user: {
                contains: searchQuery,
              },
            },
            {
              admin: {
                contains: searchQuery,
              },
            },
          ],
        },
      });
      const  etudiant_admin= await prisma.etudiant_admin.findMany();
      res.render('dachborde/admin/etudiant_non_delete', { user,prof: prof,etudiant:etudiant , etudiant_admin: etudiant_admin});
  } catch (error) {
      console.error('Erreur lors de la récupération des professeurs :', error);
      res.status(500).send('Une erreur s\'est produite lors de la récupération des professeurs');
  }
});
//delete etidiant 
router.get('/admin_etudiant', async (req, res) => {
  try {
      const user = req.query.user ? decodeURIComponent(req.query.user) : null;
      const searchQuery = req.query.search ? req.query.search.trim() : '';
      const prof = await prisma.prof.findMany();
      const etudiant = await prisma.delete_etudiant.findMany({
        where: {
          OR: [
            {
              user: {
                contains: searchQuery,
              },
            },
            {
              admin: {
                contains: searchQuery,
              },
            },
          ],
        },
      });
      const  contact = await prisma. contact.findMany();
      res.render('dachborde/admin/delete_etudiant', {  user,prof: prof,etudiant:etudiant , contact: contact});
  } catch (error) {
      console.error('Erreur lors de la récupération des professeurs :', error);
      res.status(500).send('Une erreur s\'est produite lors de la récupération des professeurs');
  }
});


router.get('/admin_etudiant/:password', async (req, res) => {
  const pass = req.params.password; // Récupère le mot de passe depuis les paramètres de l'URL
  const user = req.query.user ? decodeURIComponent(req.query.user) : null;
 

  try {

   
      // Suppression des étudiants avec le mot de passe spécifié
      const deleteResult = await prisma.delete_etudiant.deleteMany({
          where: {
              password: pass
          }
      });
      const del = await prisma.etudiant_admin.deleteMany({
        where: {
            password: pass
        }
    });

      // Redirection vers la page d'administration avec le nom d'admin encodé
      res.redirect("/admin_etudiant?user=" + encodeURIComponent(user));
  } catch (error) {
      console.error('Erreur lors de la suppression des étudiants :', error);
      res.status(500).send('Erreur lors de la suppression des étudiants');
  }
});

/**
 * @rout localhost:3000/admin_update_jm3iya
 * @method get 
 * @description update jam3iya
 * @access public
 */
// update . jm3iya

router.get('/admin_update_jm3iya', async (req, res) => {
  try {
      const user = req.query.user ? decodeURIComponent(req.query.user) : null;
      const email= req.query.email ? decodeURIComponent(req.query.email) : null;
      const phone = req.query.phone ? decodeURIComponent(req.query.phone) : null;
      const password = req.query.password ? decodeURIComponent(req.query.password) : null;
      const jam3iya = req.query.jam3iya ? decodeURIComponent(req.query.jam3iya) : null;
      const etudiant = await prisma.etudiant.findMany();
      res.render('dachborde/admin/admin_update_jm3iya', {   user,email,phone,password,jam3iya,etudiant });
  } catch (error) {
      console.error('Erreur lors de la récupération des administrateurs :', error);
      res.status(500).send('Une erreur s\'est produite lors de la récupération des administrateurs');
  }
});


router.post('/admin_update_jm3iya/:password', async (req, res) => {
  const profpass = req.params.password; // Récupère le mot de passe du professeur depuis les paramètres d'URL
  const { user, pass, email, phone, admin } = req.body; // Récupère les données du formulaire

  try {
      // Convert phone to an integer
      const phoneInt = parseInt(phone, 10);

      // Valider la conversion du téléphone
      if (isNaN(phoneInt)) {
          throw new Error('Le numéro de téléphone doit être un entier valide');
      }

      // Met à jour l'étudiant dans la base de données
      const updatedEtudiant = await prisma.etudiant.update({
          where: { password: profpass },
          data: {
              user: user,
              email: email,
              phone: phoneInt,
              password: pass,
              admin: admin // Assurez-vous que cela est correct selon votre modèle
          }
      });

      res.redirect("/etudiant_crud?user=" + encodeURIComponent(admin));
    
  } catch (error) {
      console.error(`Erreur lors de la mise à jour de l'étudiant avec le mot de passe ${profpass} :`, error);
      res.status(500).send(`Une erreur s'est produite lors de la mise à jour de l'étudiant avec le mot de passe ${profpass}`);
  }
});


module.exports = router;