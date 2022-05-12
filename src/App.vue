<template>
    <div class="container my-5" id="app">
        <CISForm />
        <CISBrands/>
        <CISBodies />
    </div>
</template>

<script>
import CISForm from './components/CISForm.vue'
import CISBrands from './components/CISBrands.vue'
import CISBodies from './components/CISBodies.vue'

export default {
    name: 'App',
    components: {
        CISForm,
        CISBrands,
        CISBodies
    },
    computed: {

        link() {return this.$root.link},
        total() {return this.$root.total},
        response() {return this.$root.response},
        rangeMin() {return this.$root.rangeMin},
        rangeMax() {return this.$root.rangeMax},
        rangeValueC() {return this.$root.rangeValue}
    },
}
</script>

<style>
</style>
