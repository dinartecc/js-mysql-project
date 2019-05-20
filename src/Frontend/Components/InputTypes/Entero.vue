<template>
    <input type='number' minlength="1" :maxlength="longitud" />
</template>



<script>

export default {
    props: {
        longitud : Number
    },
    components: {

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
        
        },
        schemaKeys() {
            const llaves = Object.keys(this.schema);

            return llaves.filter( llave => llave !=='id' && llave !== schema.id );
        },

    }
}

</script>


<style scoped>

div{
    width: 100%;
    display: flex;
    justify-content: center;
}
</style>

