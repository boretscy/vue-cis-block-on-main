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
                            <multiselect 
                                v-model="brandValue" 
                                tag-placeholder="Выбрать бренд" 
                                placeholder="Марка" 
                                label="name" 
                                track-by="code" 
                                :options="brandOptions" 
                                :multiple="true" 
                                :taggable="true" 
                                :searchable="false"
                                selectLabel="Выбрать"
                                selectedLabel="Выбрано"
                                deselectLabel="Удалить"
                                @tag="addBrandTag"></multiselect>
                        </div>
                        <div class="col">
                            <multiselect 
                                v-model="modelValue" 
                                tag-placeholder="Выбрать модель" 
                                placeholder="Модель" 
                                label="name" 
                                track-by="code" 
                                :options="modelOptions" 
                                :multiple="true" 
                                :taggable="true" 
                                :searchable="false"
                                selectLabel="Выбрать"
                                selectedLabel="Выбрано"
                                deselectLabel="Удалить"
                                @tag="addBrandTag"></multiselect>
                        </div>
                        <div class="col">
                            <div 
                                class="bg-yawhite b-yagray b-radius-small position-relative"
                                v-if="response">
                                <div class="row px-3 pt-1 mb-2 align-items-center" style="height: 28px">
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
                                        ></vue-slider>
                                </section>
                            </div>
                            <div 
                                class="bg-yawhite b-yagray b-radius-small py-4"
                                v-else></div>
                        </div>
                        <div class="col">
                            <a 
                                :href="buttonLink" 
                                class="d-block text-center c-yawhite c-h-yawhite bg-h-yablue bg-yadarkblue text-decoration-none b-radius-small but-lg"
                                style="padding: 7px;"
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
            rangeValue: [0, 0],
            rangeMin: 0,
            rangeMax: 100000000,
            brandIndx: [],
            modelIndx: null,
            totalCount: 0,
            rangeInterval: 1,
            buttonLink: '/cars/new',

            brandValue: [
            ],
            brandOptions: [
            ],

            modelValue: [
            ],
            modelOptions: [
                { name: 'Выберите марку', code: '' }
            ]
        }
    },
    computed: {

        link() {return this.$root.link},
        response() {return this.$root.response}
    },
    watch: {
        brandValue: function() {
            this.buttonLink = this.buildLink()
            this.totalCount = this.buildTotal()
            this.modelOptions = this.buildModels()
        }
    },

    mounted: function() {

        setTimeout(() => {
            this.buildRange()
            this.buildTotal()
            this.buildBrands() 

            console.log(this.response.filter)
        }, 500);
    },

    methods: {

        buildLink() {

            let s = '/cars/'+this.link+'/filter?'
            if ( this.brandValue.length) {
                this.brandValue.forEach( function(item) {
                    s += '&brand='+item.code
                })
            }
            if ( this.modelValue.length) {
                this.modelValue.forEach( function(item) {
                    s += '&model='+item.code
                })
            }
            s += '&minprice='+this.rangeValue[0]+'&maxprice='+this.rangeValue[1]

            return s
        },
        buildBrands() {

            let s = this.brandOptions
            this.$root.response.filter.brands.forEach(function(item) { 
                s.push(
                    { name: item.name, code: item.alias }
                )
            })
        },
        buildModels() {

            let b = this.brandValue, res = []
            if ( b.length ) {
                this.$root.response.filter.brands.forEach(function(branditem) { 
                    b.forEach( function(item) {
                        if ( branditem.alias == item.code ) {
                            branditem.models.forEach( function(modelitem) {
                                res.push({ name: modelitem.name, code: modelitem.id })
                            })
                        }
                    })
                })
            }

            return res
        },
        buildTotal() {
            
            let res = 0
            if ( this.brandValue.length ) {
                let s = this.brandValue
                this.$root.response.filter.brands.forEach(function(branditem) {
                    s.forEach( function(tagitem) {
                        if (branditem.alias == tagitem.code) res += Number(branditem.vehicles)
                    })
                })
            } else {
                this.$root.response.filter.brands.forEach(function(item) { res += Number(item.vehicles) })
            }

            return res
        },



        buildRange() {
            this.rangeMin = Number( this.$root.response.filter.minPrice )
            this.rangeMax = Number( this.$root.response.filter.maxPrice )
            this.rangeValue = [this.rangeMin, this.rangeMax]
        },


        addBrandTag (newTag) {

            console.log('asf', newTag)

            // const tag = {
            //     name: newTag,
            //     code: newTag.substring(0, 2) + Math.floor((Math.random() * 10000000))
            // }

            // console.log(tag)
            // this.brandOptions.push(tag)
            // this.brandValue.push(tag)
            
            // let total = 0
            // if ( this.brandValue == null || this.brandValue == 'null' || this.brandValue == [] ) {
            //     this.$root.response.filter.brands.forEach(function(item) { total += Number(item.vehicles) })
            // } else {
            //     console.log(newTag, total)
            // }
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

.multiselect__spinner {
  position: absolute;
  right: 1px;
  top: 1px;
  width: 3rem;
  height: 2.1875rem;
  background: var(--yawhite);
  display: block; }
  .multiselect__spinner:before, .multiselect__spinner:after {
    position: absolute;
    content: '';
    top: 50%;
    left: 50%;
    margin: 0.875rem 0 0 0.875rem;
    width: 1rem;
    height: 1rem;
    border-radius: 100%;
    border-color: var(--yablue) transparent transparent;
    border-style: solid;
    border-width: 2px;
    box-shadow: 0 0 0 1px transparent; }
  .multiselect__spinner:before {
    animation: spinning 2.4s cubic-bezier(0.41, 0.26, 0.2, 0.62);
    animation-iteration-count: infinite; }
  .multiselect__spinner:after {
    animation: spinning 2.4s cubic-bezier(0.51, 0.09, 0.21, 0.8);
    animation-iteration-count: infinite; }

.multiselect__loading-transition {
  transition: opacity 0.4s ease-in-out;
  opacity: 1; }

.multiselect__loading-enter,
.multiselect__loading-leave {
  opacity: 0; }

.multiselect,
.multiselect__input,
.multiselect__single {
  font-family: inherit;
  font-size: 0.875rem;
  font-weight: lighter; }

.multiselect {
  box-sizing: content-box;
  display: block;
  position: relative;
  width: 100%;
  min-height: 2.5rem;
  text-align: left;
  color: var(--yablack); }
  .multiselect * {
    box-sizing: border-box; }
  .multiselect:focus {
    outline: none; }
  .multiselect--active {
    z-index: 50; }
    .multiselect--active .multiselect__current,
    .multiselect--active .multiselect__input,
    .multiselect--active .multiselect__tags {
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0; }
    .multiselect--active .multiselect__select {
      transform: rotateZ(180deg); }

.multiselect__input,
.multiselect__single {
  position: relative;
  display: inline-block;
  min-height: 1.25rem;
  line-height: 1.25rem;
  border: none;
  border-radius: 5px;
  background: var(--yawhite);
  padding: 1px 0 0 0.3125rem;
  width: auto;
  transition: border .1s ease;
  box-sizing: border-box;
  margin-bottom: 0.5rem; }
  .multiselect__input:hover,
  .multiselect__single:hover {
    border-color: #cfcfcf; }
  .multiselect__input:focus,
  .multiselect__single:focus {
    border-color: #a8a8a8;
    outline: none; }

.multiselect__single {
  padding-left: 0.375rem;
  margin-bottom: 0.5rem; }

.multiselect__tags {
  min-height: 2.5rem;
  display: block;
  padding: 0.5rem 2.5rem 0 0.5rem;
  border-radius: 5px;
  border: 1px solid var(--yagray);
  background: var(--yawhite); 
  font-size: 12px;}

.multiselect__tag {
  position: relative;
  display: inline-block;
  padding: 0.25rem 1.625rem 0.25rem 0.625rem;
  border-radius: 5px;
  margin-right: 0.625rem;
  color: var(--yawhite);
  line-height: 1;
  background: var(--yablue);
  margin-bottom: 0.5rem; }

.multiselect__tag-icon {
  cursor: pointer;
  margin-left: 7px;
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  font-weight: 700;
  font-style: initial;
  width: 1.375rem;
  text-align: center;
  line-height: 1.375rem;
  transition: all 0.2s ease;
  border-radius: 5px; }
  .multiselect__tag-icon:after {
    content: "\00D7";
    color: var(--yagray);
    font-size: 0.875rem; }
  .multiselect__tag-icon:focus, .multiselect__tag-icon:hover {
    background: var(--yadarkblue); }
    .multiselect__tag-icon:focus:after, .multiselect__tag-icon:hover:after {
      color: white; }

.multiselect__current {
  line-height: 1rem;
  min-height: 2.5rem;
  box-sizing: border-box;
  display: block;
  overflow: hidden;
  padding: 0.5rem 0.75rem 0;
  padding-right: 1.875rem;
  white-space: nowrap;
  margin: 0;
  text-decoration: none;
  border-radius: 5px;
  border: 1px solid var(--yagray);
  cursor: pointer; }

.multiselect__select {
  line-height: 1rem;
  display: block;
  position: absolute;
  box-sizing: border-box;
  width: 2.5rem;
  height: 2.375rem;
  right: 1px;
  top: 1px;
  padding: 0.25rem 0.5rem;
  margin: 0;
  text-decoration: none;
  text-align: center;
  cursor: pointer;
  transition: transform 0.2s ease; }
  .multiselect__select:before {
    position: relative;
    right: 0;
    top: 65%;
    color: #999;
    margin-top: 0.25rem;
    border-style: solid;
    border-width: 0.3125rem 0.3125rem 0 0.3125rem;
    border-color: #999999 transparent transparent transparent;
    content: ""; }

.multiselect__placeholder {
  color: var(--yablack);
  display: inline-block;
  margin-bottom: 0rem;
    padding-top: 0rem;
    font-size: 16px; }
  .multiselect--active .multiselect__placeholder {
    display: none; }

.multiselect__content {
  position: absolute;
  list-style: none;
  display: block;
  background: var(--yawhite);
  width: 100%;
  max-height: 15rem;
  overflow: auto;
  padding: 0;
  margin: 0;
  border: 1px solid var(--yagray);
  border-top: none;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  z-index: 50; }
  .multiselect__content::webkit-scrollbar {
    display: none; }

.multiselect__option {
  display: block;
  padding: 0.75rem;
  min-height: 2.5rem;
  line-height: 1rem;
  font-weight: 300;
  text-decoration: none;
  text-transform: none;
  vertical-align: middle;
  position: relative;
  cursor: pointer; }
  .multiselect__option:after {
    top: 0;
    right: 0;
    position: absolute;
    line-height: 2.5rem;
    padding-right: 0.75rem;
    padding-left: 1.25rem; }
  .multiselect__option--highlight {
    background: var(--yalightblue);
    outline: none;
    color: white; }
    .multiselect__option--highlight:after {
      content: attr(data-select);
      color: white; }
  .multiselect__option--selected {
    background: #F3F3F3;
    color: var(--yablack);
    font-weight: bold; }
    .multiselect__option--selected:after {
      content: attr(data-selected);
      font-weight: 300;
      color: silver; }

.multiselect__option--selected.multiselect__option--highlight {
  background: #FF6A6A;
  color: var(--yawhite);
  font-weight: lighter; }
  .multiselect__option--selected.multiselect__option--highlight:after {
    content: attr(data-deselect);
    color: var(--yawhite); }

.multiselect--disabled {
  background: #ededed;
  pointer-events: none; }
  .multiselect--disabled .multiselect__current,
  .multiselect--disabled .multiselect__select {
    background: #ededed;
    color: #a6a6a6; }

.multiselect__option--disabled {
  background: #ededed;
  color: #a6a6a6;
  cursor: text;
  pointer-events: none; }
  .multiselect__option--disabled:visited {
    color: #a6a6a6; }
  .multiselect__option--disabled:hover, .multiselect__option--disabled:focus {
    background: #3dad7b; }

.multiselect-transition {
  transition: all .3s ease; }

.multiselect-enter, .multiselect-leave {
  opacity: 0;
  max-height: 0 !important; }

</style>
