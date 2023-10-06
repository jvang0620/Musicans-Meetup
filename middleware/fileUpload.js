const path = require('path');
const multer  = require('multer');

const storage = multer.diskStorage({ //destination function store at certain location
    destination: (req, file, cb) => {
      cb(null, './public/images/img-upload')
    },
    filename: (req, file, cb) => { //filename function updates the file name
      //don't want to have any name collision/conflicts so we generate this unique suffix and attact to file name
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
  });

//function allows only certain files and what files are accepted
const fileFilter = (req, file, cb) => {
  const mimeTypes = ['image/jpeg', 'image/png', 'image/gif'];

  if(mimeTypes.includes(file.mimetype)){
    return cb(null,true);
  } else {
    cb(new Error('Invalid file type. Only jpeg, jpg, png and gif image files are allowed.'));
  }
}
  
//create multer object with storage/limits/fileFilter
const upload = multer({ 
  storage: storage,
  limits:{fileSize: 2*1024*1024},
  fileFilter: fileFilter
}).single('image'); //accept a single file with the name "image" (newEventForm.ejs uplaod image field input name)

//more error handling
exports.fileUpload = (req, res, next) => {
    upload(req, res, err => {
        if (err) {
            err.status = 400;
            next(err);
          } else {
            next();
          }
            
    });
}