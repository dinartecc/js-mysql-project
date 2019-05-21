<template>
    <div id="container">
        <div id="search-container">

            <SearchBar v-on:SendSearchData="buscar"></SearchBar>

            <input type="radio" id="usuarios" name="menu" value="usuarios" v-model="Selected">
            <input type="radio" id="roles" name="menu" value="roles" v-model="Selected">

            <div id="seccion-btn">
                <label for="usuarios">
                    <div class="boton-seccion" @click="cambioSeccion">Usuarios</div>
                </label>
                <label for="roles">
                    <div class="boton-seccion" @click="cambioSeccion">Roles</div>
                </label>
                <AddBtn ></AddBtn>
            </div>
        </div>
        <div id="table-container">
            <Table class="margin-tables"
            :tabla="'marca'"
            :orden="usuariosOrden" 
            :texts="usuariosTexts"
            :body="usuarios"
            @clicked="buscar"
            v-if="Selected == 'usuarios'"
            ></Table>
        </div>
        <div id="table-container">
            <Table class="margin-tables"
            :tabla="'Roles'"
            :orden="rolesOrden" 
            :texts="rolesTexts"
            :body="roles"
            @clicked="buscar"
            v-if="Selected == 'roles'"
            ></Table>
        </div>
        <div id="add-container">

        </div>


    </div>
</template>

<script>
import AddBtn from '../Components/AddBtn.vue'
import SearchBar from '../Components/SearchBar.vue'
import Table from '../Components/Table.vue'
import axios from 'axios'
export default {
    data: () => {
        return{

            Selected: 'roles',
            usuarios: [],
            usuariosOrden : [ 'name', 'rol' ],
            usuariosTexts: {
                name: {
                    titulo: 'Usuario',
                    input: 'Nombre de marca:'
                },
                rol: {
                    titulo: 'Rol',
                    input: 'ID:'
                }
            },
            roles: [],
            rolesOrden: ['rol', 'clasificacion', 'lotes', 'productos', 'reportes', 'usuarios'],
            rolesTexts: {
                rol: {
                    titulo: 'Rol',
                    input: 'Insertar'
                },
                clasificacion: {
                    titulo: 'Clasificacion',
                    input: 'Insertar'
                },
                lotes: {
                    titulo: 'Lotes',
                    input: 'Insertar'
                },
                productos: {
                    titulo: 'Productos',
                    input: 'Insertar'
                },
                reportes: {
                    titulo: 'Clasificacion',
                    input: 'Insertar'
                },
                usuarios: {
                    titulo: 'Usuarios',
                    input: 'Insertar'
                },
                ID_rol: {
                    titulo: 'ID',
                    input: 'Insertar'
                }
            }
        }
    },
    methods: {
        buscar(){

        },
        getUsers(){
            axios.get('/getusers')
            .then((response) => {
                response = response.data;
                this.usuarios = response
            })
        },
        getRoles(){
            axios.get('/getroles')
            .then((response) => {
                console.log(response.data);
                response = response.data;
                return response
            })
            .then((response) => {
                this.roles = response
            })
        }
        ,
        cambioSeccion(){
            console.log(this.Selected)
        }
    },
    created(){
        this.getUsers()
        this.getRoles()
        console.log(this.roles)
    },
    components : {
        SearchBar,
        AddBtn,
        Table
    }

}
</script>


<style scoped>
    h1{
        color: white;
    }
    #search-container{
        display: flex;
        width: 90%;
        margin: 20px 0
    }
    #container{
        align-items: center;
        display: flex;
        flex-direction: column;
    }
    .boton-seccion{
        -webkit-user-select: none; /* Safari */        
        -moz-user-select: none; /* Firefox */
        -ms-user-select: none; /* IE10+/Edge */
        user-select: none;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #dedfe0;
                                                                                                                                                
        width: auto;
        padding-left:10px;
        padding-right: 10px;
        margin: 0 5px;
        height: 36px;
        background: #3a4560;
        border-radius: 10px;
        cursor: pointer;
    }
    #seccion-btn{
        display:flex;
    }
    input[type="radio"]{
        display: none;
    }
    #table-container{
        width: 90%
    }
    #add-container{
        width: 90%
    }
</style>
