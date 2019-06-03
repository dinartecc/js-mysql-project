import Swal from 'sweetalert2'
import axios from 'axios'



const DeleteElement = function ( url , info) {
    Swal.fire({
        title: 'Estas Seguro?',
        text: 'Si este elemento contiene elementos hijos, su unión será borrada',
        type: 'warning',
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


const ToSend = function ( url , info ){
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


const Error = function () {
    Swal.fire({
        type: 'error',
        title: 'Error!',
        text: '¡Hay campos con valores no válidos!'
    })
}


export default {
    ToSend,
    Error,
    DeleteElement
}