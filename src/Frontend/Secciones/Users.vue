<template>
    <div id="container">
        <div id="search-container">

            <SearchBar v-on:SendSearchData="buscar"></SearchBar>

            <input type="radio" id="usuarios" name="menu" value="usuarios" @click="cambioSeccion" v-model="Selected" checked>
            <input type="radio" id="roles" name="menu" value="roles" @click="cambioSeccion" v-model="Selected">

            <div id="seccion-btn">
                <label for="usuarios">
                    <div class="boton-seccion" @click="cambioSeccion" v-bind:class="{btnactive: Selected == 'usuarios'}">Usuarios</div>
                </label>
                <label for="roles">
                    <div class="boton-seccion" @click="cambioSeccion" v-bind:class="{btnactive: Selected == 'roles'}">Roles</div>
                </label>
                <AddBtn v-if="this.$store.state.Permissions.usuarios > 2" @add="add" :class="[{blocked: Selected !== 'roles' && Selected !== 'usuarios'}]" ></AddBtn>
            </div>
        </div>
        <transition name="slide-fade">
            <div id="table-container" v-if="Selected == 'usuarios'">
                <Table class="margin-tables text-center"
                :tabla="'Usuarios'"
                :orden="usuariosOrden" 
                :texts="usuariosTexts"
                :body="usuarios"
                
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
                @clicked="editRoles"
                ></Table>
            </div>
        </transition>
        
        <transition name="slide-fade">
            <div id="add-container" v-if="Selected == 'addRoles' || Selected == 'editRoles'">
                <TableAdd 
                :titles="AddTableTitle"
                :action="actionRoles"
                :body="AddTableTexts"
                :defaultValues="EditValues"
                :editInfo="EditRolesInfo"
                @finish="RolesEnd"
                >
                </TableAdd>
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
            AddTableTexts: ['Clasificacion', 'Lotes', 'Productos', 'Reportes', 'Usuarios'],
            EditRolesInfo: [], 
            actionRoles: 'add',
            EditValues: {},
            ShowAdd: false,
            Selected: 'roles',
            usuarios: [],
            usuariosOrden : [ 'name', 'roles__rol' ],
            usuariosTexts: {
                name: {
                    titulo: 'Usuario',
                    input: 'Nombre de marca:'
                },
                roles__rol: {
                    titulo: 'Rol',
                    input: 'ID:'
                }
            },
            roles: [],
            rolesOrden: ['id','rol', 'clasificacion', 'lotes', 'productos', 'reportes', 'usuarios'],
            rolesTexts: {
                id: {
                    titulo: 'ID'
                },
                rol: {
                    titulo: 'Rol',
                   
                },
                clasificacion: {
                    titulo: 'Clasificacion',
                    
                },
                lotes: {
                    titulo: 'Lotes',
                    
                },
                productos: {
                    titulo: 'Productos',
                    
                },
                reportes: {
                    titulo: 'Reportes',
                    
                },
                usuarios: {
                    titulo: 'Usuarios',
                  
                },
                ID_rol: {
                    titulo: 'ID',
                }
            }
        }
    },
    methods: {
        RolesEnd: function(changes){
            if(changes){
                this.getRoles()
            }
            this.Selected = 'roles'
        },
        cambioSeccion(){
            this.actionRoles = 'add'
            this.getRoles()
        },
        buscar: function(){

        },
        add: function(){
            switch (this.Selected) {
                case 'addRoles':
                    return null;
                    break;
                case 'roles':
                    this.actionRoles = 'add'
                    this.Selected = 'addRoles'
                    break;
                    
                default:
                    
                    break;
            }
        }, 
        editRoles: function(value){
            this.EditValues = value;
            this.actionRoles = 'edit'
            this.Selected = 'editRoles'
        },
        getUsers(){
            axios.get('/getusers')
            .then((response) => {
                this.usuarios = JSON.parse(response.data);
                //console.log(JSON.parse(response.data))
            })
            .catch((error) => {
                console.log(error)
            })
        },
        getRoles(){
            axios.get('/getroles')
            .then((response) => {
                response = response.data;
                return response
            })
            .then((response) => {
                this.roles = response
            })
        }
        
    },
    created(){
        this.getUsers()
        this.getRoles()
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
    
    .blocked{
        cursor:not-allowed
    }


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


    .btnactive{
        background: #6a7cab;
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
