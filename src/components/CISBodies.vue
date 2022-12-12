<template>
    <div>
        <div class="row mt-5 mb-3 cis-filter-on-main-bodies">
            <div class="col-6">
                <h2 class="h3 fw-normal">Найти по типу кузова</h2>
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
                :href="link+'&body='+item.code" 
                class="col-6 col-md-4 col-lg mb-3 mb-lg-0 cis-filter-on-main-bodies-item text-center text-decoration-none c-yadarkgray c-h-yablack"
                >
                <div class="cis-filter-on-main-bodies-item-icon">
                    <div class="cis-filter-on-main-bodies-item-topicon">
                        <icon-base icon-name="crossover" v-if="item.code == 'crossover'"><icon-crossover /></icon-base>
                        <icon-base icon-name="cupe" v-if="item.code == 'cupe'"><icon-cupe /></icon-base>
                        <icon-base icon-name="hatchback" v-if="item.code == 'hatchback'"><icon-hatchback /></icon-base>
                        <icon-base icon-name="pickup" v-if="item.code == 'pickup'"><icon-pickup /></icon-base>
                        <icon-base icon-name="sedan" v-if="item.code == 'sedan'"><icon-sedan /></icon-base>
                        <icon-base icon-name="suv" v-if="item.code == 'suv'"><icon-suv /></icon-base>
                        <icon-base icon-name="van" v-if="item.code == 'van'"><icon-van /></icon-base>
                        <icon-base icon-name="bortvan" v-if="item.code == 'bortvan'"><icon-bortvan /></icon-base>
                        <icon-base icon-name="liftback" v-if="item.code == 'liftback'"><icon-liftback /></icon-base>
                        <icon-base icon-name="microbus" v-if="item.code == 'microbus'"><icon-microbus /></icon-base>
                        <icon-base icon-name="minivan" v-if="item.code == 'minivan'"><icon-minivan /></icon-base>
                        <icon-base icon-name="wagon" v-if="item.code == 'wagon'"><icon-wagon /></icon-base>
                    </div>
                    <div class="cis-filter-on-main-bodies-item-backicon">
                        <icon-base icon-name="crossoverback" v-if="item.code == 'crossover'"><icon-crossoverback /></icon-base>
                        <icon-base icon-name="cupeback" v-if="item.code == 'cupe'"><icon-cupeback /></icon-base>
                        <icon-base icon-name="hatchbackback" v-if="item.code == 'hatchback'"><icon-hatchbackback /></icon-base>
                        <icon-base icon-name="pickupback" v-if="item.code == 'pickup'"><icon-pickupback /></icon-base>
                        <icon-base icon-name="sedanback" v-if="item.code == 'sedan'"><icon-sedanback /></icon-base>
                        <icon-base icon-name="suvback" v-if="item.code == 'suv'"><icon-suvback /></icon-base>
                        <icon-base icon-name="bortvanback" v-if="item.code == 'bortvan'"><icon-bortvanback /></icon-base>
                        <icon-base icon-name="liftbackback" v-if="item.code == 'liftback'"><icon-liftbackback /></icon-base>
                        <icon-base icon-name="microbusback" v-if="item.code == 'microbus'"><icon-microbusback /></icon-base>
                        <icon-base icon-name="vanback" v-if="item.code == 'van'"><icon-vanback /></icon-base>
                        <icon-base icon-name="minivanback" v-if="item.code == 'minivan'"><icon-minivanback /></icon-base>
                        <icon-base icon-name="wagonback" v-if="item.code == 'wagon'"><icon-wagonback /></icon-base>
                    </div>
                </div>
                <div class="cis-filter-on-main-bodies-item-title">{{ item.name }}</div>
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
import IconPickup from './icons/IconPickup.vue'
import IconPickupback from './icons/IconPickupback.vue'
import IconSedan from './icons/IconSedan.vue'
import IconSedanback from './icons/IconSedanback.vue'
import IconSuv from './icons/IconSuv.vue'
import IconSuvback from './icons/IconSuvback.vue'
import IconVan from './icons/IconVan.vue'
import IconVanback from './icons/IconVanback.vue'

import IconBortvan from './icons/IconBortvan.vue'
import IconBortvanback from './icons/IconBortvanback.vue'
import IconLiftback from './icons/IconLiftback.vue'
import IconLiftbackback from './icons/IconLiftbackback.vue'
import IconMicrobus from './icons/IconMicrobus.vue'
import IconMicrobusback from './icons/IconMicrobusback.vue'
import IconMinivan from './icons/IconMinivan.vue'
import IconMinivanback from './icons/IconMinivanback.vue'
import IconWagon from './icons/IconWagon.vue'
import IconWagonback from './icons/IconWagonback.vue'

export default {
    name: 'CISBodies',
    components: {
        IconBase,
        IconCrossover, IconCrossoverback,
        IconCupe, IconCupeback,
        IconHatchback, IconHatchbackback,
        IconPickup, IconPickupback,
        IconSedan, IconSedanback,
        IconSuv, IconSuvback,
        IconVan, IconVanback,
        IconBortvan, IconBortvanback,
        IconLiftback, IconLiftbackback,
        IconMicrobus, IconMicrobusback,
        IconMinivan, IconMinivanback,
        IconWagon, IconWagonback
    },
    computed: {
        bodies() {return this.$root.bodies},
        link() {
            let get = []
            for ( let i in this.$root.settings.items[this.$root.itemIndx].params ) get.push(i+'='+this.$root.settings.items[this.$root.itemIndx].params[i])
            if ( this.$root.city ) get.push('city='+this.$root.city)
            return this.$root.settings.baseURL + '/' + this.$root.settings.items[this.$root.itemIndx].code + '/' + '?' + get.join('&');
        }
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