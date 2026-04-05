import sharp from "sharp";
import path from "path";

const createThumbnail = async (req, res, next) => {
   try {
      if (!req.file) {
         next();
         return;
      }

      console.log('Creating thumbnail for:', req.file.path);

      const filePath = req.file.path;

      const thumbPath = path.join(
         "uploads",
         req.file.filename + "_thumb.png"
      );

      await sharp(filePath)
         .resize(160, 160, { fit: 'cover', })
         .png()
         .toFile(thumbPath);

      next();
   }
   catch (error) {
      console.error('Error creating thumbnail:', error);
      next(error);
   }
};

export { createThumbnail };
