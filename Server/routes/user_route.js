const express = require('express');
const db = require('../db');
const Joi = require('joi');

const router = express.Router();

const schema = {
    email: Joi.string().min(12).required(),
    password: Joi.string().min(8).required()
};

router.get('/', async (req, res, next) => {
    try{
        let results = await db.user.all();
        if (!results) return res.sendStatus(404).send('no user found.');
        res.send(results);
    }catch(e){
        console.log(e);
        res.sendStatus(500);
    }
});

router.get('/:id', async (req, res, next) => {
    try{
        let results = await db.user.one(req.params.id);
        if (!results) return res.sendStatus(404).send('no such user.');
        res.send(results);
    }catch(e){
        console.log(e);
        res.sendStatus(500);
    }
});

router.get('/:email/:password', async (req, res, next) => {
    try{
        const { error } = Joi.validate(req.params, schema);
        if (error) return res.sendStatus(400).send(error.details[0].message);
        let results = await db.user.one(req.params.email, req.params.password);
        if (!results) return res.sendStatus(404).send('no such user.');
        res.send(results);
    }catch(e){
        console.log(e);
        res.sendStatus(500);
    }
});

router.post('/', async (req, res, next) => {
    try{
        const { error } = Joi.validate(req.body, schema);
        if (error) return res.sendStatus(400).send(error.details[0].message);
        let results = await db.user.insert(req.body.email, req.body.password);
        res.send(results);
    }catch(e){
        console.log(e);
        res.sendStatus(500);
    }
});

router.put('/:id', async (req, res, next) => {
    try{
        const { error } = Joi.validate(req.body, schema);
        if (error) return res.sendStatus(400).send(error.details[0].message);
        let results = await db.user.changePassword(req.params.id, req.body.password);
        res.send("Password was updated!!!!");
    }catch(e){
        console.log(e);
        res.sendStatus(500);
    }
});

module.exports = router;