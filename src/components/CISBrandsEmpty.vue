<template>
    <div>
        <div class="row my-5 cis-filter-on-main-brands">
            <div class="col-6">
                <h3 class="fw-normal">Автомобили в наличии</h3>
            </div>
            <div class="col-6 text-end pt-2">
                <a 
                    :href="'/cars/new'" 
                    class="c-yablack c-h-yablack text-decoration-none">
                    Все марки
                    <svg xmlns="http://www.w3.org/2000/svg"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#corner-right"></use></svg>
                </a>
            </div>
        </div>
        <div class="row mb-5">
            <div class="col-6 col-md-3 col-lg-2 cis-filter-on-main-brands-item mb-3"><a class="text-decoration-none c-yadarkgray c-h-yablack d-block b-radius-small bg-yalightgray py-1 ps-3">&nbsp;</a></div>
            <div class="col-6 col-md-3 col-lg-2 cis-filter-on-main-brands-item mb-3"><a class="text-decoration-none c-yadarkgray c-h-yablack d-block b-radius-small bg-yalightgray py-1 ps-3">&nbsp;</a></div>
            <div class="col-6 col-md-3 col-lg-2 cis-filter-on-main-brands-item mb-3"><a class="text-decoration-none c-yadarkgray c-h-yablack d-block b-radius-small bg-yalightgray py-1 ps-3">&nbsp;</a></div>
            <div class="col-6 col-md-3 col-lg-2 cis-filter-on-main-brands-item mb-3"><a class="text-decoration-none c-yadarkgray c-h-yablack d-block b-radius-small bg-yalightgray py-1 ps-3">&nbsp;</a></div>
            <div class="col-6 col-md-3 col-lg-2 cis-filter-on-main-brands-item mb-3"><a class="text-decoration-none c-yadarkgray c-h-yablack d-block b-radius-small bg-yalightgray py-1 ps-3">&nbsp;</a></div>
            <div class="col-6 col-md-3 col-lg-2 cis-filter-on-main-brands-item mb-3"><a class="text-decoration-none c-yadarkgray c-h-yablack d-block b-radius-small bg-yalightgray py-1 ps-3">&nbsp;</a></div>
            <div class="col-6 col-md-3 col-lg-2 cis-filter-on-main-brands-item mb-3"><a class="text-decoration-none c-yadarkgray c-h-yablack d-block b-radius-small bg-yalightgray py-1 ps-3">&nbsp;</a></div>
            <div class="col-6 col-md-3 col-lg-2 cis-filter-on-main-brands-item mb-3"><a class="text-decoration-none c-yadarkgray c-h-yablack d-block b-radius-small bg-yalightgray py-1 ps-3">&nbsp;</a></div>
            <div class="col-6 col-md-3 col-lg-2 cis-filter-on-main-brands-item mb-3"><a class="text-decoration-none c-yadarkgray c-h-yablack d-block b-radius-small bg-yalightgray py-1 ps-3">&nbsp;</a></div>
            <div class="col-6 col-md-3 col-lg-2 cis-filter-on-main-brands-item mb-3"><a class="text-decoration-none c-yadarkgray c-h-yablack d-block b-radius-small bg-yalightgray py-1 ps-3">&nbsp;</a></div>
            <div class="col-6 col-md-3 col-lg-2 cis-filter-on-main-brands-item mb-3"><a class="text-decoration-none c-yadarkgray c-h-yablack d-block b-radius-small bg-yalightgray py-1 ps-3">&nbsp;</a></div>
            <div class="col-6 col-md-3 col-lg-2 cis-filter-on-main-brands-item mb-3"><a class="text-decoration-none c-yadarkgray c-h-yablack d-block b-radius-small bg-yalightgray py-1 ps-3">&nbsp;</a></div>
        </div>

        
    </div>
</template>

<script>
export default {
    name: 'CISBrandsEmpty'
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
</style>