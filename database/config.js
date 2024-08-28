
//  const mysql = require('mysql');

// const connection =mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "",
//     database: "LearnCh",
//   });


// connection.connect(function(err) {
//     if (err){
//       console.log(err);
//       //throw err;
//     } else {
//       console.log('DB connected :)');
//     }
// });

// module.exports = connection;
// const mysql = require('mysql');
const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

// Initialisation de PrismaClient avec l'URL de la base de données
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL
    }
  }
});

// Vérification de la connexion à la base de données
prisma.$connect()
  .then(() => {
    console.log('DB connected :)');
  })
  .catch((error) => {
    console.error('DB connection failed:', error);
  });

module.exports = prisma;
