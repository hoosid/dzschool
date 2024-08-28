const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

/* GET home page. */

router.get('/etudiant_crud', async (req, res) => {
    try {
        const user = req.query.user ? decodeURIComponent(req.query.user) : null;
        const niveau = req.query.niveau ? decodeURIComponent(req.query.niveau) : null;
        const searchQuery = req.query.search ? req.query.search.trim() : '';

        // Fetching additional data
        const admin = await prisma.admin.findMany();
        const prof = await prisma.prof.findMany();

        // Query to fetch etudiants based on search query
        const etudiants = await prisma.etudiant.findMany({
            where: {
                OR: [
                    {
                        user: {
                            contains: searchQuery,
                        },
                        niveau: {
                            contains: searchQuery,
                        }
                    }
                ]
            }
        });

        res.render('dachborde/adminictraction/etudiant', {
            user, 
            prof, 
            etudiants, 
            admin
        });
    } catch (error) {
        console.error('Erreur lors de la récupération des étudiants :', error);
        res.status(500).send('Une erreur s\'est produite lors de la récupération des étudiants');
    }
});


router.post('/etudiant_crud', upload.single('image'), async (req, res) => {
    const { user, email, phone, password, admin ,niveau} = req.body;

    try {
        const currentDate = new Date();
        // Calculer la date d'expiration (30 jours plus tard)
        const expirationDate = new Date(currentDate);
        expirationDate.setDate(expirationDate.getDate() + 30);
        // Convert phone to an integer
        const phoneInt = parseInt(phone, 10);

        // Validate phone conversion
        if (isNaN(phoneInt)) {
            throw new Error('Le numéro de téléphone doit être un entier valide');
        }

        const etudiant_Data = {
            user: user,
            email: email,
            phone: phoneInt,
            password: password,
            niveau:niveau,
            admin: admin,
            expiration_date: expirationDate
        };


        await prisma.etudiant.create({
            data: etudiant_Data
        });
        await prisma.etudiant_admin.create({
            data: etudiant_Data
        });


        res.redirect("/etudiant_crud?user=" + encodeURIComponent(admin));
        // res.redirect("/etudiant_crud");
    } catch (error) {
        console.error('Erreur lors de la création de l\'étudiant:', error.message);
        res.status(500).send('Erreur lors de la création de l\'étudiant');
    }
});


// delete
 router.get('/etudiant_crud/:password', async (req, res) => {
    const pass = req.params.password; // Récupère le mot de passe depuis les paramètres de l'URL
    const user = req.query.user ? decodeURIComponent(req.query.user) : null;
    const email = req.query.email ? decodeURIComponent(req.query.email) : null;
    const phone = req.query.phone ? parseInt(req.query.phone) : null; // Conversion en entier si nécessaire
    const jam3iya = req.query.jam3iya ? decodeURIComponent(req.query.jam3iya) : null;
    const niveau = req.query. niveau  ? decodeURIComponent(req.query. niveau ) : null;

    try {

        const etudiant = await prisma.etudiant.findMany();


        let reponse;
        for (const q of etudiant) {
            if (q.email === email) {
                reponse = q.user;
                break;
            }
        }


        const etudiant_Data_delete = {
            user: reponse,
            email: email,
            phone: phone,
            password: pass,
            niveau : niveau,
            admin: jam3iya
        };



        // Création d'une nouvelle entrée dans la table de suppression


        // Suppression des étudiants avec le mot de passe spécifié
        const deleteResult = await prisma.etudiant.deleteMany({
            where: {
                password: pass
            }
        });
        await prisma.delete_etudiant.create({
            data: etudiant_Data_delete
        });
        // ---------------------------------------------------------------------------

        const currentDate = new Date();

        for (const q of etudiant) {
            if (q.expiration_date.getTime() === currentDate.getTime()) {
                try {
                    await prisma.etudiant.deleteMany({
                        where: {
                            password: q.password
                        }
                    });
                } catch (error) {
                    console.error(`Erreur lors de la suppression de l'étudiant avec le mot de passe ${q.password}:`, error);
                    // Gérer l'erreur selon vos besoins
                }
            }
        }


        // Redirection vers la page d'administration avec le nom d'admin encodé
        res.redirect("/etudiant_crud?user=" + encodeURIComponent(user));
    } catch (error) {
        console.error('Erreur lors de la suppression des étudiants :', error);
        res.status(500).send('Erreur lors de la suppression des étudiants');
    }
});




module.exports = router;
