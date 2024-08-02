require('dotenv').config();

const serverPort = process.env.SERVER_PORT || 5001;

const mongodbURL = process.env.MONGODB_ATLAS_URL || "mongodb://localhost:27017/userAdminMgtDB";

module.exports = {
    serverPort,
    mongodbURL,
};