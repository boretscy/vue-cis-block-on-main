<template>
    <div class="container my-5">
        <div class="row mt-5 mb-3 cis-filter-on-main-bodies">
            <div class="col-6">
                <h2 class="h3 fw-normal">Найти по типу кузова</h2>
            </div>
            <div class="col-6 text-end pt-2">
                <a href="/cars/new/" class="c-yablack c-h-yablack text-decoration-none">
                    Все типы кузовов
                    <svg xmlns="http://www.w3.org/2000/svg"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#corner-right"></use></svg>
                </a>
            </div>
        </div>
        <div class="row">
            <div class="col-6 col-md bg-yalightgray b-radius-small mx-3" style="height: 67.5px"></div>
            <div class="col-6 col-md bg-yalightgray b-radius-small mx-3" style="height: 67.5px"></div>
            <div class="col-6 col-md bg-yalightgray b-radius-small mx-3" style="height: 67.5px"></div>
            <div class="col-6 col-md bg-yalightgray b-radius-small mx-3" style="height: 67.5px"></div>
            <div class="col-6 col-md bg-yalightgray b-radius-small mx-3" style="height: 67.5px"></div>
        </div>
        
    </div>
</template>

<script>

export default {
    name: 'CISBodiesEmpty'
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