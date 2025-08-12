const { Sequelize } = require("sequelize")
const {db} = require("../config.js");

const userImage = db.define("user_image", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    category: {
        type: Sequelize.STRING
    },
    title: {
        type: Sequelize.STRING
    },
    description:{
        type: Sequelize.STRING
    },
    stone_count: {
        type: Sequelize.STRING
    },
    signedUrl: {
        type: Sequelize.STRING
    }
})

userImage.sync().then(() => {
    console.log("sync user image table")
})


async function addImageContextData(data) {
    try {
        
        const dbResult = await userImage.create(data)
        return { result: true, value: dbResult?.dataValues }
    } catch (error) {
        console.log("error", error)
        return { result: false, value: error }
    }
}

module.exports = {
    addImageContextData
}