<template>
    <div id="container">
        <div id="titulo">

        </div>
        <h2 @click="add">Añadir</h2>
        <ProductEditor :edit="editarInfo" :action="action" v-if="editMode"></ProductEditor>
        <div class="table-container">

            <Table class="text-center"
            :tabla="'categoria'"
            :orden="productosOrden" 
            :texts="productosTexts"
            :body="productos"
            @clicked="editar"
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
                margen_ganancia: {
                    titulo: 'Margen de ganancia'
                }
            },
            productosOrden: ['nombre','sku', 'subcategoria__nombre', 'margen_ganancia'],
            productos: [],
            busqueda: '',
            paginaProductos: 1,
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
        add: function() {
            this.action = 'anadir'
            this.editMode = true; 
        },
        editar: function(value){
            this.editarInfo  = value
            this.editMode = true
        },
        getProducts:  function(){
            const Query = {
                busqueda: this.busqueda,
                pagina: this.paginaProductos
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
