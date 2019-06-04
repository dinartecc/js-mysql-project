<template>
    <div id="container">
        <div id="titulo">

            <h2 @click="add">Añadir</h2>
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
import axios from 'axios'
import Table from '../Components/Table.vue'
import ProductEditor from '../Components/ProductEditor.vue'

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
            productosPage: 0,
            editarInfo: {},
            editMode: false,
            action: 'editar'
        }
    }
    ,
    components: {
        ProductEditor,
        Table
    },
    methods:{
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
        page: async function(res) {
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

            await axios.post('/productos/buscar/', {tabla: 'producto', busqueda: this.busqueda, tipo: this.tipo, pagina: this[`productosPage`] })
            .then((response) => {
                this.productos = response.data;
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
    background-color: ;
    width: 100%;
}
.table-container{
    width: 80%
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
