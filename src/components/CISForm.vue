<template>
    <div>
        <div class="row">
            <div class="col">
                <form class="bg-yayellow b-radius-small p-3 p-md-5 m-0">
                    <div class="row mb-3">
                        <div class="col-6"><h3 class="fw-normal">Найти автомобиль</h3></div>
                        <div class="col-6 text-end">
                            <ul class="list-inline text-minus pt-2">
                                <li class="list-inline-item ms-3">
                                    <a 
                                        href="#" 
                                        class="text-uppercase c-yablack c-h-yablue text-decoration-none letter-spacing-plus fw-bold"
                                        :class="{'c-yablue': link =='new' }"
                                        @click.prevent="setLink('new')"
                                        >Новые</a>
                                </li>
                                <li class="list-inline-item ms-3">
                                    <a 
                                        href="#" 
                                        class="text-uppercase c-yablack c-h-yablue text-decoration-none letter-spacing-plus fw-bold"
                                        :class="{'c-yablue': link =='used' }"
                                        @click.prevent="setLink('used')"
                                        >С пробегом</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6 col-xl-3 mb-3">
                            <multiselect 
                                v-model="brandValue" 
                                tag-placeholder="Выбрать бренд" 
                                placeholder="Марка" 
                                label="name" 
                                track-by="code" 
                                :options="brandOptions" 
                                :multiple="true" 
                                :searchable="false"
                                :close-on-select="false" 
                                :clear-on-select="false"
                                selectLabel="Выбрать"
                                selectedLabel="Выбрано"
                                deselectLabel="Удалить"
                                >
                                <template slot="selection" slot-scope="{ values, search, isOpen }"><span class="multiselect__single" v-if="values.length &amp;&amp; !isOpen">{{ values.length }} выбрано</span></template>
                                </multiselect>
                        </div>
                        <div class="col-md-6 col-xl-3 mb-3">
                            <multiselect 
                                v-model="modelValue" 
                                tag-placeholder="Выбрать модель" 
                                placeholder="Модель" 
                                label="name" 
                                track-by="code" 
                                :options="modelOptions" 
                                :multiple="true" 
                                :searchable="false"
                                :close-on-select="false" 
                                :clear-on-select="false"
                                selectLabel="Выбрать"
                                selectedLabel="Выбрано"
                                deselectLabel="Удалить"
                                >
                                <template slot="selection" slot-scope="{ values, search, isOpen }"><span class="multiselect__single" v-if="values.length &amp;&amp; !isOpen">{{ values.length }} выбрано</span></template>
                                </multiselect>
                        </div>
                        <div class="col-md-6 col-xl-3 mb-3">
                            <div 
                                class="bg-yawhite b-yagray b-radius-small position-relative"
                                v-if="response">
                                <div class="row px-3 pt-2 mb-2 align-items-center" style="height: 35px">
                                    <div class="col-6 text-start">
                                        {{ Format(rangeValue[0]) }} ₽
                                    </div>
                                    <div class="col-6 text-end">
                                        {{ Format(rangeValue[1]) }} ₽
                                    </div>
                                </div>
                                <section class="cis-filter-on-main-range-slider">
                                    <vue-slider 
                                        v-model="rangeValue"
                                        :min="rangeMin"
                                        :max="rangeMax"
                                        :interval="rangeInterval"
                                        tooltip="none"
                                        @drag-end="rangeEnd"
                                        ></vue-slider>
                                </section>
                            </div>
                            <div 
                                class="bg-yawhite b-yagray b-radius-small"
                                style="height: 45px;"
                                v-else></div>
                        </div>
                        <div class="col-md-6 col-xl-3 mb-3">
                            <a 
                                :href="buttonLink" 
                                class="d-block text-center c-yawhite c-h-yawhite bg-h-yablue bg-yadarkblue text-decoration-none b-radius-small but-lg"
                                style="padding: 10px;"
                                >Показать {{ Format(totalCount) }} авто</a>
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
import Multiselect from 'vue-multiselect'

export default {
    name: 'CISForm',
    components: {
        VueSlider,
        Multiselect
    },
    data: function() {
        return {
            rangeValue: [0,99999999],
            rangeMin: 0,
            rangeMax: 99999999,
            rangeInterval: 1,

            totalCount: 0,
            buttonLink: '/',

            brandValue: [
            ],
            brandOptions: [
            ],

            modelValue: [
            ],
            modelOptions: [
            ],
        }
    },
    computed: {

        link() {return this.$root.link},
        response() {return this.$root.response}
    },
    watch: {
        brandValue: function(newValue) {
            this.modelOptions = []
            if ( newValue.length ) {
                let url = 'https://apps.yug-avto.ru/API/get/cis/models/'+this.$root.link+'/?token='+this.$root.token+'&brand='
                newValue.forEach( (i, indx) => {
                    url += i.code
                    if ( indx < newValue.length-1 ) url += ','  
                })
                this.axios.get(url).then((response) => {
                    
                    response.data.forEach( (i) => {
                        this.modelOptions.push(
                            { name: i.name, code: i.alias, min: i.min, max: i.max, vehicles: i.statistics[1].counter + i.statistics[2].counter }
                        )
                    })
                })
            }
            if ( newValue.length ) this.buildRange('brandValue')
            if ( !newValue.length ) this.buildRange('brandOptions')
            this.buttonLink = this.buildLink()
            this.totalCount = this.buildTotal()

        },
        modelValue: function(newValue) {
            this.buttonLink = this.buildLink()
            this.totalCount = this.buildTotal()
            if ( newValue.length ) this.buildRange('modelValue')
            if ( !newValue.length ) this.buildRange('modelOptions')
        },
        '$root.link': function() {
            this.getBrands()
        }
    },

    mounted: function() {

        this.getBrands()
        setInterval(() => {
            
            if ( localStorage.getItem('YAPP_SELECTED_CITY') != this.$root.city ) {
                this.$root.city = localStorage.getItem('YAPP_SELECTED_CITY')
                this.getBrands()
            }
            
        }, 500);
    },

    methods: {

        getBrands() {

            let url = 'https://apps.yug-avto.ru/API/get/cis/brands/'+this.$root.link+'/?token='+this.$root.token
            if ( this.$root.city ) url += '&city='+this.$root.city

            this.axios.get(url).then((response) => {
                
                this.$root.response = response.data.dropLists.brands
                this.$root.response.sort((a, b) => a.vehicles < b.vehicles ? 1 : -1)
                this.$root.inCity = response.data.in_city
                console.log(this.$root.inCity)
                this.buildBrands().then( () => {
                    this.buildRange('brandOptions')
                    this.buttonLink = this.buildLink()
                    this.totalCount = this.buildTotal()
                })
            
            })
        },

        buildLink() {

            let l = '/cars/'+this.link+'/#', q = ''

            if ( this.brandValue.length == 1 ) l += '/'+this.brandValue[0].code
            if ( this.brandValue.length == 1 && this.modelValue.length == 1 ) l += '/'+this.modelValue[0].code

            if ( this.brandValue.length > 1 ) {
                q += 'brand='
                this.brandValue.forEach( (i, indx) => {
                    q += i.code
                    if ( indx < this.brandValue.length-1 ) q += ','
                })
            }
            if ( (this.brandValue.length > 1 && this.modelValue.length ) ) {
                q += '&model='
                this.modelValue.forEach( (i, indx) => {
                    q += i.code
                    if ( indx < this.modelValue.length-1 ) q += ','
                })
            }
            if ( this.rangeValue[0] != 0 || this.rangeValue[1] != 99999999 ) {
                q += '&minprice='+this.rangeValue[0]
                q += '&maxprice='+this.rangeValue[1]
            }

            return l + ((q.length)?'?':'') + q
        },
        buildBrands() {

            return new Promise((resolve) => {
                this.brandOptions = []
                this.$root.response.forEach( (i) => {
                this.brandOptions.push(i)
                })
                resolve(true)
            })
        },
        buildTotal() {
            
            let res = 0
            if ( this.modelOptions.length ) {
                if ( this.modelValue.length ) {
                    this.modelValue.forEach( (i) => {
                        res += i.vehicles
                    })
                } else {
                    this.modelOptions.forEach( (i) => {
                        res += i.vehicles
                    })
                }
            } else {
                if ( this.brandValue.length ) {
                    this.brandValue.forEach( (i) => {
                        res += i.vehicles
                    })
                } else {
                    this.brandOptions.forEach( (i) => {
                        res += i.vehicles
                    })
                }
            }

            return res
        },
        
        resetRange() {
            this.rangeMin = 0
            this.rangeMax = 99999999
            this.rangeValue = [0, 99999999]
        },
        rangeEnd() {
            this.buttonLink = this.buildLink()

            let url = this.$root.apiUrl+'filter/'+this.$root.link+'/?'
            let s = []
            if ( this.brandValue.length ) {
                this.brandValue.forEach( (i) => {
                    s.push(i.alias)
                })
                url += '?brand='+s.join(',')
            }
            s = []
            if ( this.modelValue.length ) {
                this.modelValue.forEach( (i) => {
                    s.push(i.alias)
                })
                url += '&model='+s.join(',')
            }
            url += '&minprice='+this.rangeValue[0]
            url += '&maxprice='+this.rangeValue[1]
            url += '&token='+this.$root.token

            this.axios.get(url).then((response) => {
                this.totalCount = response.data.totalCount
            })
        },
        buildRange(from = 'brandOptions') {
            this.resetRange()
            
            let min = 99999999, max = 0
            this[from].forEach( (i) => {
                if ( i.min < min ) min = i.min
                if ( i.max > max ) max = i.max
            })

            this.rangeValue = [min, max]
            this.rangeMin = min
            this.rangeMax = max
        },

        setLink(v) {
            this.$root.link = v
            this.buttonLink = this.buildLink()
        },

        Format(q) {
			
            var Price = new Intl.NumberFormat('ru', { currency: 'RUR' });
            return Price.format(q);	
        }
    }
}
</script>

<style>
.cis-filter-on-main-range-slider {
    position: absolute;
	bottom: -25px;
    width: 100%;
    height: 35px;
    text-align: center;
}

fieldset[disabled] .multiselect {
  pointer-events: none;
}
.multiselect__spinner {
  position: absolute;
  right: 1px;
  top: 1px;
  width: 48px;
  height: 35px;
  background: var(--yawhite);
  display: block;
}
.multiselect__spinner:before,
.multiselect__spinner:after {
  position: absolute;
  content: "";
  top: 50%;
  left: 50%;
  margin: -8px 0 0 -8px;
  width: 16px;
  height: 16px;
  border-radius: 100%;
  border-color: var(--yadarkblue) transparent transparent;
  border-style: solid;
  border-width: 2px;
  box-shadow: 0 0 0 1px transparent;
}
.multiselect__spinner:before {
  animation: spinning 2.4s cubic-bezier(0.41, 0.26, 0.2, 0.62);
  animation-iteration-count: infinite;
}
.multiselect__spinner:after {
  animation: spinning 2.4s cubic-bezier(0.51, 0.09, 0.21, 0.8);
  animation-iteration-count: infinite;
}
.multiselect__loading-enter-active,
.multiselect__loading-leave-active {
  transition: opacity 0.4s ease-in-out;
  opacity: 1;
}
.multiselect__loading-enter,
.multiselect__loading-leave-active {
  opacity: 0;
}
.multiselect,
.multiselect__input,
.multiselect__single {
  font-family: inherit;
  font-size: 16px;
  touch-action: manipulation;
}
.multiselect {
  box-sizing: content-box;
  display: block;
  position: relative;
  width: 100%;
  height: 40px;
  text-align: left;
  color: var(--yablack);
}
.multiselect * {
  box-sizing: border-box;
}
.multiselect:focus {
  outline: none;
}
.multiselect--disabled {
  background: #ededed;
  pointer-events: none;
  opacity: 0.6;
}
.multiselect--active {
  z-index: 50;
}
.multiselect--active:not(.multiselect--above) .multiselect__current,
.multiselect--active:not(.multiselect--above) .multiselect__input,
.multiselect--active:not(.multiselect--above) .multiselect__tags {
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

.multiselect--active {
    transform: none !important;
  }
.multiselect--above.multiselect--active .multiselect__current,
.multiselect--above.multiselect--active .multiselect__input,
.multiselect--above.multiselect--active .multiselect__tags {
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
.multiselect__input,
.multiselect__single {
  position: relative;
  display: inline-block;
  min-height: 20px;
  line-height: 20px;
  border: none;
  border-radius: 5px;
  background: var(--yawhite);
  padding: 0 0 0 5px;
  width: calc(100%);
  transition: border 0.1s ease;
  box-sizing: border-box;
  margin-bottom: 8px;
  vertical-align: top;
}
.multiselect__input::placeholder {
  color: var(--yablack);
}
.multiselect__tag ~ .multiselect__input,
.multiselect__tag ~ .multiselect__single {
  width: auto;
}
.multiselect__input:hover,
.multiselect__single:hover {
  border-color: #cfcfcf;
}
.multiselect__input:focus,
.multiselect__single:focus {
  border-color: #a8a8a8;
  outline: none;
}
.multiselect__single {
  padding-left: 5px;
  margin-bottom: 8px;
}
.multiselect__tags-wrap {
  display: inline;
}
.multiselect__tags {
  min-height: 40px;
  display: block;
  padding: 10px 40px 0 10px;
  border-radius: 5px;
  border: 1px solid var(--yagray);
  background: var(--yawhite);
  font-size: 14px;
  min-height: 45px;
}
.multiselect__tag {
  position: relative;
  display: inline-block;
  padding: 4px 26px 4px 10px;
  border-radius: 5px;
  margin-right: 10px;
  color: var(--yawhite);
  line-height: 1;
  background: var(--yadarkblue);
  margin-bottom: 5px;
  white-space: nowrap;
  overflow: hidden;
  max-width: 100%;
  text-overflow: ellipsis;
}
.multiselect__tag-icon {
  cursor: pointer;
  margin-left: 7px;
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  font-weight: 700;
  font-style: initial;
  width: 22px;
  text-align: center;
  line-height: 22px;
  transition: all 0.2s ease;
  border-radius: 5px;
}
.multiselect__tag-icon:after {
  content: "×";
  color: var(--yayellow);
  font-size: 14px;
}
.multiselect__tag-icon:focus,
.multiselect__tag-icon:hover {
  background: var(--yayellow);
  color: var(--yadarkblue);
}
.multiselect__tag-icon:focus:after,
.multiselect__tag-icon:hover:after {
  color: white;
}
.multiselect__current {
  line-height: 16px;
  min-height: 40px;
  box-sizing: border-box;
  display: block;
  overflow: hidden;
  padding: 8px 12px 0;
  padding-right: 30px;
  white-space: nowrap;
  margin: 0;
  text-decoration: none;
  border-radius: 5px;
  border: 1px solid var(--yagray);
  cursor: pointer;
}
.multiselect__select {
  line-height: 16px;
  display: block;
  position: absolute;
  box-sizing: border-box;
  width: 40px;
  height: 42px;
  right: 1px;
  top: 1px;
  padding: 4px 8px;
  margin: 0;
  text-decoration: none;
  text-align: center;
  cursor: pointer;
  transition: transform 0.2s ease;
}
.multiselect__select:before {
  position: relative;
  right: 0;
  top: 65%;
  color: var(--yamiddlegray);
  margin-top: 4px;
  border-style: solid;
  border-width: 5px 5px 0 5px;
  border-color: var(--yamiddlegray) transparent transparent transparent;
  content: "";
}
.multiselect__placeholder {
  color: var(--yablack);
  display: inline-block;
  margin-bottom: 10px;
  padding-top: 2px;
}
.multiselect--active .multiselect__placeholder {
  display: none;
}
.multiselect__content-wrapper {
  position: absolute;
  display: block;
  background: var(--yawhite);
  width: 100%;
  max-height: 240px;
  overflow: auto;
  border: 1px solid var(--yagray);
  border-top: none;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  z-index: 50;
  -webkit-overflow-scrolling: touch;
}
.multiselect__content {
  list-style: none;
  display: inline-block;
  padding: 0;
  margin: 0;
  min-width: 100%;
  vertical-align: top;
}
.multiselect--above .multiselect__content-wrapper {
  bottom: 100%;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  border-bottom: none;
  border-top: 1px solid var(--yagray);
}
.multiselect__content::webkit-scrollbar {
  display: none;
}
.multiselect__element {
  display: block;
}
.multiselect__option {
  display: block;
  padding: 12px;
  min-height: 40px;
  line-height: 16px;
  text-decoration: none;
  text-transform: none;
  vertical-align: middle;
  position: relative;
  cursor: pointer;
  white-space: nowrap;
}
.multiselect__option:after {
  top: 0;
  right: 0;
  position: absolute;
  line-height: 40px;
  padding-right: 12px;
  padding-left: 20px;
  font-size: 13px;
}
.multiselect__option--highlight {
  background: var(--yalightgray);
  outline: none;
  color: var(--yablack);
}
.multiselect__option--highlight:after {
  content: attr(data-select);
  background: var(--yalightgray);
  color: var(--yamiddlegray);
}
.multiselect__option--selected {
  background: var(--yalightgray);
  color: var(--yablack);
  font-weight: bold;
}
.multiselect__option--selected:after {
  content: attr(data-selected);
  color: var(--yamiddlegray);
}
.multiselect__option--selected.multiselect__option--highlight {
  background: var(--yalightgray);
  color: var(--yamiddlegray);
}
.multiselect__option--selected.multiselect__option--highlight:after {
  background: var(--yalightgray);
  content: attr(data-deselect);
  color: var(--yamiddlegray);
}
.multiselect--disabled .multiselect__current,
.multiselect--disabled .multiselect__select {
  background: #ededed;
  color: #a6a6a6;
}
.multiselect__option--disabled {
  background: #ededed !important;
  color: #a6a6a6 !important;
  cursor: text;
  pointer-events: none;
}
.multiselect__option--group {
  background: #ededed;
  color: var(--yablack);
}
.multiselect__option--group.multiselect__option--highlight {
  background: var(--yamiddlegray);
  color: var(--yawhite);
}
.multiselect__option--group.multiselect__option--highlight:after {
  background: var(--yablack);
}
.multiselect__option--disabled.multiselect__option--highlight {
  background: #dedede;
}
.multiselect__option--group-selected.multiselect__option--highlight {
  background: var(--yalightgray);
  color: var(--yawhite);
}
.multiselect__option--group-selected.multiselect__option--highlight:after {
  background: var(--yalightgray);
  content: attr(data-deselect);
  color: var(--yawhite);
}
.multiselect-enter-active,
.multiselect-leave-active {
  transition: all 0.15s ease;
}
.multiselect-enter,
.multiselect-leave-active {
  opacity: 0;
}
.multiselect__strong {
  margin-bottom: 8px;
  line-height: 20px;
  display: inline-block;
  vertical-align: top;
}
*[dir="rtl"] .multiselect {
  text-align: right;
}
*[dir="rtl"] .multiselect__select {
  right: auto;
  left: 1px;
}
*[dir="rtl"] .multiselect__tags {
  padding: 8px 8px 0px 40px;
}
*[dir="rtl"] .multiselect__content {
  text-align: right;
}
*[dir="rtl"] .multiselect__option:after {
  right: auto;
  left: 0;
}
*[dir="rtl"] .multiselect__clear {
  right: auto;
  left: 12px;
}
*[dir="rtl"] .multiselect__spinner {
  right: auto;
  left: 1px;
}
@keyframes spinning {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(2turn);
  }
}
</style>
