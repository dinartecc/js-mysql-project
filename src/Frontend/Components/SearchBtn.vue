<template>
        <img id="add" v-on:click="click" src="/img/buscar.svg" >
</template>


<style>
    img{
        width: 40px;
        height: 40px;
        cursor: pointer;
        margin-left: 15px;
        fill: white;
    }
</style>



<script>
export default {
    methods: {
        click: function(event) {
            this.$emit('search')
        }
    }
}
</script>

