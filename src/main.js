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
            token: '34b5ac8b71018c0bc7e5c050ed90b243',
            apiUrl: 'https://apps.yug-avto.ru/API/get/cis/',

            bodies: null,

            brands: [],
            models: [],
            price: {
                value: [0,99999999],
                range: [0,99999999]
            },
            
            city: localStorage.getItem('YAPP_SELECTED_CITY') || null,
            inCity: null,

            settings: JSON.parse(document.getElementById('CISMAinBlock').getAttribute('data')) || null,
            itemIndx: 0
        }
    }
}).$mount('#CISMAinBlock')
