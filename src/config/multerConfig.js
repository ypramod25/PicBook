import multer from 'multer';
import multers3 from 'multer-s3';
import s3 from './awsConfig.js';
import { AWS_BUCKET_NAME } from './serverConfig.js';

export const s3Uploader = multer({ //s3uploader is a object
    storage: multers3({ //storage engine , it defines where the file will be stored
        s3: s3,//s3 instance
        bucket: AWS_BUCKET_NAME,//bucket name where the file will be stored
        key: function (req, file, cb) { //this key function will set the file name in s3 bucket
            if(!file) {
                return cb(new Error("File not found"));
            }
            //check mimetype of file (jpeg, png etc.) and set the file name accordingly
            if(file.mimetype != "image/jpeg" && file.mimetype != "image/png") {
                return cb(new Error("Invalid file type, only JPEG and PNG is allowed!"));
            }
            console.log("File received:", file);
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
            const fileName = file.fieldname + '-' + uniqueSuffix + '-' + file.originalname + '.' + file.mimetype.split('/')[1];
            cb(null, fileName);//callback to set the file name in s3 bucket
        }
    })
});