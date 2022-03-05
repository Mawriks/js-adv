Vue.component('product-item', {
    props: ['product'],
    template:   `<div class="product-item" :data-id="product.id_product">
                    <img :src="product.image" :alt="product.product_name">
                    <h3>{{ product.product_name }}</h3>
                    <p>{{ '$' + product.price }}</p>
                    <button class="buy-btn" @click="$root.$refs.cart.addProduct(product)">Купить</button>
                </div>`
});

Vue.component('products-list', {
    props: ['products'],
    template:   `<div class="container">
                    <div class="products">
                        <product-item v-for="product of products" :product="product" :key="product.id_product"></product-item>
                    </div>
                </div>`,
    mounted () {
        this.$parent.getJson(`/api/products`)
           .then(data => {
                for(let el of data){
                   this.$parent.products.push(el);
                   this.$parent.filtered.push(el);
                   this.$parent.totalPrice += el.price;
                }
        });
    }
});