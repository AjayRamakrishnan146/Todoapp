const express = require('express');
const router =express.Router();

router.use(express.json());
router.use(express.urlencoded({extended:true}));

const todoAppModel= require('../model/todoAppModel');

//get
//to view all tasks

router.get('/view', async(req,res)=>{
    try {
        const employee = await  todoAppModel.find();
        res.json(employee);
    } catch (error) {
        console.log(error);
    }
});

//get
//to view all ongoing tasks

router.get('/ongoing', async(req,res)=>{
    try {
        const status = "ongoing";
        const data = await todoAppModel.find({status:status})
        res.send(data);
    } catch (error) {
        res.status(404).send('Data is not found');
        console.log(error);
    }
});

//get
//to view all completed tasks


router.get('/completed', async(req,res)=>{
    try {
        const status = "completed";
        const data = await todoAppModel.find({status:status})
        res.send(data);
    } catch (error) {
        res.status(404).send('Data is not found');
        console.log(error);
    }
});

//post
//create a task

router.post('/add', async (req,res)=>{
    try {
        let item = req.body;
        const savedData= await todoAppModel(item);
        savedData.save();
        res.json({message:"Task Added Succesfully"})
    } catch (error) {
        res.json("Unable to add")
        console.log(error);
    }
});

//delete
//delete a task

router.delete('/delete/:id', async(req,res)=>{
    try {
        let id=req.params.id;
        console.log(id);
        await todoAppModel.findByIdAndDelete(id);
        res.json({message:"Deleted successfully"});
    } catch (error) {
        console.log(error);
    }
});

//update
//updating a task
//for change the status of the task
router.put('/toggle/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const task = await todoAppModel.findById(id);

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        // Toggle the status
        task.status = task.status === 'completed' ? 'ongoing' : 'completed';
        await task.save();

        res.json({ message: 'Status toggled successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports=router;