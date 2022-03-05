Vue.component('search-items', {
    data(){
        return {
            userSearch: ''
        }
    },
    methods: {
        filter(){
            const regexp = new RegExp(this.userSearch, 'i');
            this.$parent.filtered = this.$parent.products.filter(product => regexp.test(product.product_name));
        }
    },
    template:   `<form action="#" @submit.prevent="filter()" class="search-form">
                    <!-- Для фильтрации в режиме онлайн @input="filter()" -->
                    <input type="text" placeholder="Search..." class="search-field" v-model="userSearch">
                    <button class="btn-search" type="submit">
                        <svg width="20" height="20"><use xlink:href="#search-ico"></use></svg>
                    </button>
                </form>`
});