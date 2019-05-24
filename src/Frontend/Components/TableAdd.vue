<template>
    <form action="/roles/add" method="POST">
    <h2 style="text-align: center; color: white;">Añadir Rol</h2>

        <table>
            <thead>
                <tr>
                    <th :key="titulos" v-for="titulos of titles">{{titulos}}</th> <!-- Imprime los titulos que le pasas   -->
                </tr>
            </thead>
            <tbody><!-- *****  Probablemente sea muchos comentarios, pero es para luego no olvidarme de que hice ***** -->  

                    <tr v-for="elemento of body" :key="elemento"> <!-- Hace un ciclo por los elementos del body, osea las secciones, ejemplo: -->  
                        <td >{{elemento}}</td>                    <!-- Clasificacion, Lotes, Productos -->

                        <td v-for="(titulo, index) of filterSection" :key="titulo"> <!-- Hace un ciclo por cada elemento del arreglo title -->
                            <div class="input-container">                           <!-- menos el elemento 'Seccion'. La variable index es un contador -->
                                
                                <!--  ** INPUT **
                                    1- value es igual a index + 1 porque index empieza por 0 y el valor minimo tiene que ser 1.
                                    2- id lo utilizo para referenciarlo en el label for.
                                    3- v-model: inputs es un objeto que se le añaden propiedades segun el valor actual del elemento, ejemplo : inputs.clasificacion.
                                    4- Utilizando v-model no es necesario utilizar checked, puesto que inicializo todos los elementos del objeto inputs a 1 
                                        y eso matchea con el value del input .
                                 -->
                                <input type="radio" 
                                :name="elemento"  
                                :value="index + 1"
                                :id="elemento + '_' + index"
                                v-model="inputs[elemento]"
                                >
                                <!-- 
                                    1- class lo utilizo para seleccionarlo y darle estilos segun el elemento y el valor de index. Mas info en la funcion handleClick. 
                                       Ejemplo: Clasificacion_1 , Clasificacion_2, Clasificacion_3
                                    2- La funcion handleClick es la logica para los estilos de los botones. Recibe el elemento actual y el valor del index. Ejemplo:  Clasificacion y 1
                                 -->  
                                <label class="border "   
                                :for="elemento + '_' + index"
                                :class="[elemento + '_' + index ]"
                                @click="handleClick(elemento, index)"
                                >
                                    <div>{{index === 0 ? 'SI' : 'NO'}}</div> <!-- Esto es para que el texto de la columna Ninguno, se vea como 'seleccionado' -->
                                </label>
                            </div>
                        </td>
                    </tr>
            </tbody>
        </table>
        <div id="btn-container">
            <!--input type="submit" class="input-default red" value="Cancelar"-->
            <input type="submit" @click="send($event)" class="input-default" value="Enviar">
        </div>
        <input type="text" name="Nombre" v-model="nombre" class="" required>
    </form>
</template>



<script>

import $ from 'jquery'
import axios from 'axios'


export default {
    props: {
        titles: Array,
        body: Array,
        defaultValues: Array,
        action: String // add o edit
    },
    data: function(){
        return{
            nombre: '',
            inputs: {},
            
        }
    },
    created: function(){
        // Inicializar los elementos en 0
        if(this.action === 'add'){
            for(let hola of this.body){
            this.inputs[hola] = 1
                console.log(this.inputs)
            }
        }else if(this.action === 'edit'){  
            
            this.body.forEach((hola,index) => {
                this.inputs[hola] = this.defaultValues[index];
                
            });
            this.reRender()
            console.log(this.inputs)

        }else{
            console.log('Escriba bien')
        }
    },
    mounted(){
        typeof this.defaultValues !== 'undefined' ? this.reRender() : null;
    },
    methods: {

        reRender(){
            this.body.forEach((elemento, index) => {
                for (let contador = 0; contador <= this.defaultValues[index]-1; contador++) {
                    let select = $(`.${elemento}_${contador}`)

                    select.addClass('selected')
                    $(`.${elemento}_${contador} div`).text('SI')
                    if(contador == 4){
                        select.css('background-color', '#e66f66')
                    }
                    if(contador == 0 && this.defaultValues[index]-1 !== 0 ){
                        select.addClass('input-no-selected')
                        $(`.${elemento}_${contador} div`).text('NO')
                    }
            }
            })
        },
        send(event){
            event.preventDefault()
            this.inputs.nombre = this.nombre;
            axios.post(`/roles/${this.action}`, {data:this.inputs})
            console.log(this.inputs)
        },
        handleClick(elemento, index){
            for (let contador = 0; contador <= index; contador++) {
                $(`.${elemento}_${contador}`).addClass('selected')
                $(`.${elemento}_${contador} div`).text('SI')
                if(contador == 4){
                    $(`.${elemento}_${contador}`).css('background-color', '#e66f66')
                }
                if(contador == 0 && index !== 0 ){
                    $(`.${elemento}_${contador}`).addClass('input-no-selected')
                    $(`.${elemento}_${contador} div`).text('NO')
                }
            }
            console.log(this.inputs)
            for (let contador = index+1; contador  <  this.titles.length ; contador++) {
                $(`.${elemento}_${contador}`).removeClass('selected')
                $(`.${elemento}_${contador} div`).text('NO')
                if(contador == 4){
                     $(`.${elemento}_${contador}`).css('background-color', '#4b5976')
                }
            }
        }
    }
    ,
    computed: {
        filterSection: function(){
            return this.titles.filter(function(title){
                if(title !== 'Seccion'){
                    return title
                }
            })
        }
    }
    
}
</script>


<style scoped>


#btn-container{
    display: flex;
    justify-content: center;
    margin-top: 40px;
}

.input-default{
    border: 2px solid #555861;
    width: auto;
    outline: 0;
    margin-right: 20px;
    margin-left: 0;
    padding: 7px 20px 7px 20px;
    border: 0;
    border-radius: 10px;
    background-color: #6a7cab;
    height: 30px !important;
    color: white;
}
.input-container{
    display: flex;
    width: 150px;
    justify-content: center;
    margin: 0 auto 0 auto;
    border-radius: 20px;
}


.input-container p {
    margin: 0
}
.input-container div{
    width: 100px;
    padding: 10px 8px 10px 8px
}

input[type="radio"]{display: none}
label{
    cursor: pointer;
}

.selected{
    background-color: #85BDA6;
    color: white;
    transition: 1s;
}

input:checked + label {
    transition: 1s;
    
    background-color: rgb(104, 149, 167);
    background-color: #85BDA6;
    color: white;
    /*box-shadow: 0 0 10px rgba(102, 179, 251, 0.5);*/
    border-color: #4B9DEA;
    z-index: 1;
}

.input-no-selected{
    background-color: #4b5976;
}

input + label{
    transition: 1s;
    background-color: #4b5976;
}
.red:checked + label{background-color: #e66f66}
.red { 
    background-color: #e66f66
}
.border {
    border-radius: 6px;
   
}
.border-right {
    border-radius: 0 6px 6px 0;
    border-left: none;
}


table{
    -webkit-box-shadow: 10px 14px 63px -49px rgba(0,0,0,0.75);
    -moz-box-shadow: 10px 14px 63px -49px rgba(0,0,0,0.75);
    box-shadow: 10px 14px 63px -49px rgba(0,0,0,0.75);
    border-collapse: collapse;
    width: 100%;
    text-align: center;
}


table td, table th {
    height: 30px;
    padding: 8px;
}

table tbody td{
    height: 60px;
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
table th{
    width: 50px;
}



</style>
