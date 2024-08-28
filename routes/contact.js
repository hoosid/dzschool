const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const multer = require('multer');

/* GET home page. */


router.get('/contact', async (req, res) => {
  try {
      const contact = await prisma.contact.findMany(); 
      res.render('contact', { contact: contact });
  } catch (error) {
      console.error('Erreur lors de la récupération des administrateurs :', error);
      res.status(500).send('Une erreur s\'est produite lors de la récupération des administrateurs');
  }
});

router.post('/contact', async (req, res) => {
  const user = req.body.user;
  const email_or_phone = req.body.email;
  const Subject = req.body.Subject;
  const msg = req.body.msg;
  try {
   
    const contact_Data = {
      user : user,
      email :email_or_phone,
      Message: Subject,
      Details : msg
    }
    await prisma.contact.create({
      data:contact_Data
    });
   
   
   
    res.redirect("/contact");
  } catch (error) {
    console.error('Erreur lors de la création du cours:', error);
    res.status(500).send('Erreur lors de la création du cours');
  }
});
 


module.exports = router;