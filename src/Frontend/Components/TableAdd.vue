<template>
    <form action="/prueba" method="POST">
    <h2 style="text-align: center; color: white;">Añadir Rol</h2>
        <table>
            <thead>
                <tr>
                    <th :key="titulos" v-for="titulos of titles">{{titulos}}</th>
                </tr>
            </thead>
            <tbody>
                    <tr v-for="elemento of body" :key="elemento">
                        <td>{{elemento}}</td>
                        <td v-for="titulos of filterSection" :key="titulos">
                            <div class="input-container">

                                <input value="no" type="radio" :name="elemento + '_' + titulos " :id="elemento + '_' + titulos + '_no'" checked>
                                <label class="border-left "  :for="elemento + '_' + titulos + '_no'">
                                    <div >
                                        No
                                    </div>
                                </label>
                                <input class="red" value="si" type="radio" :name="elemento + '_' + titulos " :id="elemento + '_' + titulos + '_yes'">
                                <label class="border-right selectedRed" :for="elemento + '_' + titulos + '_yes'">
                                    <div>
                                        Si
                                    </div>
                                </label>

                                <span class="switch"></span>
                            </div>
                        </td>
                    </tr>
            </tbody>
        </table>
        <div id="btn-container">
            <input type="submit" class="input-default red" value="Cancelar">
            <input type="submit" class="input-default" value="Enviar">
        </div>
    </form>
</template>



<script>
export default {
    props: {
        titles: Array,
        body: Array
    },
    data: function(){
        return{
            inputs: []
        }
    },
    created: function(){
        this.inputs = this.titles
    },
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
    min-width: ;
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
   
    /* Test */ 



}


.input-container p {
    margin: 0
}
.input-container div{
    width: 50px;
    padding: 7px 8px 7px 8px
}

input[type="radio"]{display: none}
label{
    cursor: pointer;
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
input + label{
    background-color: #4b5976;
}
.red:checked + label{background-color: #e66f66}
.red { 
    background-color: #e66f66
}
.border-left {
    border-radius: 6px 0 0 6px;
    border-right: none;
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
table td{

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
    text-align:;
    
}



</style>
