const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const multer = require('multer');


const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

/* GET home page. */


router.get('/', async (req, res) => {
  try {
      const admin = await prisma.admin.findMany(); 
      res.render('home', { admin: admin });
  } catch (error) {
      console.error('Erreur lors de la récupération des administrateurs :', error);
      res.status(500).send('Une erreur s\'est produite lors de la récupération des administrateurs');
  }
});
module.exports = router;