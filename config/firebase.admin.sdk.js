const admin = require("firebase-admin");

const serviceAccount = require("../nodejs-authentication-8f5b2-firebase-adminsdk-6rnv8-1d21b5c51b.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});