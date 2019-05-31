<template>
    <div id="container">
        <input type="radio" id="all" name="menu" value="todo" v-model="Selected">
        <input type="radio" id="marca" name="menu" value="marca" v-model="Selected">
        <input type="radio" id="categoria" name="menu" value="categoria" v-model="Selected">
        <input type="radio" id="subcategoria" name="menu" value="subcategoria" v-model="Selected">

        <div id="search-container">

            <SearchBar v-on:SendSearchData="Buscar"></SearchBar>

            <div id="seccion-btn">
                <label for="all">
                    <div class="boton-seccion" @click="cambioSeccion">Todos</div>
                </label>
                <label for="marca">
                    <div class="boton-seccion" @click="cambioSeccion">Marca</div>
                </label>
                <label for="categoria">
                    <div class="boton-seccion" @click="cambioSeccion">Categoria</div>
                </label>
                <label for="subcategoria">
                    <div class="boton-seccion" @click="cambioSeccion">Subcategoria</div>
                </label>
                <AddBtn @add="add" :seleccion="Selected"></AddBtn>
            </div>
        </div>
        <div id="table-container">
            <!-- Este se encarga de input editar. Le manda la seccion, el schema y texts (texts son las cosas de
                titulo y el label de los inputs), los valores default, y en este caso porque es editar tenes quInputDatae poner
                boolDefault como true. El text y el schema los agarra segun el objeto InputData de la data. InputData
                tiene .tabla para la tabla y .elemento que es el elemento del editar. Eso lo manda la tabla.
              -->
            <transition name="slide-fade">
                <Inputs v-if="Selected == 'anadirmarca' || Selected == 'anadircategoria' || Selected == 'anadirsubcategoria'" 
                :seccion="'clasificacion'" 
                :texts="this[`${InputData.tabla}Texts`]" 
                :schema="schema[InputData.tabla]" 
                :default="InputData" 
                :boolDefault="false"
                @added="added(false)" />
            </transition>
            <!-- Este se encarga de input editar. Le manda la seccion, el schema y texts (texts son las cosas de
                titulo y el label de los inputs), los valores default, y en este caso porque es editar tenes que poner
                boolDefault como true. El text y el schema los agarra segun el objeto InputData de la data. InputData
                tiene .tabla para la tabla y .elemento que es el elemento del editar. Eso lo manda la tabla.
              -->
            <transition name="slide-fade">
                <Inputs v-if="Selected == 'editar'" 
                :seccion="'clasificacion'" 
                :texts="this[`${InputData.tabla}Texts`]" 
                :schema="schema[InputData.tabla]" 
                :default="InputData" 
                :boolDefault="true"
                @added="added(true)" />
            </transition>


            <EmptyMsg v-show="Show"></EmptyMsg>
            <div id="wrapper">
                <transition name="slide-fade">
                    <Table class="margin-tables"
                    :tabla="'marca'"
                    :orden="marcaOrden" 
                    :texts="marcaTexts"
                    :body="marca"
                    @clicked="editar"
                    v-if="(Selected == 'marca' || Selected == 'todo') || (Selected == 'anadirmarca' )"
                    ></Table>
                </transition>  
            </div>


            
            <transition name="slide-fade">

                <Table class="margin-tables"
                :tabla="'categoria'"
                :orden="categoriaOrden" 
                :texts="categoriaTexts"
                :body="categoria"
                @clicked="editar" 
                v-if="( Selected == 'categoria' || Selected == 'todo' ) || (Selected == 'anadircategoria' )"
                id="oli"
                ></Table>
            </transition>

            <transition name="slide-fade">
                
                <Table class="margin-tables"
                :tabla="'subcategoria'"
                :orden="subcategoriaOrden"
                :texts="subcategoriaTexts"
                :body="subcategoria" 
                @clicked="editar" 
                v-if="(Selected == 'subcategoria' || Selected == 'todo') || (Selected == 'anadirsubcategoria')"
                ></Table>

            </transition>

            

        </div>

    </div>
    
</template>

<script>
import 'babel-polyfill';
import axios from 'axios';
import Table from '../Components/Table.vue';
import SearchBar  from '../Components/SearchBar.vue';
import EmptyMsg from '../Components/EmptyMsg.vue'
import Inputs from '../Components/Inputs.vue';
import AddBtn from '../Components/AddBtn.vue';


export default {
    
    data: () => {
        return{
            Show: false,
            Selected : 'todo',
            //InputData. Esto va a tener un .tabla de la tabla que se va a usar y un .elemento que va a ser para los valores predeterminados
            InputData: {},
            SearchData: '',
            categoria: [],
            subcategoria: [],
            marca: [],
            schema: {},
            //En los texts se pone titulo de la tabla y el label de los inputs
            marcaTexts: {
                nombre: {
                    titulo: 'Marca',
                    input: 'Nombre de marca:'
                },
                id: {
                    titulo: 'ID',
                    input: 'ID:'
                }
            },
            categoriaTexts: {
                nombre: {
                    titulo: 'Categoría',
                    input: 'Nombre de categoría:'
                },
                id: {
                    titulo: 'ID',
                    input: 'ID:'
                },
            },
            subcategoriaTexts: {
                ID_categoria: {
                    input: 'ID de categoría padre:'
                },
                categoria__nombre: {
                    titulo: 'Categoría'
                },
                nombre: {
                    titulo : 'Subcategoría',
                    input: 'Nombre de subcategoría:'
                },
                id: {
                    titulo: 'ID',
                    input: 'ID:'
                },
            },
            marcaOrden : [ 'nombre', 'id' ],
            categoriaOrden: [ 'nombre', 'id' ],
            subcategoriaOrden: [ 'nombre', 'categoria__nombre', 'id' ],
        }
    },
    components: {
        Table,
        SearchBar,
        EmptyMsg,
        Inputs,
        AddBtn
    },
    created(){
        this.actualizar()
    },
    methods: {
        //En el add, si esta selected una seccion, esa seccion se vuelve la tabla del inputData.
        add: function(value) {
            if (this.Selected !== 'todo' && this.Selected !== 'anadir' && this.Selected !== 'editar' ) {
                this.InputData.tabla = this.Selected;
                this.InputData.elemento = undefined;
                this.Selected = `anadir${this.Selected}`;

            }
        },
        added: function(todo) {
            todo ? this.Selected = 'todo' : null;
            
            this.actualizar();
        },
        cambioSeccion: function(){
            this.Show = false;
            this.actualizar()
        },
        editar: function(value){
            this.InputData = value;
            this.Selected = 'editar';
        },
        actualizar:async function(){
            await axios.get('/clasificacion/info')
            .then((response) => {
                let {schema, categoria, subcategoria, marca} = response.data;
                this.marca = marca;
                this.categoria = categoria;
                this.subcategoria = subcategoria;
                this.schema = schema;
            })
        },
        Buscar:async function(value){
            let busqueda = value;
            var tipo = 'nombre';
            
            await axios.post('/clasificacion/buscar/', {tabla: this.Selected, busqueda: busqueda, tipo: tipo })
            .then((response) => {
                if(this.Selected == 'todo'){
                    const {categoria, subcategoria, marca} = response.data;
                    categoria.length == 0 && subcategoria.length == 0 && marca.length == 0 ? this.Show = true : this.Show = false;
                    this.marca = marca;
                    this.categoria = categoria;
                    this.subcategoria = subcategoria;
                }else{

                    response.data.length == 0 ? this.Show = true : this.Show = false;
                    this[this.Selected] = response.data

                }
            })
        },
    }
}
</script>

<style scoped>

    Table{
        margin-bottom: 25px !important;
    }


    #container{
        align-items: center;
        display: flex;
        flex-direction: column;
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
    #search-container{
        display: flex;
        width: 90%;
        margin: 20px 0
    }
    #seccion-btn{
        display:flex;
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
    input[type="radio"]{
        display: none;
    }
    *{color: white}
    #table-container{
        width: 90%
    }
    .margin-tables{margin-bottom: 30px;}
</style>
