const mongoose  = require('mongoose');

const DB  = "mongodb+srv://samyakj163:SzEmfgDPrIifwaYk@cluster0.psp2qmf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
mongoose.connect(DB,{
    useUnifiedTopology:true,
    useNewUrlParser:true,
}).then(()=> console.log("Database is connected")).catch((err)=>{console.log(err)})