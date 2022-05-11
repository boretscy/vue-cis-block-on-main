<template>
    <svg
        xmlns="http://www.w3.org/2000/svg" 
        :width="width" 
        :height="height" 
        viewBox="0 0 200 90" 
        :aria-labelledby="iconName" 
        role="presentation"
    >
        <title
        :id="iconName"
        lang="en"
        >{{ iconName }} icon</title>
        <g>
            <slot />
        </g>
    </svg>
</template>

<script>
export default {
    props: {
        iconName: {
            type: String,
            default: 'yappswidgetsmainbutton'
        },
        width: {
            type: [Number, String],
            default: 200
        },
        height: {
            type: [Number, String],
            default: 90
        },
        iconColor: {
            type: String,
            default: 'currentColor'
        }
    }
}
</script>

<style scoped>
svg {
  display: inline-block;
  vertical-align: baseline;
}
</style>