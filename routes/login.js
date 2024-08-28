const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/* GET home page. */

// Etudiant
router.get('/login', (req, res) => {
  res.render('login/login', { errorMessage: null });
});
router.post('/login', async (req, res) => {
  const { user, pass } = req.body;

  try {
    const etudiant = await prisma.etudiant.findFirst({
      where: {
        user: user,
      }
    });
    const prof = await prisma.prof.findFirst({
      where: {
        user: user,
      }
    });
    const admin = await prisma.admin.findFirst({
      where: {
        user: user,
      }
    });

    if ( (prof && prof.password === pass)  || (etudiant && etudiant.password === pass)  || (admin && admin.password === pass) ) {
      res.redirect("/coures");
    } else {
      const errorMessage = "Identifiant ou mot de passe incorrect";
      console.log(errorMessage);
      res.render("login/login", { errorMessage });
    }
  } catch (error) {
    console.error(error);
    res.render("login/login_prof", { errorMessage: "An error occurred. Please try again." });
  }
});


// Prof
router.get('/login_prof', (req, res) => {
  res.render('login/login_prof', { errorMessage: null });
});

router.post('/login_prof', async (req, res) => {
  const { user, pass } = req.body;

  try {
    const prof = await prisma.prof.findFirst({
      where: {
        user: user,
      }
    });

    if (prof && prof.password === pass) {
      res.redirect("/prof_crud_prof?user=" + encodeURIComponent(user));
      // res.redirect("/prof_crud_prof");
    } else {
      const errorMessage = "Identifiant ou mot de passe incorrect";
      console.log(errorMessage);
      res.render("login/login_prof", { errorMessage });
    }
  } catch (error) {
    console.error(error);
    res.render("login/login_prof", { errorMessage: "An error occurred. Please try again." });
  }
});

// Admin Jam3iya
router.get('/login_admin', (req, res) => {
  res.render('login/login_administraction', { errorMessage: null });
});

router.post('/login_admin', async (req, res) => {
  const { user, pass } = req.body;

  try {
    const admin = await prisma.admin.findFirst({
      where: {
        user: user,
      }
    });

    if (admin && admin.password === pass) {
      res.redirect("/prof_crud?user=" + encodeURIComponent(user));
      // res.redirect("/prof_crud");
    } else {
      const errorMessage = "Identifiant ou mot de passe incorrect";
      console.log(errorMessage);
      res.render("login/login_administraction", { errorMessage });
    }
  } catch (error) {
    console.error(error);
    res.render("login/login_administraction", { errorMessage: "An error occurred. Please try again." });
  }
});

// Admin Moi
router.get('/admin', (req, res) => {
  res.render('login/login_admin', { errorMessage: null });
});

router.post('/admin', (req, res) => {
  const { user, pass } = req.body;

  if (user === process.env.DB_USER && pass === process.env.DB_PASSWORD) {
    res.redirect("/admin_crud");
  } else {
    const errorMessage = "Identifiant ou mot de passe incorrect";
    console.log(errorMessage);
    res.render("login/login_admin", { errorMessage });
  }
});

module.exports = router;
