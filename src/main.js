import Vue from 'vue'
// import Axios from 'axios';
import App from './App.vue'

Vue.config.productionTip = false


var State = function() {
    return {
        bodies: window.CISBodies,
        response: window.CISData,
        link: 'new',
        total: 0,
        rangeValue: [0,0],
        rangeMin: 0,
        rangeMax: 100000000,
        brand: 'empty',
        model: 'empty'
    }
}


// Axios
// 			.get('https://ya.boretscy.space/api/cis/get/new')
// 			.then( function(response) {
                
//                 console.log( response.data );
                
//             })
// 			.catch( function(error) { console.log(error) });
new Vue({
    render: h => h(App),
    data: State(),
}).$mount('#app')
