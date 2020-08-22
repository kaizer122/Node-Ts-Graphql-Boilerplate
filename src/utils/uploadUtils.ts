import fs from "fs";
import mime from "mime-types";
import path from "path";
import sharp from "sharp";

const ROOT_PATH = path.join(__dirname, "../../");
const PUBLIC_PATH = path.join(__dirname, "../../public");

export const capitalize = (s) => {
  if (typeof s !== "string") return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
};

export const upload = (stream, filePath) => {
  return new Promise((resolve, reject) => {
    stream
      .on("error", () => {
        if (stream.truncated) fs.unlinkSync(filePath);
      })
      .pipe(fs.createWriteStream(filePath))
      .on("error", (e) => reject(e.message))
      .on("finish", () => resolve(filePath));
  });
};

export const uploadFile = ({ file, subPath, id, fileType = "image" }) => {
  return new Promise((resolve, reject) => {
    Promise.resolve(file)
      .then(({ createReadStream, mimetype }) => {
        const stream = createReadStream();
        const extension = mime.extension(mimetype);
        let filePath = "public";
        if (!fs.existsSync(PUBLIC_PATH + "/images")) fs.mkdirSync(PUBLIC_PATH + "/images");
        if (!fs.existsSync(PUBLIC_PATH + "/files")) fs.mkdirSync(PUBLIC_PATH + "/files");
        filePath += fileType === "image" ? "/images" : "/files";
        if (!fs.existsSync(ROOT_PATH + filePath + "/" + subPath)) fs.mkdirSync(ROOT_PATH + filePath + "/" + subPath);
        filePath += `/${subPath}/${id}.${extension}`;
        upload(stream, filePath)
          .then((link) => resolve(link))
          .catch((e) => reject(e));
      })
      .catch((e) => reject(e.message));
  });
};

export const removeFile = (path, cb = null) => {
  fs.unlink(path, () => {
    if (cb) cb();
  });
};

export const generateImageWithSize = ({ originalPath, id, width, height }): Promise<string> =>
  new Promise((resolve, reject) => {
    const ext = originalPath.split(".").pop();
    const newPath = `${originalPath.substring(0, originalPath.lastIndexOf("/"))}/${id}_${width}x${height}.${ext}`;
    try {
      return sharp(originalPath)
        .resize(width, height, { fit: "outside" })
        .toFile(newPath, (err, inf) => {
          if (err) return reject(err);
          else return resolve(newPath);
        });
    } catch (e) {
      return reject(e);
    }
  });
