'use strict';

const express = require('express');
const router = express.Router();
const Model = require('../models/model');

router.post('/human', (req, res) => {
    console.log(req.body);
    var human = req.body;
    var humanModel = new Model(human);
    humanModel.save((err, fluffy) => {
        if(err) {
            console.log(err);
            throw err;
        }
        res.status(200).json({status: 200, successful: true});
    });
});

router.get('/humans', (req, res) => {
    Model.find({}, (err, results) => {
        if(err) {
            throw err;
        }
        res.status(200).json(results);
    });
});

router.delete('/human/:id', (req, res) => {
    var id = req.params.id;
    Model.remove({_id: id}, (err, result) => {
        if(err) {
            res.status(417).json([{successful: false, status: 417}]);
            throw err;
        }
        res.status(200).json({status: 200, successful: true});
    })
});

router.post('/human/:id', (req, res) => {
    var id = req.params.id;
    var human = req.body;
    Model.update({_id: id}, human, (err, raw) => {
        if(err) {
            res.status(402).send(err);
            return ;
        }
        res.status(200).json({status: 200, successful: true});
    })
});


module.exports = router;