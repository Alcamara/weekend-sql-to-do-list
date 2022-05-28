const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 5000;
const toDoRouter = require('./routes/to-do.route')

app.use(express.static('server/public'))
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())





app.use('/toDo',toDoRouter)

app.listen(PORT, ()=>{
    console.log('listening on port', PORT);
})