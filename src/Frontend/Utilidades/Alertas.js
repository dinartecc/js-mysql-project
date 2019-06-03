import Swal from 'sweetalert2'
import axios from 'axios'


const toSend = function ( url , info ){
    Swal.fire({
        title: '¿Está seguro?',
        text: "¿Desea ingresar los datos?",
        type: 'question',
        showCancelButton: true,
        confirmButtonText: 'Confirmar',
        cancelButtonText: 'Cancelar',
        reverseButtons: true,
        showLoaderOnConfirm: true,
        preConfirm: () => {
            return axios({
                    method: 'post',
                    url: url,
                    headers: {}, 
                    data: {
                        query: info, 
                    }
                })
            .then(response => {
                if (response.status !== 200) {
                    throw new Error(response.statusText)
                }
                return true;
            })
            .catch(error => {
                Swal.showValidationMessage(
                `Ocurrió un problema. Verifique sus datos e inténtelo más tarde`
                )
                return false;
            })  
        },
        allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {

        if (result.value) {
            Swal.fire(
            '¡Éxito!',
            `Se ${ this.boolDefault ? 'editó' : 'añadió'} exitosamente.`,
            'success'
            )
            .then(()=>this.$emit('added', true));
            
        }
    })
}



export default {
    toSend
}