require('dotenv').config();

const serverPort = process.env.SERVER_PORT || 5001;

const mongodbURL = process.env.MONGODB_ATLAS_URL || "mongodb://localhost:27017/userAdminMgtDB";

const defaultImagePath = process.env.DEFAULT_IMAGE_PATH || "public/images/user.png";

module.exports = {
    serverPort,
    mongodbURL,
    defaultImagePath,
};