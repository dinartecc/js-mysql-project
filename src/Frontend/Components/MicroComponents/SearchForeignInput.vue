
<template>
    <div>
        <input class="input-default" :class="{'error': this.error  }" type='text' v-model="displayValue" />
        <SearchBtn id="busqueda"  @search="forStart" />
        <div class="overlay" v-show="forshow">
            <div class="box" >
                <SearchBar @SendSearchData="Buscar" />
                <Table class="margin-tables"
                        :tabla="tabla"
                        :orden="orden"
                        :texts="texts"
                        :body="body" 
                        @clicked="enviar" 
                        />
                        
                <input type="button" class="btn red" value="Regresar" @click="enviar"/>
            </div>
        </div>
    </div>
</template>


<script>
/*
    <search-foreign-input 
    v-model="xd" el v-model
    buscarPor="id" el campo que va usarse para la busqueda
    identificador="nombre" el id de la tabla
    tabla="subcategoria"  nombre de la tabla
    seccion="clasificacion"  la secccion de donde va a salir la tabla
    :orden="subcategoriaOrden" el orden de los campos
    :texts="subcategoriaTexts" los textos de la tabla
    />

*/


import axios from 'axios';
import SearchBar  from '../SearchBar.vue';
import Table from '../Table.vue';
import SearchBtn from '../SearchBtn.vue';

export default {
    props: {
        value: String,
        tabla: String,
        buscarPor: {
            type: String,
            default: 'nombre'
        },
        identificador: {
            type: String,
            default: 'id'
        },
        seccion: String,
        tipo: String,
        orden: {
            type: Array,
            default: () => { return ['id','nombre'];}
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
    
    data: function() {
        return {
            isInputActive: false,
            error: false,
            forshow: false,
            body: []
        }
    },
    components: {
        SearchBar,
        Table,
        SearchBtn
    },
    methods: {
        Buscar:async function(value){
            
            let busqueda = value == undefined ? '': value ;

            
            await axios.post(`/${this.seccion}/buscar/`, {tabla: this.tabla, busqueda: busqueda, tipo: this.buscarPor })
            .then((response) => {
                
                this.body = response.data;
            })
        },
        enviar( contenido ) {

            this.forshow = false;
            
            if ( contenido.hasOwnProperty('elemento') ) {
                let res = contenido.elemento[this.identificador];
                if (typeof res == 'number') {
                    res = res.toString();
                }
                this.$emit('input', res );
            }

        },
        forStart () {
            this.forshow = true;
        }
    },
    created(){
        this.Buscar();
    },
    computed: {
        displayValue: {
            get: function() {
                if( this.tipo == 'entero' && isNaN(this.value)) {
                    this.error = true;
                
                }
                else {
                    this.error = false;
                }
                return this.value;
                
            },
            set: function(modifiedValue) {
                // Recalculate value after ignoring "$" and "," in user input
                if( this.tipo == 'entero' &&  isNaN(this.value)) {
                    this.error = true;
                
                }
                else {
                    this.error = false;
                }

                
                this.$emit('input', modifiedValue)
            }
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

div .box{
    /*border: 1px solid #555861;*/
    width: 500px;
    display: flex;
    position: relative;
    top: -100px;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background-color: #232730;
    background-color: #222831;
    padding: 15px 30px;
    border-radius: 10px;
    height: auto;
    color: white !important;
}
div .box > * {
    margin: 10px 0;
}
div .overlay {
    position: absolute;
    display: flex;
    justify-content: center;
    width: 100%;
    height: 100%;
    align-items: center;
    background-color: rgba(0,0,0,0.8);
    top: 0; 
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 2;
}



.btn{
    background-color: #6a7cab !important;
    color: white;
    margin: 15px 10px;
    padding: 8px 20px;
    border: 0;
    outline: 0;
    border-radius: 10px;
}
.red{
    background-color: #e66f66 !important;
}
.input-default{
    box-sizing: border-box;
    border: 2px solid #747885;
    width: 100%;
    outline: 0;
    border-radius: 10px;
    padding-left: 10px;
    background-color: rgba(0, 0, 0, 0);
    height: 40px !important;
    color: #cacaca;
}
.error {
    border:red 2px solid;
}
</style>
