//******  Multer Config     *********
const multer = require('multer');

//file filter function to allow png, jpeg, etc
    const fileFilter = (file) => {
      let ext = file.ext;
      let allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png'];
      if(allowedMimeTypes.includes(ext)){  // allowed mime types
       cb(null, true);
     } else {
           cb(new Error("Invalid image type"))
     }
    }
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/uploads')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    },
    
  })
  
  const upload = multer({ 
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 16 * 1024 }
})


module.exports = upload;

