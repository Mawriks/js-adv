Vue.component('cart-item', {
    props: ['product'],
    template:   `<div class="cart-item"> 
                    <img :src="$parent.imgCart" :alt="product.product_name">
                    <p>{{ product.product_name }}</p> 
                    <p><small>x{{ product.quantity }}<br/>{{ '$' + product.price }}</small></p>
                    <p><b>{{ '$' + product.total }}</b></p> 
                    <button @click="$parent.removeProduct(product)" :data-id="product.id_product" class="del">x</button>
                </div>`
});

Vue.component('cart', {
    data(){
        return {
            cartUrl: '/getBasket.json',
            imgCart: 'https://via.placeholder.com/20x30',
            cart: [],
            show: false
        }
    },
    methods: {
        addProduct(product){
            this.$parent.getJson(`${API}/addToBasket.json`)
                .then(data => {
                    if(data.result === 1){
                        let find = this.cart.find(el => el.id_product === product.id_product);
                        if(find){
                            find.quantity++;
                            find.total = find.quantity * find.price;
                        }else{
                            this.cart.push(product);
                            Vue.set(product, 'quantity', 1);
                            Vue.set(product, 'total', product.price);
                        }   
                    } else {
                        alert('Error');
                    }
                });         
        },
        removeProduct(product){
            this.$parent.getJson(`${API}/deleteFromBasket.json`)
                .then(data => {
                    if(data.result === 1){
                        let find = this.cart.find(el => el.id_product === product.id_product);
                        if(find && find.quantity > 1){
                            find.quantity--;
                            find.total = find.quantity * find.price;
                        } else {
                            this.cart.splice(this.cart.indexOf(find), 1);
                        }
                    } else {
                        alert('Error');
                    }
                });
        }
    },
    template:   `<div class="cart-wrap">
                    <button class="btn-cart" type="button" @click="show = !show"> 
                        <svg width="32" height="29"><use xlink:href="#cart-ico"></use></svg> 
                        <span>Корзина</span>
                    </button>
                    <div class="cart" style="display: none;" v-show="show">
                        <p v-if="!cart.length">Ваша корзина пуста!</p>
                        <div v-else class="cart__body">
                            <cart-item v-for="item of cart" :product="item" :key="item.id_product"></cart-item>
                        </div>
                    </div>
                </div>`,
    mounted () {
        this.$parent.getJson(`${API + this.cartUrl}`)
           .then(data => {
               for(let el of data.contents){
                   this.addProduct(el);
               }
        });
    }
});

