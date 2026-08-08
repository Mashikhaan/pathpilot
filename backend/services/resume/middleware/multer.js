import fs from 'fs';
import multer from 'multer';
// import uploadPath from '../upload';
import { fileURLToPath } from "url";
import path from "path";

//for  __dirname create in ES6 modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// upload folder ka path
const uploadPath = path.join(__dirname, "../upload");


//check if upload directory exists
if(!fs.existsSync(uploadPath)){
    fs.mkdirSync(uploadPath);
}

//multer middleware for file upload
  //storage used for file upload
  const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, uploadPath)
    },
    filename: (req, file, cb) =>{
        cb(null, file.originalname);
    }
  })

  //file filter for check file type
  const fileFilter = (req, file, cb) =>{
    if(file.mimetype === "application/pdf"){
        cb(null,true);
    }else{
        cb(null, false);
    }
  }

  //upload middleware
  const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 20 * 1024 * 1024
    }
  })

  export default upload