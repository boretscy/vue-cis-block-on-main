<template>
    <div>
        <div class="row my-5 cis-filter-on-main-brands">
            <div class="col-6">
                <h3 class="fw-normal">Автомобили в наличии <a :href="'/dealerships/?city='+$root.city" v-if="$root.inCity" role="top-menu-show-list-city">в {{ $root.inCity }}</a></h3>
            </div>
            <div class="col-6 text-end pt-2">
                <a 
                    :href="'/cars/'+link" 
                    class="c-yablack c-h-yablack text-decoration-none">
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
                    :href="'/cars/'+link+'/#/'+brands[n-1].code" 
                    class="text-decoration-none c-yadarkgray c-h-yablack d-block b-radius-small py-3 ps-3 d-flex align-items-center justify-content-between"
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
        link() {return this.$root.link},
        brands() {return this.$root.response},
        brandsCount() {
            let res = 18
            if ( this.$root.response.length < res ) res = this.$root.response.length
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