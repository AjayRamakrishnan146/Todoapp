const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://AjayRamakrishnan12:Aju12K@cluster0.vmjotav.mongodb.net/todoapp?retryWrites=true&w=majorit',{ useNewUrlParser: true, useUnifiedTopology: true, w: 'majority' })
.then(()=>{
    console.log('connect to database');
})
.catch(()=>{
    console.log('failed to connect to db');
})