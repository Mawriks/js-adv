const logger = require('./logger');
const fs = require('fs');

//HANDLER отвечает за изменение данных в самом файле
let handlerLog = (req, res, action, file) => {
    fs.readFile(file, 'utf-8', (err, data)=> {
        if(err){
            res.sendStatus(404, JSON.stringify({result:0, text: err}));
        } else {
            console.log(req, res);
            let time = new Date();
            let prd = log.body.name;
            let log = logger.add(JSON.parse(data), {action, time, });
            fs.writeFile(file, log, (err) => {
                if(err){
                    console.log('Error');
                } else {
                    console.log('Success');
                }
            })
        }
    })
};

module.exports = handlerLog;