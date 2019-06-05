<template>
    <div id="container">
        <h3>almacen aqui</h3>
        <h2 @click="add">CLICK PARA AÑADIR</h2>
        <div class="table-container">
                <Inputs v-if="editMode"
                :seccion="'clasificacion'"
                :texts="almacenTexts" 
                :schema="almacenSchema" 
                :default="editarInfo" 
                :boolDefault="true"
                @added="added" 
                />
                <Inputs v-if="addMode"
                :seccion="'clasificacion'"
                :texts="almacenTexts" 
                :schema="almacenSchema" 
                :default="editarInfo" 
                :boolDefault="false"
                @added="added" 
                />
                <Table class="text-center"
                :tabla="'almacen'"
                :orden="almacenOrden" 
                :texts="almacenTexts"
                :body="almacen.body"
                @clicked="editar"
                :pagina="false"
                >
                </Table>
        </div>
    </div>
</template>


<script>
import axios from 'axios'
import Table from '../Components/Table.vue'
import Inputs from '../Components/Inputs.vue'
export default {
    data: () => {
        return{
            almacenTexts: {
                nombre: {
                    titulo: 'Nombre',
                    input: 'Nombre'
                },
                id: {
                    titulo: 'ID',
                    input: 'ID'
                },
                ID_almacen : {
                    input: 'ID'
                }
            },
            almacenOrden: ['nombre','id'],
            almacenSchema: {},
            almacen: {},
            almacenPage: 0,
            editMode: false,
            editMode: false,
            editarInfo: {}
        }
    },
     components: {
        Table,
        Inputs
    },
    methods: {
        add: function(){
            this.editMode = false;
            this.addMode = true; 
        },
        added: function(value){
            console.log(value)
        },
        editar: function(value){
            this.editMode = true;
            this.editarInfo  = value
            this.editMode = true;
        },
        getAlmacen:  function(){
            axios.get('/almacen/info')
            .then((response) => {
                console.log(response)
                this.almacen = response.data.almacen
                this.almacenSchema = response.data.schema.almacen
            
            })
        },
        getSchema: function(){

        }
    },
    created(){
        this.editarInfo.tabla = 'almacen'
        this.editarInfo.elemento = undefined;
        this.getAlmacen()
    }
    
        
    
}
</script>


<style scoped>

</style>
