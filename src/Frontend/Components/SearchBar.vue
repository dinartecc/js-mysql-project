<template>
    <input type="text" id="busqueda-dinamica" v-on:keyup.enter="1+1" class="bg-dark border-color" placeholder="Buscar...">
</template>



<script>
export default {
    
}
</script>



<style scoped>

input{
    width: 100%;
    max-height:30px;;
    border: 2px solid #555861;
    background-color: #232730;
    border-radius: 30px;
    padding-left: 20px;
}
input::placeholder{
    color: #4b5976;
    color: #66789e;
   
}

</style>

