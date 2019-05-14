

var app = new Vue({
    el: '#main',
    data() {
        return{
            marcas: null,
            categorias: null,
            subcategorias: null,
            rowActivo: false,
            searchBar: ''
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
        },

        busqueda: async function(){
            var tipo = 'id';
            var selected = getSelectBtn();
            
            console.log(selected)
            await axios.post('/clasificacion/buscar/', {tabla: selected, busqueda: this.searchBar, tipo: tipo })
            .then((response) => {
                selected += 's'
                console.log( response.data )
                this[selected] = response.data;
                console.log( this[selected] )
            })
        }
    }
})