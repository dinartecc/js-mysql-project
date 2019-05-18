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
    <div>
        <router-link to="/clasificacion">
            <div>
                <img src="img/clasificacion.svg" alt=""> <p>Clasificación</p>
            </div>
        </router-link>
     
    </div>
    <div class="dropdown-menu">
        <a href="/clientes">
            <div>
                <img src="img/usuario.svg" alt=""> <p>Clientes</p>
            </div>
        </a>
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
    <div>
        <a href="/logout">
            <div>
                <img src="img/logout.svg" alt=""> <p>Cerrar Sesión</p>
            </div>
        </a> 
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
export default {
    
}
</script>



<style scoped>
a{
    text-decoration: none;
}

#menu{
    color:white;
    width: 100%
}
#menu img{
    width: 20px;
    height: 20px;
    margin-right: 2px;
}
#menu>div div:nth-child(1){
    cursor: pointer;
    color: white;
    display: flex;
    width: 100%;
    justify-content: center;
    align-items:  center;
    margin-left: 5px;
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

    height: auto;
    min-height: 100vh;
    
    background-color: #353942;
    background-color: #282f41;
    background-color: #4a5864;
}

.drop{
    display: none;
}

.drop{
    padding-left: 10px;
}
</style>
