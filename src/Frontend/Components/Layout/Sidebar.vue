<template>
 <div id="menu">
    <div id="titulo">
        <router-link to="/"><h3 style="margin-left:50px;">Dashboard</h3></router-link>
    </div>
    <div id="database-img" class="dropdown-menu"> 
        <div>
            <img src="img/database.svg" alt=""> <p>Base de datos</p>
        </div>
        <div class="drop">
            <p>Configuraciones</p>
            <a href="/categorias"><p>Categorias</p></a>
        </div>
    </div>
    <div v-show="this.$store.state.Permissions.clasificacion > 1">
        <router-link to="/clasificacion">
            <div>
                <img src="img/clasificacion.svg" alt=""> <p>Clasificación</p>
            </div>
        </router-link>
     
    </div>
    <div v-show="this.$store.state.Permissions.clasificacion > 1">
        <router-link to="/productos">
            <div>
                <img src="img/clasificacion.svg" alt=""> <p>Productos</p>
            </div>
        </router-link>
    </div>
    <div class="dropdown-menu" v-show="this.$store.state.Permissions.administrador > 1">
        <router-link to="/usuarios">
            <div>
                <img src="img/usuario.svg" alt=""> <p>Usuarios</p>
            </div>
        </router-link>
    </div>
    <div class="dropdown-menu">
        <div>
            <img src="img/reportes.svg" alt=""> <p>Reportes</p>
        </div>

        <div class="drop">
            <p>Prueba 1</p>
            <p>Prueba 2</p>
        </div>
    </div>
    <div class="dropdown-menu">
        <div>
            <img src="img/ajustes.svg" alt=""> <p>Configuraciones</p>
        </div>
        <div class="drop">
            <p>Prueba 1</p>
            <p>Prueba 2</p>
        </div>
    </div>
    <div v-show="this.$store.state.IsLogged" v-on:click="logout">
            <div>
                <img src="img/logout.svg" alt=""> <p>Cerrar Sesión</p>
            </div>
    </div>

    <div v-show="!this.$store.state.IsLogged">
        <router-link to="/login">
            <div>
                <img src="img/logout.svg" alt=""><p>Login</p>
            </div>
        </router-link>
    </div>
    <div>
        <a href="/db/default">
            <div>
                    <p>Set default</p>
            </div>
        </a> 
    </div>
    <div>
        <a href="/db/reset">
            <div>
                    <p>Reset</p>
            </div>
        </a> 
    </div>

    
</div>
</template>



<script>
import axios from 'axios'
export default {
    created(){
        
    },
    methods:{
        logout: function(){
            axios.get('/logout')
            .then(window.location.href = '/login')
            .then(this.$store.state.IsLogged = false)
            .catch((error) => console.log(error))
        }
    }
}
</script>



<style scoped>
a{
    text-decoration: none;
}

#menu img{
    width: 20px;
    height: 20px;
    margin-right: 2px;
}
#menu > div div:nth-child(1):hover{ transition: 0.5s ; transform: scale(1.1)}
#menu > div div:nth-child(1){
    transition: 0.5s;
    cursor: pointer;
    color: white;
    display: flex;
    width: 100%;
    justify-content: center;
    align-items:  center;
    margin-left:0;
}

#menu  div p{
    margin-left: 5px;
}
#titulo h3{margin:0 !important;}
#titulo{
    width: 100%; 
    display: flex; 
    justify-content: center; 
    padding: 20px 0 20px 0;
    color: white;
    }
#menu{
    align-items: flex-start;
    display:flex;
    flex-direction: column;
    min-width: 180px;
    height: auto;
    min-height: 100vh;
    
    background-color: #353942;
    background-color: #282f41;
    background-color: #4a5864;
    position: fixed;
    top: 0;
    color:white;
    width: 10%;
    max-height: 100%;
}

.drop{
    display: none;
}

.drop{
    padding-left: 10px;
}
</style>
