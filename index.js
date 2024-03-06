const express = require('express'),app = express();
app.use(express.json())

const db = require('./database.js'), Residentroutes = require('./controllers/resident.controller.js')

const PORT = 3000;
app.listen(PORT,()=>{
    console.log(`the server is running on ${PORT}`)
});
app.use('/api/residents',Residentroutes);

app.use((err,req,res,next)=>{
    console.log(err)
    res.status(err.status||500).send('Something went wrong')
})

// db.query("SELECT 1")
//     .then(()=>{
//         console.log('db connection succeeded')
//         app.listen(PORT,()=>{
//             console.log(`Server started at ${PORT}`)
//         });
//     })
//     .catch(err=>console.log("db connection failed \n"+err));


