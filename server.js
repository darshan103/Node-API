const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors');

const Employee = require('./models/employeeModel')

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use(cors());


app.get('/', (req, res) => {
    res.send('Hello NODE API')
})

app.get('/blog', (req, res) => {
    res.send('Hello I am S-kumar')
})

app.get('/employees', async(req, res) => {
    try {
        const employee = await Employee.find({});
        res.status(200).json(employee);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.get('/employees/:id', async(req, res) =>{
    try {
        const {id} = req.params;
        const employee = await Employee.findById(id);
        res.status(200).json(employee);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})


app.post('/employees', async(req, res) => {
    try {
        const employee = await Employee.create(req.body)
        res.status(200).json(employee);
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})

// update a employee
app.put('/employees/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const employee = await Employee.findByIdAndUpdate(id, req.body);
        // we cannot find any employee in database
        if(!employee){
            return res.status(404).json({message: `cannot find any employee with ID ${id}`})
        }
        const updatedEmployee = await Employee.findById(id);
        res.status(200).json(updatedEmployee);
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

// delete a employee

app.delete('/employees/:id', async(req, res) =>{
    try {
        const {id} = req.params;
        const employee = await Employee.findByIdAndDelete(id);
        if(!employee){
            return res.status(404).json({message: `cannot find any employee with ID ${id}`})
        }
        res.status(200).json(employee);
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

mongoose.set("strictQuery", false)
mongoose
// .connect('mongodb+srv://SkumarApi:MTjzeiYtyCRTBBy4@cluster0.h4btpip.mongodb.net/Node-API?retryWrites=true&w=majority&appName=Cluster0')
.connect('mongodb://localhost:27017/Node-API', { useNewUrlParser: true, useUnifiedTopology: true })

.then(() => {
    console.log('connected to MongoDB')
    app.listen(3000, ()=> {
        console.log(`Node API app is running on port  3000`)
    });
}).catch((error) => {
    console.log(error)
})