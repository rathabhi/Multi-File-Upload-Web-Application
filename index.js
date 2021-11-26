const express=require('express')
const multer=require('multer')
const path=require('path')
const app=express()
app.set('view engine',"ejs")
const PORT=process.env.PORT || 3000
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "public/uploads");
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
    },
  });
  
  var upload = multer({ storage: storage });
  var uploadMultiple = upload.fields([{ name: 'file1', maxCount: 10 }, { name: 'file2', maxCount: 10 }])

app.get('/',(req,res)=>{
    res.render('index')
})
app.post('/uploadfile', uploadMultiple, function (req, res, next) {

    if(req.files){
        console.log(req.files)

        console.log("files uploaded")
    }
    
})
app.listen(PORT,()=>{
    console.log('App is listening on port ${PORT}')
})