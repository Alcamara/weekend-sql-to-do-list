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