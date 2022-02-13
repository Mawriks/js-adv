const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

//find
//splice 
class Cart{
    constructor(container = '.cart'){
        this.container = container;
        this.products = [];
        this._fetchProducts()
            .then(data => {
                this.products = data.contents.map(product => new CartItem(product));
                this.render();
            });
        this._addCartEvent();
    }
    _fetchProducts(){
        return fetch(`${API}/getBasket.json`)
                .then(result => result.json())
                .catch(error => console.log(error));
    }
    _addEventListener(){
        let buttons = document.querySelectorAll('.del');
        buttons.forEach(button => button.addEventListener('click', function(){cart.removeProduct(this.dataset['id'])}));
    }
    _addCartEvent(){
        let cart_btn = document.querySelector('.btn-cart');
        cart_btn.addEventListener('click', () => {
            document.querySelector(this.container).classList.toggle('hidden');
        })
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
    //Добавляет в корзину товар
    addProduct(product){
        if (this.isInCart(product.id).length>0){
            this.productModify(product.id, 'add');
        } else {
            this.products.push(product);
        }       
        this.render();
    }
    isInCart(id){
       return this.products.filter(function (product) {
            if (product.id == id){
                return 1;
            }
            return 0;
        });
    }
    productModify(id, mod){
        this.products.forEach(product => {
            if (product.id == id && mod == 'add'){
                product.addQuantity();
            }
            if (product.id == id && mod == 'remove'){
                product.removeQuantity();
            }
        });
    }
    //Удаляет из корзины товар
    removeProduct(id){
        if(this.isInCart(id).length>0){
            this.products = this.products.filter(function (product) {
                if (product.id == id){
                    return 0;
                }
                return product;
            });
        }
        this.render();
    }
    //Выводит верстку корзины
    render(){
        let container = document.querySelector(this.container);
        if(this.products.length>0){
            this.getCartTotal();
            let cartItemsHTML = this.products.map(product => product.render()).join('');
            container.innerHTML = `<div class="cart__body">${cartItemsHTML}</div><div class="cart__footer">${this.total}</div>`;
            this._addEventListener();
        } else {
            container.innerHTML = `<p>В корзине нет товаров!</p>`;
        }
    }    
}
class CartItem{
    constructor(product){
        this.id = product.id_product;
        this.title = product.product_name;
        this.price = product.price;
        this.quantity = product.quantity ? product.quantity : 1;
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
        return `<div class="cart-item"> 
                    <p>${this.title}</p> 
                    <p><small>x${this.quantity}<br/>$${this.price}</small></p>
                    <p><b>$${this.total}</b></p> 
                    <button data-id="${this.id}" class="del">x</button>
                </div>`;
    }
}

class ProductList{
    constructor(container = '.products'){
        this.container = container;
        this.products = [];
        this._fetchProducts()
            .then(data => {
                this.products = data;
                this.render();
                this._addEventListener();
                this.getProductsPrice();
            });
    }
    _fetchProducts(){
        return fetch(`${API}/catalogData.json`)
                .then(result => result.json())
                .catch(error => console.log(error));
    }
    _addEventListener(){
        let buttons = document.querySelectorAll('.buy-btn');
        buttons.forEach(button => button.addEventListener('click', function(){cart.addProduct(new CartItem(this.dataset))}))
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
        this.id     = product.id_product;
        this.title  = product.product_name;
        this.price  = product.price;
        this.image  = image;
    }
    render() {
        return `<div class="product-item">
                    <img src=${this.image} alt="${this.title}">
                    <h3>${this.title}</h3>
                    <p>${this.price}</p>
                    <button data-id_product="${this.id}" data-product_name="${this.title}" data-price="${this.price}" class="buy-btn">Купить</button>
                </div>`;
    }
}


new ProductList();
let cart = new Cart();
