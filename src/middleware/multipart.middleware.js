import multer from 'multer'
import config from '../../app.setting.json' assert {type: 'json'}

const storage = multer.diskStorage({
    destination: `${process.cwd()}/src/${config.storage_folder}`,
    filename: function (req, file, cb) {
        let ext = file.originalname.split(".")[file.originalname.split(".").length - 1]
        req.body.filename = Date.now() + "." + ext
        cb(null, req.body.filename)
    }
})

export const uploader = multer({
    storage: storage
}).single('image')