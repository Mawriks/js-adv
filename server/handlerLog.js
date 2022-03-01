const logger = require('./logger');
const fs = require('fs');

//HANDLER отвечает за изменение данных в самом файле
let handlerLog = (req, res, action, file) => {
    fs.readFile(file, 'utf-8', (err, data)=> {
        if(err){
            res.sendStatus(404, JSON.stringify({result:0, text: err}));
        } else {
            let time = new Date();
            let id = +req.params.id;
            let prdName = '';

            fs.readFile('server/db/products.json', 'utf-8', (err, products)=> {
                if(err){
                   console.log('Cant connect to db products');
                } else {
                    JSON.parse(products).forEach(product => {
                        if (product.id_product == id){
                            prdName = product.product_name;
                        }
                    });
                    let log = logger.add(JSON.parse(data), {action, time, prdName});
                    fs.writeFile(file, log, (err) => {
                        if(err){
                            console.log('Error');
                        } else {
                            console.log('Success');
                        }
                    })
                }
            });
        }
    })
};

module.exports = handlerLog;