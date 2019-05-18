<template>
    <div>
        <h1>CLASIFICACION</h1>
        <Table :title="['Marca', 'ID']" :body="marca"></Table>
        <Table :title="['Categoria', 'ID']" :body="categoria"></Table>
        <Table :title="['Subcategoria', 'Categoria', 'ID']" :body="subcategoria"></Table>
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
                let {categoria, subcategoria, marca} = response.data;
                this.marca = marca;
                this.categoria = categoria;
                this.subcategoria = subcategoria;
               
                
            })
        }
    }
}
</script>
