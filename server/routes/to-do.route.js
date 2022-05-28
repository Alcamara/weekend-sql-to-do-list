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

module.exports = toDoRouter;