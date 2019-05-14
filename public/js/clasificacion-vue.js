

var app = new Vue({
    el: '#main',
    data() {
        return{
            marcas: null,
            categorias: null,
            subcategorias: null,
            rowActivo: false
        }
    },
    beforeMount(){
        this.actualizar()
        
    },

    methods: {
        actualizar:async function(){
            
            await axios.get('/clasificacion/info')
            .then((response) => {
                const {categoria, subcategoria, marca} = response.data;
                this.marcas = marca;
                this.categorias = categoria;
                this.subcategorias = subcategoria;
            })
        }
    }
})