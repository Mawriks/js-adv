Vue.component('cart-item', {
    props: ['product'],
    template:   `<div class="cart-item"> 
                    <img :src="product.image" :alt="product.product_name">
                    <p>{{ product.product_name }}</p> 
                    <p><small>x{{ product.quantity }}<br/>{{ '$' + product.price }}</small></p>
                    <p><b>{{ '$' + product.total }}</b></p> 
                    <button @click="$parent.removeProduct(product)" :data-id="product.id_product" class="del">x</button>
                </div>`
});

Vue.component('cart', {
    data(){
        return {
            cart: [],
            show: false
        }
    },
    methods: {
        addProduct(product){
            let find = this.cart.find(el => el.id_product === product.id_product);
            if(find){
                this.$parent.putJson(`/api/cart/${find.id_product}`, { quantity:1, total:find.price })
                .then(data=>{
                    if(data.result === 1){
                        find.quantity++;
                        find.total = find.quantity * find.price;
                    }
                })
            }else{
                Vue.set(product, 'quantity', 1);
                Vue.set(product, 'total', product.price);
                console.log(product);
                this.$parent.postJson(`/api/cart/${product.id_product}`, product)
                .then(data=>{
                    if(data.result === 1){
                        this.cart.push(product);
                    }
                })
                
            }         
        },
        removeProduct(product){
            let find = this.cart.find(el => el.id_product === product.id_product);
            if(find && find.quantity > 1){
                this.$parent.delJson(`/api/cart/del/${find.id_product}`, { method:'del', total:find.price })
                .then(data=>{
                    if(data.result === 1){
                        find.quantity--;
                        find.total = find.quantity * find.price;
                    }
                })
            } else {
                this.$parent.delJson(`/api/cart/del/${find.id_product}`, { method:'remove' })
                .then(data=>{
                    if(data.result === 1){
                        this.cart.splice(this.cart.indexOf(find), 1);
                    }
                })
                
            }
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
        this.$parent.getJson(`/api/cart`)
           .then(data => {
            if(data.contents.length) {
                for(let el of data.contents){
                    el.total = el.quantity * el.price;
                    this.cart.push(el);
                }
            }
        });
    }
});

