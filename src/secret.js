require('dotenv').config();

const serverPort = process.env.SERVER_PORT || 5001;

const mongodbURL = process.env.MONGODB_ATLAS_URL || "mongodb://localhost:27017/userAdminMgtDB";

const defaultImagePath = process.env.DEFAULT_IMAGE_PATH || "public/images/user.png";

const jwtActivationKey = process.env.JWT_ACTIVATION_KEY || "e0d993edd4ddea8c07b307e24ffc19a6b5860068aa2701ee8829fe31adaf9b0a4f143732216b690157eb4deeca94bbc423427d7010adbaacb1ba2b8979034ac9";

const jwtAccessKey = process.env.JWT_ACCESS_KEY || "099cdf3677a3e934ff034b65f681d3cb10250ef73532eeffd23934422c3292387baccfb187a5cffb7bb4f028b0602cb167626e5c62838cff31daf509becca168";

const jwtRefreshKey = process.env.JWT_REFRESH_KEY || "d73182a2888c685745883a5574665dedd79512803db903686f70f7f30402ea19cd3bd655d7dc70238ed377b2571cf2ed1b3c1b999d815080977027b14735f6ca";

const jwtResetPasswordKey = process.env.JWT_RESET_PASSWORD_KEY || "7b22b9d320c6779481126b02cf068dc825b858f60f06b807b7430ff596726ee4fe51f68eb5208c5ff82c6f6252042a3b71fa7161492895d787d52ca98a52398a";

const smtpUsername = process.env.SMTP_USERNAME || "";
const smtpPassword = process.env.SMTP_PASSWORD || "";

const clientURL = process.env.CLIENT_URL;

module.exports = {
    serverPort,
    mongodbURL,
    defaultImagePath,
    jwtActivationKey,
    jwtAccessKey,
    jwtRefreshKey,
    jwtResetPasswordKey,
    smtpUsername,
    smtpPassword,
    clientURL,
};