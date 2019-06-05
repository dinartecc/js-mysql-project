<template>
    <div id="container">
        <h3>Lotes aqui</h3>
        <div class="table-container">
                <Table class="text-center"
                :tabla="'lotes'"
                :orden="lotesOrden" 
                :texts="lotesTexts"
                :body="lotes.body"
                @clicked="editar"
                @page="page"
                v-if="editMode === false">
                </Table>
        </div>

        <div id="editor-container">
            <LotesEditor
            :edit="editarInfo" 
            :action="action" 
            v-if="editMode" 
            @added="added"
            >   
            </LotesEditor>
        </div>
    </div>
</template>


<script>
import axios from 'axios'
import Table from '../Components/Table.vue'
import LotesEditor from '../Components/LotesEditor.vue'
export default {
    data: () => {
        return{
            lotesTexts: {
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
            lotesOrden: ['nombre','sku', 'marca__nombre','subcategoria__nombre' ],
            lotes: {},
            busqueda: '',
            lotesPage: 0,
            editarInfo: {},
            editMode: true,
            action: 'anadir'
        }
    },
     components: {
        Table,
        LotesEditor
    },
    methods: {
        added: function(){

        },
        page: async function(res) {
            let page = this[`lotesPage`];
            switch (res.accion) {
                case 'primera':
                    this[`lotesPage`] = 0;
                    break;
                case 'anterior':
                    this[`lotesPage`] = (page - 1 < 0 ? 0 : page - 1 );
                    break;
                case 'siguiente':
                    this[`lotesPage`] = (page + 1 > this.lotes.count ? this.lotes.count : page + 1 );
                    break;
                case 'ultima' :
                    this[`lotesPage`] = this.lotes.count;
                    break;
            }

            await axios.post('/lotes/buscar/', {tabla: 'producto', busqueda: this.busqueda, tipo: this.tipo, pagina: this[`lotesPage`] })
            .then((response) => {
                this.lotes = response.data;
            })
        },
        editar: function(value){
            this.action = 'editar'
            this.editarInfo  = value
            this.editMode = true;
        },
        getProducts:  function(){
            const Query = {
                busqueda: this.busqueda,
                pagina: this.lotesPage
            }
            axios.post('/lotes/info',Query)
            .then((response) => {
                this.lotes = response.data
            })
        }
    }
    
        
    
}
</script>


<style scoped>

#editor-container{
    width: 100%
}
#container{
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>
