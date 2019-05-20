

var app = new Vue({
    el: '#main',
    data() {
        return{
            marcas: '',
            categorias: '',
            subcategorias: '',


            Tmarcas: '',
            Tcategorias: '',
            Tsubcategorias: '',


            rowActivo: false,
            searchBar: '',
            showWhenEmpy: false,
            showEmptyMsg: false,
          
           
        }
    },
    beforeCreate(){

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
                this.marcas = 
                this.Tmarcas = marca;

                this.categorias = 
                this.Tcategorias = categoria;

                this.subcategorias = 
                this.Tsubcategorias = subcategoria;


                this.showWhenEmpy = false;


            })
        },
        cambiar: function(){
            this.showEmptyMsg = false;
            this.showWhenEmpty  = true;
            let a = $(".boton-seccion-activo").attr('data-boton')
            console.log(a)
            if(a == undefined){
               
                /*this.subcategorias = this.Tsubcategorias;
                this.categorias = this.Tcategorias;
                console.log(this.marcas)*/
            }
        },
        busqueda: async function(){
            var tipo = 'nombre';
            var selected = getSelectBtn();
            
            if(selected  == undefined) selected = 'todo';
            
            await axios.post('/clasificacion/buscar/', {tabla: selected, busqueda: this.searchBar, tipo: tipo })
            .then((response) => {
                if(selected == 'todo'){
                    this.showWhenEmpy = false;
                    const {categoria, subcategoria, marca} = response.data;
                    this.marcas = marca;
                    this.categorias = categoria;
                    this.subcategorias = subcategoria;



                    if(this.marcas.length == 0 && this.categorias.length == 0 && this.subcategorias.length == 0){
                        this.showEmptyMsg = true;
                    }else{
                        this.showEmptyMsg = false
                    }


                }else{
                    
                    this.showWhenEmpy = false;
                    selected += 's'
                    console.log( response.data )
                    if(response.data.length == 0 ) this.showEmptyMsg = true;
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