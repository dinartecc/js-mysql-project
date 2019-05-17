

<template>
    <Table title="titulo"></Table>
</template>
<script>
const titulo = [
    'hola',
    'Que ta',
    'Prro'
]


import EmptyMsg from './Components/EmptyMsg.vue'
import Table from './Components/Table.vue'

export default {
    
    data: () => {
        return {

        }
    },


    components :{
        EmptyMsg,
        Table
    }

}
</script>


<style scoped>

</style>
