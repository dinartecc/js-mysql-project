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
                v-if="Selected == 'marca' || Selected == 'todo'" >
                </Table>
            </transition>  

            <transition name="slide-fade">
                <Table class="margin-tables"
                :title="CategoriaTitle" 
                :body="categoria" 
                v-if="Selected == 'categoria' || Selected == 'todo'"
                @clicked="consola"
                ></Table>
            </transition>  
            
            <transition name="slide-fade">

                <Table class="margin-tables"
                :tabla="'categoria'"
                :orden="categoriaOrden" 
                :body="categoria"
                @clicked="consola" 
                v-if="Selected == 'categoria' || Selected == 'todo'"
                ></Table>
            </transition>

            <transition name="slide-fade">

                <Table class="margin-tables"
                :tabla="'subcategoria'"
                :orden="marcaOrden"
                :body="subcategoria" 
                @clicked="consola" 
                v-if="Selected == 'subcategoria' || Selected == 'todo'"
                ></Table>

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
            Selected : 'todo',
            MarcaTitle : ['Marca', 'ID'],
            CategoriaTitle : ['Categoria', 'ID'],
            SubcategoriaTitle: ['Subcategoria', 'Categoria', 'ID'],
            SearchData: '',
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
        consola: function(value){
            console.log(value)
        },
        actualizar:async function(){
            await axios.get('/clasificacion/info')
            .then((response) => {
                let {schema, categoria, subcategoria, marca} = response.data;
                this.marca = marca;
                this.categoria = categoria;
                this.subcategoria = subcategoria;
            })
        },
        onClickChild (value) {
            console.log(value) // someValue
        },
        Buscar:async function(value){
            let busqueda = value;
            var tipo = 'nombre';
            
            await axios.post('/clasificacion/buscar/', {tabla: this.Selected, busqueda: busqueda, tipo: tipo })
            .then((response) => {
                if(this.Selected == 'todo'){
                    const {categoria, subcategoria, marca} = response.data;
                    
                    this.marca = marca;
                    this.categoria = categoria;
                    this.subcategoria = subcategoria;



                    /*if(this.marcas.length == 0 && this.categorias.length == 0 && this.subcategorias.length == 0){
                        this.showEmptyMsg = true;
                    }else{
                        this.showEmptyMsg = false
                    }
                    */

                }else{
                    
                    console.log( response.data )
                    if(response.data.length == 0 ) this.showEmptyMsg = true;
                    this[selected] = response.data;

                    console.log( this[selected] )
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
