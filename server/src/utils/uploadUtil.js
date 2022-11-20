import { createError } from "./errorUtil.js";
import cloudinary from "./cloudinary.js";
export const uploadImage = async (imageStr, preset) => {
  try {
    let rs = await cloudinary.uploader.upload(imageStr, {
      upload_preset: preset,
    });
    console.log("_________________RS", rs);
    return rs;
  } catch (err) {
    console.log(err);
    return err.message;
  }
};
