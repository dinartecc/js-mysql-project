<template>
    <div id="container">
        <div id="titulo">
            <h2 >Productos</h2>
        </div>
        <div id="search" v-show="!editMode">
            <SearchBar v-on:SendSearchData="Buscar"></SearchBar>
            <DropSelector :titles="['Nombre', 'SKU', 'Marca', 'Subcategoria']" :values="['nombre', 'sku', 'ID_marca', 'ID_subcategoria']" v-model="tipo" ></DropSelector>
            <p @click="add">Añadir</p>
        </div>
        <ProductEditor :edit="editarInfo" :action="action" v-if="editMode" @added="added"></ProductEditor>
        <div class="table-container">
            <Table class="text-center"
            :tabla="'Productos'"
            :orden="productosOrden" 
            :texts="productosTexts"
            :body="productos.body"
            @clicked="editar"
            @page="page"
            v-if="editMode === false">
            </Table>
        </div>
    </div>

</template>



<script>
import SearchBar from '../Components/SearchBar.vue'
import axios from 'axios'
import Table from '../Components/Table.vue'
import ProductEditor from '../Components/ProductEditor.vue'
import DropSelector from '../Components/MicroComponents/DropSelector.vue'
export default {
    data: () => {
        return{
            productosTexts: {
                nombre: {
                    titulo: 'Nombre'
                },
                sku:{
                    titulo: 'SKU'
                },
                subcategoria__nombre: {
                    titulo: 'Subcategoria'
                },
                nombre: {
                    titulo: 'Nombre'
                },
                marca__nombre: {
                    titulo: 'Marca'
                }
            },
            productosOrden: ['nombre','sku', 'marca__nombre','subcategoria__nombre' ],
            productos: {},
            busqueda: '',
            tipo: '',
            productosPage: 0,
            editarInfo: {},
            editMode: false,
            action: 'editar'
        }
    }
    ,
    components: {
        ProductEditor,
        Table,
        SearchBar,
        DropSelector
    },
    methods:{
        Buscar:function(value){
            console.log(this.Selected);
            axios.post('/productos/buscar', {tabla: 'producto', busqueda: value, tipo: this.tipo })
            .then((response) => {
                this.productos = response.data
            })
        },
        added: function(cambio){
            cambio ? this.getProducts() : null
            this.editMode = false;
        },
        add: function() {
            this.action = 'anadir'
            this.editMode = true; 
        },
        editar: function(value){
            this.action = 'editar'
            this.editarInfo  = value
            this.editMode = true;
        },
        page: function(res) {
            let page = this[`productosPage`];
            switch (res.accion) {
                case 'primera':
                    this[`productosPage`] = 0;
                    break;
                case 'anterior':
                    this[`productosPage`] = (page - 1 < 0 ? 0 : page - 1 );
                    break;
                case 'siguiente':
                    this[`productosPage`] = (page + 1 > this.productos.count ? this.productos.count : page + 1 );
                    break;
                case 'ultima' :
                    this[`productosPage`] = this.productos.count;
                    break;
            }

            axios.post('/productos/buscar/', {tabla: 'producto', busqueda: this.busqueda, tipo: this.tipo})
            .then((response) => {
                this.productos = response.data;
                console.log(response)
            })
        },
        getProducts:  function(){
            const Query = {
                busqueda: this.busqueda,
                pagina: this.productosPage
            }
            axios.post('/productos/info',Query)
            .then((response) => {
                this.productos = response.data
            })
        }
    },
    created(){
        this.getProducts()
    }
}
</script>


<style scoped>
#titulo{
    margin-bottom: 30px;
    color: white;
    display: flex;
    height: 60px;
    align-items: center;
    background-color: #2E2A3D;
    background-color: #375C7D;
    background-color: #467E85;
    background-color: #1E5666;
    width: 100%;
}

#titulo h2{
    margin:0;
}
.table-container{
    width: 80%
}

#search{
    width: 80%;
    display: flex;
}

#container{
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
}

.text-center{
    text-align: center !important;
}
</style>
