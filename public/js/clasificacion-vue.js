

var app = new Vue({
    el: '#main',
    data() {
        return{
            marcas: '',
            categorias: '',
            subcategorias: '',
            rowActivo: false,
            searchBar: '',
            showWhenEmpy: true,
           
        }
    },
    beforeCreate(){
        this.showWarning = false;

    },
    beforeMount(){
        this.actualizar()
        
    },

    computed: {

    }
    ,
    methods: {
        actualizar:async function(){
            await axios.get('/clasificacion/info')
            .then((response) => {
                const {categoria, subcategoria, marca} = response.data;
                this.marcas = marca;
                this.categorias = categoria;
                this.subcategorias = subcategoria;
                this.showWhenEmpy = false;
            })
        },

        busqueda: async function(){
            var tipo = 'nombre';
            var selected = getSelectBtn();
            console.log(selected)
            if(selected  == undefined) selected = 'todo';
            
            await axios.post('/clasificacion/buscar/', {tabla: selected, busqueda: this.searchBar, tipo: tipo })
            .then((response) => {
                if(selected == 'todo'){
                    this.showWhenEmpy = false;
                    const {categoria, subcategoria, marca} = response.data;
                    this.marcas = marca;
                    this.categorias = categoria;
                    this.subcategorias = subcategoria;
                }else{
                    this.showWhenEmpy = true;
                    selected += 's'
                    console.log( response.data )
                    this[selected] = response.data;
                    console.log( this[selected] )
                }
            })
        }
    }
})




Vue.component('results-not', {
    template: '<div > NO SE HA ENCONTRADO RESULTADOS </div>'
  })