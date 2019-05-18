<template>
    <div>
        <table>
            <thead>
                <tr>
                    <th v-for="titulos in title" >{{titulos}}</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Fila 1</td>
                    <td>Fila 2</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>



<script>
export default {
    props: {
        title: Array,
        body: Array
    },
    data: () => {
        return {

        }
    }
}
</script>


<style>
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
    
}
</style>

