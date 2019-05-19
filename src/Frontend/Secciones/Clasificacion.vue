<template>
    <div>
        <h1>CLASIFICACION</h1>
        <Table :tabla="'marca'" :orden="marcaOrden" :body="marca" @clickeado="consola"></Table>
        <Table :tabla="'categoria'" :orden="categoriaOrden" :body="categoria" @clickeado="consola"></Table>
        <Table :tabla="'subcategoria'" :orden="subcategoriaOrden" :body="subcategoria" @clickeado="consola"></Table>
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
            console.log (this.marcaOrden)
        }
    }
}
</script>
