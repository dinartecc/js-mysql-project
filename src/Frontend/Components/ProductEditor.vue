<template>
    <div id="product-container">
        <div id="general-info" class="bg">
            <div class="titulo-container">
                Detalles generales
            </div>
            <div class="inputs-container">
                <div class="input-group">
                    <label for="nombre">Nombre del producto</label>
                    <input id="nombre" type="text" class="input-default" :v-model="nombre">
                </div>
                <div class="group-two-container input-group">
                    <div class="group-two">
                        <label for="nombre">Marca</label>
                        <input type="text" class="input-default input-group-two">
                    </div>
                    <div class="group-two">
                        <label for="nombre">Categoria</label>
                        <input type="text" v-model="categoria" class="input-default input-group-two">
                    </div>
                </div>
                <div class="input-group">
                    <label for="nombre">Descripción del producto</label>
                    <textarea class="textarea" v-model="descripcion" id="text-area" name=""  cols="30" rows="10"></textarea>
                </div>
            </div>
        </div>


        <div id="specific-info">

            <div id="proveedor-container" class="bg">
                <div class="titulo-container">
                    <h3>Información de proveedor</h3>
                </div>
                <div class="inputs-container">
                    <div class="input-group">
                        <label for="nombre"><h3>Proveedor</h3></label>
                        <input id="nombre" type="text" class="input-default" :v-model="nombre">
                    </div>
                </div>
            </div>

            <div id="precio-container" class="bg flex column align">
                <div class="titulo-container">
                    <h3>Información de precio</h3>
                </div>
                <div class="inputs-container">
                    <div class="input-group">
                        <label for="nombre"><h3>Precio</h3></label>
                        <!--span id="number-sign">C$</span-->
                        <CurrencyInput v-model="precio"></CurrencyInput>
                        
                        
                    </div>
                    <div class="input-group">
                        <label for="nombre"><h3>Margen de ganancia</h3></label>
                        
                        
                        <PercentInput v-model="margen"> </PercentInput>
                    </div>
                    <div class="input-group">
                        <h3>Impuesto</h3>
                        <div class="flex">
                            <label for="radio1">
                                <div >Si</div>
                            </label>
                            <input type="radio" v-model="impuesto" id="radio1" name="impuesto">

                            <label class="" for="radio2">
                                <div >No</div>
                            </label>
                            <input type="radio" v-model="impuesto" id="radio2" name="impuesto">
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>


<script>

import CurrencyInput from './MicroComponents/CurrencyInput.vue'
import PercentInput from './MicroComponents/PercentInput.vue'
export default {
    data: function(){
        return{
            nombre: '',
            proveedor: '',
            descripcion: '',
            marca: '',
            impuesto: true, 
            subcategoria: '',
            precio: 0,
            margen: 0,
        }
    },
    components: {
        CurrencyInput,
        PercentInput
    }
}
</script>


<style scoped>

.radio-label{
    min-width: 100px;
    background: #cacaca
}

input[type=radio]{
    display: ;
}
input[type="radio"]:checked + label div{
   
}
input[type=number]::-webkit-inner-spin-button, 
input[type=number]::-webkit-outer-spin-button { 
  -webkit-appearance: none; 
  margin: 0; 
}
input[type="number"]{
    
    padding-left: 40px;
}
#number-sign{
    font-size: 20px;
    margin-top: 9px;
    margin-left: 10px;
    position: absolute;
}

.titulo-container{
    font-size: 20px;
    background-color: #4b5976;
    width: 100%;
    display: flex;
    height: 50px;;
    align-items: center;
    border-radius: 7px 7px 0 0;

}

.titulo-container h3{
    margin: 0;
    margin-left: 20px;
}


.align{
    align-items: center;
}

#precio-container{
    margin-top: 50px;
    padding-bottom: 50px;
    border-radius: 10px;
}
.flex{
    display: flex;
}
.column{
    flex-direction: column;
}
.center{
    justify-content: center;
}

.bg{
    background-color: #657786;
    background-color: #243447;
    background-color: #100E17;
    background-color: #2a3141;
    background-color: #3c4f65;
    background-color: #3c4f65;
    background-color: #2a3141;
}

#specific-info{
    
    width: 35%;
    height: 500px;
    margin-top: 100px;
}

#proveedor-container{
    
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 200px;;
    
}

#general-info{
    display: flex;
    flex-direction: column;
    align-items: center;
    
    margin-top: 100px;
    width: 60%;
    height: 1800px;

    
}

#product-container{
    width: 80%;
    color: white;
    display: flex;
    justify-content: space-between;
    
}

.textarea{
    box-sizing: border-box;
    resize:vertical;
    border-radius: 5px;
    padding-left: 10px;
    background-color: rgba(0, 0, 0, 0);
    color: #cacaca;
    width: 100%
}

.input-default{
    box-sizing: border-box;
    border: 2px solid #747885;
    width: 100%;
    min-width: ;
    outline: 0;
    border-radius: 10px;
    padding-left: 10px;
    background-color: rgba(0, 0, 0, 0);
    height: 40px !important;
    color: #cacaca;
}
.inputs-container{
    width: 80%;
}

.input-group{
    margin-top: 40px;
    width: 100%
}
.group-two-container{
    display: flex;
    justify-content: space-between;
}
.group-two{
    width: 47%;
    
}
.input-group-two{
    width: 100%
}



</style>
