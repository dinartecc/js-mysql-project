<template>
    <div class="input-menu">
        <h1>{{ boolDefault ? 'Editar elemento ' + formatearTitulo : 'Agregar elemento a ' + formatearTitulo }}</h1>
        <form class="input-form">
            <label v-if="boolDefault">ID:<input v-model="valores.id" type="text" disabled /></label>
            <div v-for="llave of schemaLlaves" :key="llave">
                <label>{{texts[llave].input}}
                    <input v-if="schema[llave].tipo == 'int'" @blur="validarInt(llave)" :class="{'error': errores[llave] != '' }" type='text' v-model="valores[llave]" minlength="1" :maxlength="schema[llave].longitud" />
                    <input v-else-if="schema[llave].tipo == 'moneda'" @blur="validarMoneda(llave)" :class="{'error': errores[llave] != '' }" type='text' v-model="valores[llave]" minlength="1" :maxlength="schema[llave].longitud" />
                    <input v-else-if="schema[llave].tipo == 'date'"  :class="{'error': errores[llave] != '' }" type='text' v-model="valores[llave]" minlength="1" :maxlength="schema[llave].longitud" />
                    <input v-else-if="schema[llave].tipo == 'varchar'"  :class="{'error': errores[llave] != '' }" type='text' v-model="valores[llave]" minlength="1" :maxlength="schema[llave].longitud" />
                    <input v-else-if="schema[llave].tipo == 'boolean'"  :class="{'error': errores[llave] != '' }" type='checkbox' v-model="valores[llave]" />
                </label>
                <span :key="errores[llave]" :class="{ 'hide' : errores[llave] == '', 'error' : errores[llave] != '' }">{{errores[llave]}}</span>
            </div>
            <button @click="confirmar">Submit</button>
        </form>
        
    </div>
</template>



<script>

import Swal from 'sweetalert2';
import axios from 'axios'

export default {
    props: {
        schema: Object,
        default: Object,
        texts: Object,
        seccion: String,
    },
    data: () => {
        return{
            Schema: {},
            valores: {},
            errores: {},
            boolDefault : false
        }
    },
    methods: {
        obtenerLlaves () {
             return this.schemaLlaves;
        },
        confirmar(e) {
            e.preventDefault();
            let errors = false;
            for( const item in this.errores ) {
                
                if( this.errores[item].length ) errors = true;
            }

            const req = Object.assign({}, this.valores );
                        req.tabla= this.default.tabla;
            const url = this.boolDefault ? `${this.seccion}/editar` : `${this.seccion}/nuevo`;
            
            if (errors) {
                Swal.fire({
                    type: 'error',
                    title: 'Error!',
                    text: '¡Hay campos con valores no válidos!'
                })
            } 
            else {
                Swal.fire({
                    title: '¿Está seguro?',
                    text: "¿Desea ingresar los datos?",
                    type: 'question',
                    showCancelButton: true,
                    confirmButtonText: 'Confirmar',
                    cancelButtonText: 'Cancelar',
                    reverseButtons: true,
                    showLoaderOnConfirm: true,
                    preConfirm: () => {
                        return axios({
                                method: 'post',
                                url: url,
                                headers: {}, 
                                data: {
                                    query: req, 
                                }
                            })
                        .then(response => {
                            console.log(response);
                            if (response.status != 200) {
                            throw new Error('Error');
                            }
                            return response.json()
                        })
                        .catch(error => {
                             Swal.fire({
                                type: 'error',
                                title: '¡Error!',
                                text: 'Ocurrió un error con el servidor. Inténtelo más tarde. '
                            });
                        });  
                    },
                    allowOutsideClick: () => !Swal.isLoading()
                }).then((result) => {
                    if (result.value) {
                        Swal.fire(
                        '¡Éxito!',
                        `Se ${ this.boolDefault ? 'editó' : 'añadió'} exitosamente.`,
                        'success'
                        )
                    }
                })
                
            }
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
            return this.default.tabla.toLowerCase()
            .split('_')
            .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
            .join(' ');
        
        },
        schemaLlaves() {

            const llaves = Object.keys( this.schema );

            return llaves.filter( llave => llave !=='id' && llave !== this.schema.id );
        },

    },
    created() {
        const llaves = this.obtenerLlaves();
        this.boolDefault = this.default.hasOwnProperty('elemento');
        console.log(this.default.elemento);

        for( let llave of llaves ) {
            this.boolDefault ? this.valores[llave] = this.default.elemento[llave] : this.valores[llave] = '';
            this.errores[llave] = '';
        }
        this.valores.id = this.default.elemento.id; 
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

input.error {
    border-color: red;
}

span.error {
    color: red;
}

div{
    width: 100%;
}
</style>

