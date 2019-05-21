<template>
<div>
    <h1>Bienvenido {{nombre}}</h1>
    
</div>
</template>



<script>
export default {
    data: () => {
        return{
            nombre: ''

        }
    },
    
    mounted() {
        this.nombre = this.$store.state.User.name
    }
}
</script>

<style scoped>
    div{
        margin: 50px auto 0 auto;
    }
    h1{
        text-align: center;
        color: white;
    }
</style>
