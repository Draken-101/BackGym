import multer from 'multer'
import config from '../../app.setting.json' assert {type: 'json'}

const storage = multer.diskStorage({
    destination: `${process.cwd()}/src/${config.storage_folder}`,
    filename: function (req, file, cb) {
        req.body.filename = "data-" + file.originalname
        cb(null, "data-" + file.originalname)
    }
})

export const uploader = multer({
    storage: storage
}).single('image')