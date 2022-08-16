import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import App from '@/App.vue'

Vue.config.productionTip = false

Vue.use(VueAxios, axios)

new Vue({
    render: h => h(App),
    data() {
        return {
            bodies: null,
            brands: [],
            link: 'new',
            token: '34b5ac8b71018c0bc7e5c050ed90b243',
            apiUrl: 'https://apps.yug-avto.ru/API/get/cis/',
            city: localStorage.getItem('YAPP_SELECTED_CITY') || null,
            inCity: null
        }
    }
}).$mount('#CISMAinBlock')
