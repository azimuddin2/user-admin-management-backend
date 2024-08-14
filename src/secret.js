require('dotenv').config();

const serverPort = process.env.SERVER_PORT || 5001;

const mongodbURL = process.env.MONGODB_ATLAS_URL || "mongodb://localhost:27017/userAdminMgtDB";

const defaultImagePath = process.env.DEFAULT_IMAGE_PATH || "public/images/user.png";

const jwtActivationKey = process.env.JWT_ACTIVATION_KEY || "e0d993edd4ddea8c07b307e24ffc19a6b5860068aa2701ee8829fe31adaf9b0a4f143732216b690157eb4deeca94bbc423427d7010adbaacb1ba2b8979034ac9";

module.exports = {
    serverPort,
    mongodbURL,
    defaultImagePath,
    jwtActivationKey,
};