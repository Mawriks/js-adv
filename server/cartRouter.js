const express = require('express');
const fs = require('fs');
const router = express.Router();
const handler = require('./handler');
const handlerLog = require('./handlerLog');


router.get('/', (req, res) => {
    fs.readFile('server/db/userCart.json', 'utf-8', (err, data) => {
        if(err){
            res.sendStatus(404, JSON.stringify({result:0, text: err}));
        } else {
            res.send(data);
        }
    })
});
router.post('/:id', (req, res) => {
    handler(req, res, 'add', 'server/db/userCart.json');
    handlerLog(req, res, 'добавлено', 'server/db/stats.json');
});
router.put('/:id', (req, res) => {
    handler(req, res, 'change', 'server/db/userCart.json');
    handlerLog(req, res, 'изменено', 'server/db/stats.json');
});
router.delete('/del/:id', (req, res) => {
    handler(req, res, 'del', 'server/db/userCart.json');
    handlerLog(req, res, 'удалено', 'server/db/stats.json');
});

module.exports = router;