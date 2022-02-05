/* const products = [
    {id: 1, title: 'Notebook', price: 2000},
    {id: 2, title: 'Mouse', price: 20},
    {id: 3, title: 'Keyboard', price: 200},
    {id: 4, title: 'Gamepad', price: 50},
];
const renderProduct = (item, image = 'https://via.placeholder.com/250') => {
    return `<div class="product-item">
                <img src=${image} alt="${item.title}">
                <h3>${item.title}</h3>
                <p>${item.price}</p>
                <button class="buy-btn">Купить</button>
            </div>`
};
const renderPage = list => {
    const productsList = list.map(item => renderProduct(item));
    //document.querySelector('.products').innerHTML = productsList.join('');
    productsList.forEach(product => document.querySelector('.products').insertAdjacentHTML('beforeend', product));
};

renderPage(products);
 */


//кажется, что можно было сделать class CartList extends ProductList????
class Cart{
    constructor(container = '.cart'){
        this.container = container;
        this.products = [];
        this.render();
    }
    //Определяет количество и сумму товаров в корзине
    getCartTotal(){
        let totalPrice = 0, totalQuantity = 0;
        this.products.forEach(product => {
            totalPrice += product.total;
            totalQuantity += product.quantity;
        });
        this.total = `В корзине ${totalQuantity} товар(а/ов) на сумму $${totalPrice}`;
    }
    //Удаляет из корзины все товары
    clearCart(){
        this.products = [];
        this.total = '';
        this.render();
    }
    //Добавляет в корзину товар
    addProduct(product){
        let id = product.id,
        inCart = this.products.filter(function (product) {
            if (product.id == id){
                return 1;
            }
            return 0;
        });
        if (inCart.length>0){
            this.products.forEach(product => {
                if (product.id == id){
                    product.addQuantity();
                }
            });
        } else {
            this.products.push(new CartItem(product));
        }       
        this.render();
    }
    //Удаляет из корзины товар
    removeProduct(id){
        //TODO: либо делать удаление сразу всех товаров, либо удалять по одному, при нажатии на минус
        this.render();
    }
    //Выводит верстку корзины
    render(){
        let container = document.querySelector(this.container);
        if(this.products.length>0){
            this.getCartTotal();
            let cartItemsHTML = this.products.map(product => product.render()).join('');
            container.innerHTML = `<div class="cart__body">${cartItemsHTML}</div><div class="cart__footer">${this.total}</div>`;
        } else {
            container.innerHTML = `<p>В корзине нет товаров!</p>`;
        }
    }    
}
//кажется, что можно было сделать class CartItem extends ProductItem ?????
class CartItem{
    constructor(product, quantity = 1){
        this.id = product.id;
        this.title = product.title;
        this.price = product.price;
        this.quantity = quantity;
        this.getItemTotal();
    }
    //Увеличивает количество товара
    addQuantity(){
        this.quantity = this.quantity + 1;
        this.getItemTotal();
    }
    //Уменьшает количество товара
    removeQuantity(){
        this.quantity = this.quantity - 1;
        this.getItemTotal();
    }
    //Получаем полную стоимость товаров одного вида, если 2 товара с ценой 50, то выйдет 2*50 = 100
    getItemTotal(){
        this.total = this.quantity * this.price;
    }
    //Вывод товара
    render(){
        return `Товар ${this.title} в количестве ${this.quantity} по цене ${this.price}. В общей сумме $${this.total}`;
    }
}

class ProductList{
    constructor(container = '.products'){
        this.container = container;
        this.products = [];
        this._fetchProducts();
        this.getProductsPrice();
        this.render();
    }
    _fetchProducts(){
        this.products = [
            {id: 1, title: 'Notebook', price: 2000},
            {id: 2, title: 'Mouse', price: 20},
            {id: 3, title: 'Keyboard', price: 200},
            {id: 4, title: 'Gamepad', price: 50},
        ];
    }
    getProductsPrice(){
        let totalPrice = 0;
        this.products.forEach(product => {
            totalPrice += product.price;
        });
        console.log(`Суммарная стоимость товаров в магазине равна $${totalPrice}`);
    }
    render(){
        this.products.forEach(product => document.querySelector(this.container).insertAdjacentHTML('beforeend', new ProductItem(product).render()));
    }
}

class ProductItem{
    constructor(product, image = 'https://via.placeholder.com/250'){
        this.id     = product.id;
        this.title  = product.title;
        this.price  = product.price;
        this.image  = image;
    }
    render() {
        return `<div class="product-item">
                    <img src=${this.image} alt="${this.title}">
                    <h3>${this.title}</h3>
                    <p>${this.price}</p>
                    <button class="buy-btn">Купить</button>
                </div>`;
    }
}


new ProductList();
//let cart = new Cart();