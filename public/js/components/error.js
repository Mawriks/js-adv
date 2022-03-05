Vue.component('error', {
    data(){
        return {
            text:''
        }
    },
    template:   `<p v-if="text!==''">{{ text }}</p>`
});