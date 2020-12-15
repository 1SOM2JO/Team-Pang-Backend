import multer from "multer";
import multerS3 from "multer-s3";
import aws from "aws-sdk";
import path from "path";
import dotenv from "dotenv";
import { S3 } from "../config";

dotenv.config({ path: path.join(__dirname, "../../.env") });

const s3 = new aws.S3({
  accessKeyId: S3.accessKeyId,
  secretAccessKey: S3.secretAccessKey,
  region: S3.region,
});

export const uploadMiddleware = multer({
  storage: multerS3({
    s3: s3,
    bucket: S3.bucket,
    key: (req, file, cb) => {
      const extention = path.extname(file.originalname);
      cb(null, Date.now().toString() + extention);
    },
    acl: "public-read-write",
  }),
});