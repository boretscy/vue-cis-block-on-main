<template>
    <div class="container my-5" id="CISMAinBlock">
        <CISForm v-if="$root.brands.length > 0" ref="CISForm"/>
        <CISFormEmpty v-else />
        <CISBrands v-if="$root.brands.length > 0" />
        <CISBrandsEmpty v-else />
        <CISBodies v-if="$root.bodies"/>
        <CISBodiesEmpty v-else />
    </div>
</template>

<script>

import CISForm from './components/CISForm.vue'
import CISFormEmpty from './components/CISFormEmpty.vue'
import CISBrands from './components/CISBrands.vue'
import CISBrandsEmpty from './components/CISBrandsEmpty.vue'
import CISBodies from './components/CISBodies.vue'
import CISBodiesEmpty from './components/CISBodiesEmpty.vue'

export default {
    name: 'App',
    components: {
        CISForm, CISFormEmpty,
        CISBrands, CISBrandsEmpty,
        CISBodies, CISBodiesEmpty
    },
    mounted: function() {
        this.getBrands()
        setInterval(() => {
            if ( localStorage.getItem('YAPP_SELECTED_CITY') != this.$root.city ) {
                this.$root.city = localStorage.getItem('YAPP_SELECTED_CITY')
                this.getBrands()
            }
        }, 100);
    },
    methods: {
        getBrands() {

            let url = this.$root.apiUrl + 'brands'+ '/' + this.$root.settings.items[this.$root.itemIndx].code + '/'
            let get = []
            get.push('token='+this.$root.token)
            if ( this.$root.city ) get.push('city='+this.$root.city)
            url += '?' + get.join('&')

            this.axios.get(url).then((response) => {
                this.$root.brands = []
                this.$root.brands = response.data.dropLists.brands
                this.$root.bodies = response.data.dropLists.bodies
                this.$root.brands.sort((a, b) => a.vehicles < b.vehicles ? 1 : -1)
                this.$root.inCity = response.data.in_city
            }).then(() => {
                this.$refs.CISForm.init()
            })
        }
    }
}
</script>
