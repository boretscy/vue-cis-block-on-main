<template>
    <div>
        <div class="row mt-5 mb-3 cis-filter-on-main-brands">
            <div class="col-md-9">
                <h1 class="h3 fw-normal">Автомобили в наличии <a :href="'/dealerships/?city='+$root.city" v-if="$root.inCity" role="top-menu-show-list-city">в {{ $root.inCity }}</a></h1>
            </div>
            <div class="col-md-3 text-start text-md-end">
                <a 
                    :href="'/cars/'+this.$root.settings.items[this.$root.itemIndx].code" 
                    class="c-yablack c-h-yablack text-decoration-none text-minus">
                    Все марки
                    <svg xmlns="http://www.w3.org/2000/svg"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#corner-right"></use></svg>
                </a>
            </div>
        </div>

        <div
            class="row mb-5"
            v-if="brands"
            >
            <div 
                class="col-6 col-md-3 col-lg-2 cis-filter-on-main-brands-item"
                v-for="n in brandsCount"
                :key="n"
                >
                <a 
                    :href="buildLink(brands[n-1].code)" 
                    class="text-decoration-none c-yadarkgray c-h-yablack d-block b-radius-small py-1 ps-3 d-flex align-items-center justify-content-between"
                    >
                    {{ brands[n-1].name }}
                    <span class="p-1 b-radius-small bg-yalightgray c-yalightblack bg-h-yayellow text-center">{{ brands[n-1].vehicles }}</span>
                </a>
            </div>
        </div>

    </div>
</template>

<script>
export default {
    name: 'CISBrands',
    computed: {
        brands() {return this.$root.brands},
        brandsCount() {
            let res = 18
            if ( this.$root.brands.length < res ) res = this.$root.brands.length
            return res
        }
    },
    methods: {
        buildLink( brand = null ) {
            let res = this.$root.settings.baseURL + '/' + this.$root.settings.items[this.$root.itemIndx].code + '/'
            if ( brand ) res += brand
            let get = []
            if ( this.$root.settings.items[this.$root.itemIndx].params ) {
                for ( let i in this.$root.settings.items[this.$root.itemIndx].params ) {
                    get.push(i+'='+this.$root.settings.items[this.$root.itemIndx].params[i])
                }
            }
            if ( this.$root.city ) get.push('city='+this.$root.city)
            if ( get.length ) {
                res += '?'+get.join('&')
            }
            return res
        }
    }
}
</script>

<style scoped>
.cis-filter-on-main-brands svg {
	fill: var(--yayellow);
	width: 30px;
	height: 30px;
	margin-left: 15px;
	top: 0;
	right: 0;
}
.cis-filter-on-main-brands-item:hover a {
    font-weight: 500;
}
.cis-filter-on-main-brands-item span {
    width: 40px;
    padding: 0 !important;
    font-weight: 600;
    display: block;
}
.cis-filter-on-main-brands-item:hover span {
    background-color: var(--yayellow);

}
</style>