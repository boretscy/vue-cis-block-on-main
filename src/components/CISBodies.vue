<template>
    <div>
        <div class="row mt-5 mb-3 cis-filter-on-main-bodies">
            <div class="col-6">
                <h3 class="fw-normal">Найти по типу кузова</h3>
            </div>
            <div class="col-6 text-end pt-2">
                <a href="/cars/new" class="c-yablack c-h-yablack text-decoration-none">
                    Все типы кузовов
                    <svg xmlns="http://www.w3.org/2000/svg"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#corner-right"></use></svg>
                </a>
            </div>
        </div>
        <div class="row">
            <a 
                v-for="item in bodies"
                :key="item.ID"
                :href="'/cars/new/#/?body='+item.CODE" 
                class="col-6 col-md-4 col-lg mb-3 mb-lg-0 cis-filter-on-main-bodies-item text-center text-decoration-none c-yadarkgray c-h-yablack"
                >
                <div class="cis-filter-on-main-bodies-item-icon">
                    <div class="cis-filter-on-main-bodies-item-topicon">
                        <icon-base icon-name="crossover" v-if="item.CODE == 'crossover'"><icon-crossover /></icon-base>
                        <icon-base icon-name="cupe" v-if="item.CODE == 'cupe'"><icon-cupe /></icon-base>
                        <icon-base icon-name="hatchback" v-if="item.CODE == 'hatchback'"><icon-hatchback /></icon-base>
                        <icon-base icon-name="pickip" v-if="item.CODE == 'pickip'"><icon-pickip /></icon-base>
                        <icon-base icon-name="sedan" v-if="item.CODE == 'sedan'"><icon-sedan /></icon-base>
                        <icon-base icon-name="suv" v-if="item.CODE == 'suv'"><icon-suv /></icon-base>
                        <icon-base icon-name="van" v-if="item.CODE == 'van'"><icon-van /></icon-base>
                    </div>
                    <div class="cis-filter-on-main-bodies-item-backicon">
                        <icon-base icon-name="crossoverback" v-if="item.CODE == 'crossover'"><icon-crossoverback /></icon-base>
                        <icon-base icon-name="cupeback" v-if="item.CODE == 'cupe'"><icon-cupeback /></icon-base>
                        <icon-base icon-name="hatchbackback" v-if="item.CODE == 'hatchback'"><icon-hatchbackback /></icon-base>
                        <icon-base icon-name="pickipback" v-if="item.CODE == 'pickip'"><icon-pickipback /></icon-base>
                        <icon-base icon-name="sedanback" v-if="item.CODE == 'sedan'"><icon-sedanback /></icon-base>
                        <icon-base icon-name="suvback" v-if="item.CODE == 'suv'"><icon-suvback /></icon-base>
                        <icon-base icon-name="vanback" v-if="item.CODE == 'van'"><icon-vanback /></icon-base>
                    </div>
                </div>
                <div class="cis-filter-on-main-bodies-item-title">{{ item.NAME }}</div>
            </a>
        </div>
        
    </div>
</template>

<script>
import IconBase from './IconBase.vue'
import IconCrossover from './icons/IconCrossover.vue'
import IconCrossoverback from './icons/IconCrossoverback.vue'
import IconCupe from './icons/IconCupe.vue'
import IconCupeback from './icons/IconCupeback.vue'
import IconHatchback from './icons/IconHatchback.vue'
import IconHatchbackback from './icons/IconHatchbackback.vue'
// import IconPickup from './icons/IconPickup.vue'
// import IconPickupback from './icons/IconPickupback.vue'
import IconSedan from './icons/IconSedan.vue'
import IconSedanback from './icons/IconSedanback.vue'
import IconSuv from './icons/IconSuv.vue'
import IconSuvback from './icons/IconSuvback.vue'
import IconVan from './icons/IconVan.vue'
import IconVanback from './icons/IconVanback.vue'

export default {
    name: 'CISBodies',
    components: {
        IconBase,
        IconCrossover, IconCrossoverback,
        IconCupe, IconCupeback,
        IconHatchback, IconHatchbackback,
        // IconPickup, IconPickupback,
        IconSedan, IconSedanback,
        IconSuv, IconSuvback,
        IconVan, IconVanback
    },
    computed: {
        bodies() {return this.$root.bodies}
    }

}
</script>
<style scoped>
.cis-filter-on-main-bodies svg {
	fill: var(--yayellow);
	width: 30px;
	height: 30px;
	margin-left: 15px;
	top: 0;
	right: 0;
}
.cis-filter-on-main-bodies-item .cis-filter-on-main-bodies-item-icon {
	position: relative;
	height: 67.5px;
}
.cis-filter-on-main-bodies-item .cis-filter-on-main-bodies-item-icon svg {
	width: 150px;
    height: 67.5px;
	transition: .2s;
}
.cis-filter-on-main-bodies-item .cis-filter-on-main-bodies-item-icon .cis-filter-on-main-bodies-item-topicon, .cis-filter-on-main-bodies-item .cis-filter-on-main-bodies-item-icon .cis-filter-on-main-bodies-item-backicon {
	position: absolute;
	top: 0;
	left: calc(50% - 75px);
}
.cis-filter-on-main-bodies-item .cis-filter-on-main-bodies-item-topicon, .cis-filter-on-main-bodies-item:hover .cis-filter-on-main-bodies-item-backicon {
	fill: var(--yablue);
	transition: .2s;
}
.cis-filter-on-main-bodies-item .cis-filter-on-main-bodies-item-backicon, .cis-filter-on-main-bodies-item:hover .cis-filter-on-main-bodies-item-topicon {
	fill: var(--yayellow);
	transition: .2s;
}
</style>