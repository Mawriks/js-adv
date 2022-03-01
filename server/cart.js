let add = (cart, req) => {
    cart.contents.push(req.body);
    return JSON.stringify(cart, null, 4);
};
let change = (cart, req) => {
    let find = cart.contents.find(el => el.id_product === +req.params.id);
    find.quantity += req.body.quantity;
    find.total += req.body.total;
    return JSON.stringify(cart, null, 4);
};
let del = (cart, req) => {
    let find = cart.contents.find(el => el.id_product === +req.params.id);
    if (req.body.method == 'del'){
        find.quantity--;
        find.total -= req.body.total;
    } else {
        cart.contents.splice(cart.contents.indexOf(find), 1);
    }
    
    return JSON.stringify(cart, null, 4);
};

module.exports = {
    add,
    change,
    del
};