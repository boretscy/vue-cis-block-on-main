<template>
    <div>
        <div class="row">
            <div class="col">
                <form class="bg-yayellow b-radius-small p-5 m-0">
                    <div class="row mb-3">
                        <div class="col-6"><h3 class="fw-normal">Найти автомобиль</h3></div>
                        <div class="col-6 text-end">
                            <ul class="list-inline text-minus pt-2">
                                <li class="list-inline-item ms-3">
                                    <a 
                                        href="#" 
                                        class="text-uppercase c-yablack c-h-yablue text-decoration-none letter-spacing-plus fw-bold"
                                        :class="{'c-yablue': link =='new' }"
                                        @click.prevent="getBrands('new')"
                                        >Новые</a>
                                </li>
                                <li class="list-inline-item ms-3">
                                    <a 
                                        href="#" 
                                        class="text-uppercase c-yablack c-h-yablue text-decoration-none letter-spacing-plus fw-bold"
                                        :class="{'c-yablue': link =='used' }"
                                        @click.prevent="getBrands('used')"
                                        >С пробегом</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <select 
                                class="form-select form-select-lg b-radius-small"
                                v-if="response"
                                v-model="brand"
                                >
                                <option selected disabled value="empty">Марка</option>
                                <option
                                    v-for="item in response.filter.brands"
                                    :key="item.id"
                                    :value="item.id"
                                    >{{ item.name }}</option>
                            </select>
                            <select 
                                class="form-select form-select-lg b-radius-small"
                                v-else
                                >
                                <option selected disabled value="empty">Марка</option>
                            </select>
                        </div>
                        <div class="col">
                            <select 
                                class="form-select form-select-lg b-radius-small"
                                v-if="brand != 'empty'"
                                v-model="model"
                                >
                                <option selected disabled value="empty">Модель</option>
                                <option
                                    v-for="item in models"
                                    :key="item.id"
                                    :value="item.id"
                                    >{{ item.name }}</option>
                            </select>
                            <select 
                                class="form-select form-select-lg b-radius-small"
                                v-else>
                                <option selected disabled value="empty">Модель</option>
                            </select>
                        </div>
                        <div class="col">
                            <div 
                                class="bg-yawhite b-yagray b-radius-small position-relative"
                                v-if="response">
                                <div class="row px-3 py-2 mb-2">
                                    <div class="col-6 text-start">{{ Format(rangeValue[0]) }} ₽</div>
                                    <div class="col-6 text-end">{{ Format(rangeValue[1]) }} ₽</div>
                                </div>
                                <section class="cis-filter-on-main-range-slider">
                                    <vue-slider 
                                        v-model="rangeValue"
                                        :min="rangeMin"
                                        :max="rangeMax"
                                        :interval="1000"
                                        tooltip="none"
                                        ></vue-slider>
                                </section>
                            </div>
                            <div 
                                class="bg-yawhite b-yagray b-radius-small py-4"
                                v-else></div>
                        </div>
                        <div class="col">
                            <a href="#" class="d-block text-center c-yawhite c-h-yawhite bg-yablue bg-h-yadarkblue text-decoration-none b-radius-small but-lg">Показать {{ Format(total) }} авто</a>
                        </div>
                    </div>
                </form>
            </div>
        </div>

    </div>
</template>

<script>
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/default.css'

export default {
    name: 'CISForm',
    components: {
        VueSlider
    },
    data: function() {
        return {
            rangeValue: [0, 0]
        }
    },
    computed: {

        link() {return this.$root.link},
        total() {return this.$root.total},
        brand() {return this.$root.brand},
        model() {
            
            let res = 'empty'
            if ( this.$root.brand != 'empty' ) {
                res = []
                this.$root.response.filte.models.forEach(function(item) {
                    if (Number(item.brand_id) == Number(this.$root.brand)) res.push(item)
                });

                alert(res)
            }
            return res
        },
        response() {return this.$root.response},
        rangeMin() {return this.$root.rangeMin},
        rangeMax() {return this.$root.rangeMax},
        rangeValueC() {return this.$root.rangeValue},
    },

    mounted: function() {

        setInterval(() => {
            this.rangeValue = this.rangeValueC
        }, 500);
    },

    methods: {



        Format(q) {
			
            var Price = new Intl.NumberFormat('ru', { currency: 'RUR' });
            return Price.format(q);	
        }
    }
}
</script>

<style scoped>
.cis-filter-on-main-range-slider {
    position: absolute;
	bottom: -25px;
    width: 100%;
    height: 35px;
    text-align: center;
}
</style>
