const express = require('express');
const mongoose = require('mongoose');
const RegisterUser = require('./model');
const cors = require('cors');
const app = express();
mongoose.connect('mongodb+srv://gangadhar:gangadhar@cluster0.cu5koob.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(
    () => console.log('DB Connected')
)
app.use(cors({
    origin: '*'
}))
app.use(express.json())
app.post('/registeruser', async (req, res) => {
    const { username,email,password,confirmpassword } = req.body;
   
    try {
        const newData = new RegisterUser({
            username,email,password,confirmpassword
        });
        await newData.save();
        return res.json(await RegisterUser.find())
    }
    catch (err) {
        console.log(err)
    }
    res.status(200).send("Register Sucessfully.....")
})
app.get('/getuser', async (req, res) => {
    try {
        return res.json(await RegisterUser.find());
    }
    catch (err) {
        console.log(err)
    }
})
app.delete('/delete/:id', async (req, res) => {
    try {
        await RegisterUser.findByIdAndDelete(req.params.id);
        return res.json(await RegisterUser.find())
    }
    catch (err) {
        console.log(err)
    }
})
app.listen(5000, () => console.log('Server running...'));