<template>
    <div>
        <SearchBar @SendSearchData="Buscar" />
        <Table class="margin-tables"
                :tabla="tabla"
                :orden="orden"
                :texts="texts"
                :body="body" 
                @clicked="enviar" 
                />
        <input type="button" value="Regresar" />
    </div>
</template>



<script>
import axios from 'axios';
import SearchBar  from './SearchBar.vue';
import Table from './Table.vue';
export default {
    data: () => {
        return{
            body: []
        }
    },
    props: { 
        tabla: String,
        seccion: String,
        orden: {
            type: Array,
            default: () => ['nombre','id']
        },
        texts: {
            type: Object,
            default: () => { return {
                id: {
                    titulo: 'ID',
                },
                nombre: {
                    titulo: 'Nombre',
                }}
            }
        }
    },
    components: {
        SearchBar,
        Table,
    },
    methods: {
        Buscar:async function(value){
            let busqueda = value == undefined ? '': value ;
            var tipo = 'nombre';
           
            
            await axios.post(`/${this.seccion}/buscar/`, {tabla: this.tabla, busqueda: busqueda, tipo: tipo })
            .then((response) => {
                 console.log(value,response);
                this.body = response.data;
            })
        },
        enviar( contenido ) {
            let res = -1;
            if ( typeof contenido == 'object' ) {
                res = contenido.elemento.id;
            }
            
            console.log(res);
            // this.$emit('SendForeign', res )
        }
    },
    created(){
        this.Buscar();
    },
    computed: {
        formatearTitulo () {
            return this.tabla.toLowerCase()
            .split('_')
            .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
            .join(' ');
        }
    }
}

</script>

<style scoped>

table{
    -webkit-box-shadow: 10px 14px 63px -49px rgba(0,0,0,0.75);
    -moz-box-shadow: 10px 14px 63px -49px rgba(0,0,0,0.75);
    box-shadow: 10px 14px 63px -49px rgba(0,0,0,0.75);
    border-collapse: collapse;
    width: 100%;
}
table td, table th {
    height: 30px;
    padding: 8px;
}
table th{
    background-color: #4b5976;
    color:#dedfe0;
}
table td{
    background-color: #2a3141;
    color:#dedfe0;
    font-weight: 300 !important;
    border-left: 0;
    border-right: 0;
    cursor: pointer;
    
}

table tbody tr:hover td{ background-color: #323b4e ; transition: .2s}
table tbody tr td{transition: .5s}
div{
    width: 100%;
    display: flex;
    justify-content: center;
}
</style>
