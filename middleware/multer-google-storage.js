const multer = require("multer")
const multerGoogleStorage = require("multer-google-storage")
// Google bucket storage image adapter middleware
const uploadHandler = multer({
  storage: multerGoogleStorage.storageEngine({
    bucket: process.env.GCS_BUCKET,
    keyFilename: process.env.GCS_KEYFILE,
    projectId: process.env.GCLOUD_PROJECT,
  }),
})

module.exports = uploadHandler
