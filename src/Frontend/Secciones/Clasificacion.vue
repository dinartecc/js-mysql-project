<template>
    <div>
        <h1>CLASIFICACION</h1>
        <Table :tabla="'marca'" :title="['Marca', 'ID']" :body="marca" @clickeado="consola"></Table>
        <Table :tabla="'categoria'" :title="['Categoria', 'ID']" :body="categoria" @clickeado="consola"></Table>
        <Table :tabla="'subcategoria'" :title="['Subcategoria', 'Categoria', 'ID']" :body="subcategoria" @clickeado="consola"></Table>
    </div>
    
</template>

<script>

import Table from '../Components/Table.vue'
import 'babel-polyfill';
export default {
    
    data: () => {
        return{
            categoria: [],
            subcategoria: [],
            marca: []
        }
    },
    components: {
        Table
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
