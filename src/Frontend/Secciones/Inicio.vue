<script>
import $ from 'jquery'
</script>



<template>
<div>
    <h1>Bienvenido {{nombre}}</h1>
    <!--button id="ola" @click="toggle('cuadro')">Clickeame</button>
    <button id="ola" @click="toggle2('cuadro')">Clickeame</button>
    <div id="contenedor">
       
        <div id="cuadro">
            <h2>Hey :D</h2>
        </div>
       
    </div>
    <h3>Hellou</h3-->
</div>
</template>



<script>
import $ from 'jquery'
import Velocity from 'velocity-animate'
import velocity from 'velocity-ui-pack'
export default {
    data: () => {
        return{
            nombre: '',
        }
    },
    methods: {
        toggle(elemento){
            Velocity($(`#${elemento}`),{ height: 0 , opacity: 0 , display: block})
        },
        toggle2(elemento){
            Velocity($(`#${elemento}`),{ height: 200 , opacity: 1, display: none })
        }
    },
    mounted() {
        this.nombre = this.$store.state.User.name
    }
}
</script>

<style scoped>
#contenedor{
    overflow: hidden;
}

.slide-enter-active, .slide-leave-active  {
  transition: all .6s ease;
}
.slide-enter, .slide-leave-to{
  transform: translateY(-100%);
  opacity: 0;
}
    #cuadro{
        background-color: red;
        width: 100%;
        height: 200px;
       
    }
    
    div{
        margin: 50px auto 0 auto;
    }
    h1{
        text-align: center;
        color: white;
    }
</style>
