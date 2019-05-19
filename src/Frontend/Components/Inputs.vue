<template>
    <div>
        <table>
            <caption>{{ formatearTitulo }}</caption>
            <thead>
                <tr>
             
                    <th v-bind:key="titulos" v-for="titulos in orden">{{orden.titulo}}</th>
                </tr>
            </thead>    
            <tbody>
                <tr :key="contenido" v-for="contenido in body" @click="respuesta(contenido[contenido.id])">
                    <td :key="items" v-for="items in orden">{{contenido[items.campo]}}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>



<script>
export default {
    props: {
        tabla: String,
        title: Array,
        body: Array,
        orden: Array

    },
    methods: {
        respuesta( id ) {
            const res = {
                id: id,
                tabla: this.tabla
            }
            this.$emit('clickeado', res )
        }
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

