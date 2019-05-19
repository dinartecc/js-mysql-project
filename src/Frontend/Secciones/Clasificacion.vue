<template>
    <div id="container">
        <input type="radio" id="all" name="menu" value="all" v-model="Selected">
        <input type="radio" id="marca" name="menu" value="marca" v-model="Selected">
        <input type="radio" id="categoria" name="menu" value="categoria" v-model="Selected">
        <input type="radio" id="subcategoria" name="menu" value="subcategoria" v-model="Selected">

        <div id="search-container">
            <SearchBar></SearchBar>
            <div id="seccion-btn">
                <label for="all">
                    <div class="boton-seccion">Todos</div>
                </label>
                <label for="marca">
                    <div class="boton-seccion">Marca</div>
                </label>
                <label for="categoria">
                    <div class="boton-seccion">Categoria</div>
                </label>
                <label for="subcategoria">
                    <div class="boton-seccion">Subcategoria</div>
                </label>
            </div>
        </div>
        <div id="table-container">
            <transition name="slide-fade">
                <Table class="margin-tables"
                :tabla="'marca'"
                :orden="marcaOrden" 
                :body="marca"
                @clicked="consola"
                v-if="Selected == 'marca' || Selected == 'all'" ></Table>
            </transition>  
            <transition name="slide-fade">
                <Table class="margin-tables"
                :tabla="'categoria'"
                :orden="categoriaOrden" 
                :body="categoria"
                @clicked="consola" 
                v-if="Selected == 'categoria' || Selected == 'all'"></Table>
            </transition>

            <transition name="slide-fade">
                <Table class="margin-tables"
                :tabla="'subcategoria'"
                :orden="marcaOrden"
                :body="subcategoria" 
                @clicked="consola" 
                v-if="Selected == 'subcategoria' || Selected == 'all'"></Table>

            </transition>
        </div>
    </div>
    
</template>

<script>

import Table from '../Components/Table.vue';
import SearchBar  from '../Components/SearchBar.vue';
import 'babel-polyfill';

export default {
    
    data: () => {
        return{
            Selected : 'all',
            VShow: 'all',  
            categoria: [],
            subcategoria: [],
            marca: [],
            marcaOrden : [
                {
                    titulo: 'Marca',
                    campo: 'nombre'
                },
                {
                    titulo: 'ID',
                    campo: 'id'
                }
            ],
            categoriaOrden: [
                {
                    titulo: 'Categoria',
                    campo: 'nombre'
                },
                {
                    titulo: 'ID',
                    campo: 'id'
                }
            ],
            subcategoriaOrden: [
                {
                    titulo: 'Subcategoria',
                    campo: 'nombre'
                },
                {
                    titulo: 'Categoria',
                    campo: 'categoria_nombre'
                },
                {
                    titulo: 'ID',
                    campo: 'id'
                }
            ],
        }
    },
    components: {
        Table,
        SearchBar
    },
    created(){
        this.actualizar()
    },
    methods: {
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
        consola (e) {
            console.log (e)
        }
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
