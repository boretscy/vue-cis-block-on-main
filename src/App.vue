<template>
    <div class="container my-5" id="CISMAinBlock">
        <CISForm v-if="brands.length > 0" />
        <CISFormEmpty v-else />
        <CISBrands v-if="brands.length > 0" />
        <CISBrandsEmpty v-else />
        <CISBodies v-if="bodies"/>
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
    computed: {
        brands() {return this.$root.brands},
        bodies() {return this.$root.bodies}
    },
    mounted: function() {
        this.getBrands()
    },
    methods: {
        getBrands() {

            let url = 'https://apps.yug-avto.ru/API/get/cis/brands/'+this.$root.link+'/?token='+this.$root.token
            if ( this.$root.city ) url += '&city='+this.$root.city

            this.axios.get(url).then((response) => {
                this.$root.brands = []
                this.$root.brands = response.data.dropLists.brands
                this.$root.bodies = response.data.dropLists.bodies
                this.$root.brands.sort((a, b) => a.vehicles < b.vehicles ? 1 : -1)
                this.$root.inCity = response.data.in_city
            })
        }
    }
}
</script>
