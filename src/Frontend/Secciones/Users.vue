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
                <AddBtn @add="alertar" ></AddBtn>
            </div>
        </div>
        <transition name="slide-fade">
            <div id="table-container" v-if="Selected == 'usuarios'">
                <Table class="margin-tables text-center"
                :tabla="'marca'"
                :orden="usuariosOrden" 
                :texts="usuariosTexts"
                :body="usuarios"
                @clicked="buscar"
                
                ></Table>
            </div>
        </transition>    
        <transition name="slide-fade">
            <div id="table-container" v-if="Selected == 'roles'">
                <Table class="margin-tables text-center"
                :tabla="'Roles'"
                :orden="rolesOrden" 
                :texts="rolesTexts"
                :body="roles"
                @clicked="buscar"
                
                ></Table>
            </div>
        </transition>

        <transition name="slide-fade">
            <div id="add-container" v-if="Selected == 'add'">
                <TableAdd 
                :titles="AddTableTitle"
                
                :action="'add'"
                :body="AddTableTexts"></TableAdd>
            </div>
        </transition>

    </div>
</template>

<script>
import TableAdd from '../Components/TableAdd.vue'
import AddBtn from '../Components/AddBtn.vue'
import SearchBar from '../Components/SearchBar.vue'
import Table from '../Components/Table.vue'
import axios from 'axios'
export default {
    data: () => {
        return{
            AddTableTitle: ['Seccion','Ninguno', 'Leer' , 'Escribir', 'Actualizar', 'Borrar'],
            AddTableTexts: ['Clasificacion', 'Lotes', 'Productos', 'Reportes', 'Usuarios',],
            EditValues: [ 3 , 2 , 4 , 1 , 4 ],
            ShowAdd: false,
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
                    titulo: 'Reportes',
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
        alertar(){
            this.Selected = 'add';
          
        },
        buscar(){

        },
        getUsers(){
            axios.get('/getusers')
            .then((response) => {
                this.usuarios = JSON.parse(response);
                console.log(response)
            })
            .catch((error) => {
                console.log(error)
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
        Table,
        TableAdd
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
    .text-center{ text-align: center;}
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
        width: 90%;
    }




    .slide-fade-enter-active {
        transition: all .3s ease;
    }
    .slide-fade-leave-active {
        transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
    .slide-fade-enter, .slide-fade-leave-to
    /* .slide-fade-leave-active below version 2.1.8 */ {
        transform: translateX(10px);
        opacity: 0;
    }
</style>
