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
            link: 'new'
        }
    },
    mounted: function () {
        
        let s = this
        Axios
            .get('https://ya.boretscy.space/api/cis/get/new')
            .then( function(response) {
                s.response = response.data || null
            })
            .catch( function(error) { 
                console.log(error)
                s.response = window.CISData || null
            });
    }
}).$mount('#CISMAinBlock')
