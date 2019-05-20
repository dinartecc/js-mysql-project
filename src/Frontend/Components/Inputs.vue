<template>
    <div class="input-menu">
        <h1>Agregar a {{formatearTitulo}}</h1>
        <form class="input-form">
            <div v-for="llave of schemaLlaves" :key="llave">
                <Entero v-if="schema[llave].tipo == 'int'" :default="''" :longitud="schema[llave].longitud" />
                <Varchar v-else-if="schema[llave].tipo == 'varchar'" :default="''" :longitud="schema[llave].longitud" />
            </div>
            <input type="submit" @click="consola">
        </form>
        
    </div>
</template>



<script>
import Date from './InputTypes/Date.vue';
import Entero from './InputTypes/Entero.vue';
import Moneda from './InputTypes/Moneda.vue';
import Varchar from './InputTypes/Varchar.vue';
export default {
    props: {
        schema: Object,
        tabla: String,
        default: Object
    },
    data: () => {
        return{
            Schema: {}
        }
    },
    components: {
        Date,
        Entero,
        Moneda,
        Varchar
    },
    methods: {
        consola(e) {
            e.preventDefault();
            console.log('owo');
        }
    },
    computed: {
        formatearTitulo () {
            return this.tabla.toLowerCase()
            .split('_')
            .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
            .join(' ');
        
        },
        schemaLlaves() {
            console.log(this.schema);
            const llaves = Object.keys( this.schema );

            return llaves.filter( llave => llave !=='id' && llave !== this.schema.id );
        },

    }
}

</script>


<style scoped>
table{
    -webkit-box-shadow: 10px 14px 63px -49px rgba(0,0,0,0.75);
    -moz-box-shadow: 10px 14px 63px -49px rgba(0,0,0,0.75);
    box-shadow: 10px 14px 63px -49px rgba(0,0,0,0.75);
    border-collapse: collapse;
    width: 90%;
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
    
}

div{
    width: 100%;
    display: flex;
    justify-content: center;
}
</style>

