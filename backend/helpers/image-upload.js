const multer = require("multer")
const path = require("path")

// Destination to store the images

const imageStorage = multer.diskStorage({
    destination: function(req,file, cb) {

        let folter = ""

        if(req.baseUrl.includes("users")) {
            folder = "users"
        } else if (req.baseUrl.includes("pets")) {
            folder = "pet"
        }

        cb(null, `public/images/${folder}`)

    },
    filename:  function (req, file , cb) {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const imageUpload = multer({
    storage: imageStorage, 
    fileFilter(req, file, cb) {
        if(!file.originalname.match(/\.(png|jpg)$/)) {
            return cb(new Error("Por favor, envie apenas JPG ou PGN"))
        }
        cb(undefined, true)
    }

})

module.exports = { imageUpload}