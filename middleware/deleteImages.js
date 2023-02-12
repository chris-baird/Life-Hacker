const { Storage } = require("@google-cloud/storage")
// Sets up bucket storage connection
const storage = new Storage({
  keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
})

// Deletes all the images passed into funciton from bucket storage
function deleteImages(images) {
  images.map(async (image) => {
    try {
      await storage.bucket(process.env.GCS_BUCKET).file(image).delete()
    } catch (error) {
      console.log("No Image Found")
    }
  })
}

module.exports = deleteImages
