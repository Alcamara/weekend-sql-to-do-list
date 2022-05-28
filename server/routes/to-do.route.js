const express = require('express');
const toDoRouter = express.Router();
const pool = require('../module/pool');


toDoRouter.get('/',(req,res)=>{
    const query = `SELECT * FROM "to-do";`

    pool.query(query)
        .then((result)=>{
            res.send(result.rows)
        }).catch((err)=>{
            console.log('Error getting to-do list from database');
            res.sendStatus(500)
        })
})

toDoRouter.post('/',(req,res)=>{
    const newTask = req.body.task;
    const isDone = req.body.isDone;
    console.log(newTask, isDone);

    const insertQuery = `
    INSERT INTO "to-do" (task, "isDone")
    VALUES ($1, $2);
    `
    const sqlParams = [
        newTask,
        isDone
    ]

    pool.query(insertQuery,sqlParams)
        .then((dbRes)=>{
            res.sendStatus(201)
        }).catch((err)=>{
            console.log('Error during post',err);
        })
})

toDoRouter.delete('/:id',(req,res)=>{
    const id = req.params.id;
    
    const deleteQuery = `
        DELETE FROM "to-do"
        WHERE "id" = $1;
    `
    const sqlParams = [
        id,
    ]

    pool.query(deleteQuery,sqlParams)
        .then(()=>{
            res.sendStatus(204);
        }).catch((err)=>{
            console.log('error occur during query',err);
        })
})

module.exports = toDoRouter;