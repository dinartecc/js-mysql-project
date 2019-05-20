<template>
    <div class="input-menu">
        <h1>Agregar a {{formatearTitulo}}</h1>
        <form class="input-form">
            <div v-for="llave of schemaLlaves" :key="llave">
                <input v-if="schema[llave].tipo == 'int'" @blur="validarInt(llave)" type='text' v-model="valores[llave]" minlength="1" :maxlength="schema[llave].longitud" />
                <input v-else-if="schema[llave].tipo == 'varchar'" @blur="validarMoneda(llave)" type='text' v-model="valores[llave]" minlength="1" :maxlength="schema[llave].longitud" />
                <input v-else-if="schema[llave].tipo == 'date'"  type='text' v-model="valores[llave]" minlength="1" :maxlength="schema[llave].longitud" />
                <input v-else-if="schema[llave].tipo == 'moneda'"  type='text' v-model="valores[llave]" minlength="1" :maxlength="schema[llave].longitud" />
                <input v-else-if="schema[llave].tipo == 'int'"  type='text' v-model="valores[llave]" minlength="1" :maxlength="schema[llave].longitud" />
                <span :key="errores[llave]" :class="{ 'error' : errores[llave] == '', 'error activo' : errores[llave] != '' }" @click="consola">{{errores[llave]}}</span>
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
            Schema: {},
            valores: {},
            errores: {}
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
            console.log(e);
        },
        obtenerLlaves () {
             return this.schemaLlaves;
        },
        validarInt(llave) {
            const val = this.valores[llave];
            if( isNaN(val) ) {
                
                this.errores[llave] = 'No es un número válido ';
                this.$forceUpdate();
            }
            else if ( val < 0 ) {
                this.errores[llave] = 'No puede ser negativo';
                this.$forceUpdate();
            }
            else {
                const string = val.toString(),
                    regExp = new RegExp(`^\\d*$`);
            
            
                if ( !string.match(regExp) ){
                    this.errores[llave] = 'No es un entero';
                    this.$forceUpdate();
                }
                else {
                    this.errores[llave] = '';
                    this.$forceUpdate();
                }
            }
        },
        validarMoneda(llave) {
            const val = this.valores[llave];

            if( isNaN(val) ) {
                this.errores[llave] = 'No es un número valido ';
                this.$forceUpdate();
            }
            else if ( val < 0 ) {
                this.errores[llave] = 'No puede ser negativo';
                this.$forceUpdate();
            }
            else {
                const string = val.toString(),
                    regExp = new RegExp(`^\\d*(\\.\\d{1,2})?$`);
            
            
                if ( !string.match(regExp) ){
                    this.errores[llave] =  `No es un monto válido, 2 decimales máx.`;
                    this.$forceUpdate();

                }
                else {
                    this.errores[llave] = '';
                    this.$forceUpdate();
                }
            }
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

    },
    created() {
        const llaves = this.obtenerLlaves();
        for( let llave of llaves ) {
            console.log(llave);
            this.valores[llave] = '';
            this.errores[llave] = '';
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

.error.activo {
    color: red;
}

div{
    width: 100%;
}
</style>

