<template>
    <div class="container my-5" id="CISMAinBlock">
        <CISForm v-if="response" />
        <CISFormEmpty v-if="!response" />
        <CISBrands v-if="response" />
        <CISBrandsEmpty v-if="!response" />
        <CISBodies />
    </div>
</template>

<script>

import CISForm from './components/CISForm.vue'
import CISFormEmpty from './components/CISFormEmpty.vue'
import CISBrands from './components/CISBrands.vue'
import CISBrandsEmpty from './components/CISBrandsEmpty.vue'
import CISBodies from './components/CISBodies.vue'

export default {
    name: 'App',
    components: {
        CISForm, CISFormEmpty,
        CISBrands, CISBrandsEmpty,
        CISBodies
    },
    computed: {
        response() {return this.$root.response}
    }
}
</script>

<style>
</style>
