import { supportedMimes } from "../config/fileSystem.js"
import {v4 as uuidv4} from "uuid";
import fs from "fs";


export const imageValidator = (size, mime) => {
    if (bytesToMb(size) > 2) {
        return "Image size must be less than 2 mb"
    }

    else if(!supportedMimes.includes(mime)){
        return "Image must be a type of png, jpg, jpeg, svg, webp, gif..."
    }

    return null;
}

export const bytesToMb = (bytes) => {
    return bytes / (1024 * 1024)
}

export const generaterandomNum = () =>{
    return uuidv4();
}

export const removeImage = (imageName) => {
    const path = process.cwd() + "/public/images/" + imageName;
    if (fs.existsSync(path)) {
      fs.unlinkSync(path);
    }
};

export const uploadImage = (image) => {
    const imgExt = image?.name.split(".");
    const imageName = generaterandomNum() + "." + imgExt[1];
    const uploadPath = process.cwd() + "/public/images/" + imageName;
    image.mv(uploadPath, (err) => {
      if (err) throw err;
    });
  
    return imageName;
};

export const getImageUrl = (imageName) =>{
  return `${process.env.APP_URL}/images/${imageName}`;
}