const { Sequelize } = require("sequelize");


            // console.log("iiiii", process.env.DB_USERNAME, process.env.DB_HOST, process.env.DB_PASSWORD,process.env.DB_TYPE)

const db = new Sequelize("postgres", process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host:process.env.DB_HOST,
    dialect: process.env.DB_TYPE,
    dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false 
        }
      },
});

module.exports = {db}