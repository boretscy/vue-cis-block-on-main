import Vue from 'vue'
import Axios from 'axios';
import App from './App.vue'

Vue.config.productionTip = false


// var MakeApp = function() {

//     Axios
//         .get('https://ya.boretscy.space/api/cis/get/new')
//         .then( function(response) {
                    
//             new Vue({
//                 render: h => h(App),
//                 data: {
//                     bodies: window.CISBodies,
//                     response: response.data,
//                     link: 'new',
//                     total: 0,
//                 },
//             }).$mount('#app')
                    
//         })
//         .catch( function(error) { 
            
//             console.log(error)

//             new Vue({
//                 render: h => h(App),
//                 data: {
//                     bodies: window.CISBodies,
//                     response: window.CISData,
//                     link: 'new',
//                     total: 0,
//                 },
//             }).$mount('#app')
//         });
// }

// MakeApp()


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
}).$mount('#app')
