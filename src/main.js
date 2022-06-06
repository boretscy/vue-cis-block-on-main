import Vue from 'vue'
import Axios from 'axios';
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
    render: h => h(App),
    data() {
        return {
            bodies: window.CISBodies,
            response: null,
            link: 'new',
            token: '34b5ac8b71018c0bc7e5c050ed90b243'
        }
    },
    mounted: function () {
        
        let s = this
        Axios
            // .get('https://ya.boretscy.space/api/cis/get/new')
            .get('https://apps.yug-avto.ru/API/get/cis/brands/?ext=models&token='+this.token)
            .then( function(response) {
                s.response = response.data || null
                console.log(s.response)
            })
            .catch( function(error) { 
                console.log(error)
                s.response = window.CISData || null
            });
    }
}).$mount('#CISMAinBlock')
