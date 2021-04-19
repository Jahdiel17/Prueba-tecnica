import React, { Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import clienteAxios from '../config/axios';
import Swal from 'sweetalert2';

const Producto = (props) => {

    if(!props.producto) {
        props.history.push('/productos');
        return null;
    }

    // extraer por props
    const { producto: { _id, nombre, precio, descripcion, cantidad} } = props;

    // elimina un producto
    const eliminarProducto = id => {
        
        Swal.fire({
            title: '¿Estas seguro?',
            text: "Esta acción no es reversible",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar!',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                // Alerta de eliminado
                Swal.fire(
                    'Eliminado!',
                    'Este producto ha sido eliminado.',
                    'success'
                )

                // Eliminado de la base de datos
                clienteAxios.delete(`/productos/${id}`)
                    .then(respuesta => {
                        props.guardarConsultar(true);
                        props.history.push('/productos');
                    })
                    .catch(error => console.log(error))
            }
        })
        
    }

    return ( 
        <Fragment>
            <h1>Producto:  {nombre}</h1>

            <div className="container mt-4 py-4">
                    <div className="row">
                        <div className="col-12 mb-5 d-flex justify-content-center" >
                            <Link to={'/productos'} className="btn btn-success text-uppercase py-2 px-5 font-weight-bold">Volver</Link>
                        </div>
                        <div className="col-md-8 mx-auto" >
                            <div className="list-group">
                                <div className="p-5 list-group-item list-group-item-action flex-column align-items-center">
                                        <div className="d-flex w-100 justify-content-between mb-4" >
                                            <h3 className="mb-3" >{nombre}</h3>
                                            <small className="precio" >
                                                L.{precio}
                                            </small>
                                        </div>

                                        <p className="mb-0" >
                                            {descripcion}
                                        </p>
                                        <div className="cantidad py-3" >
                                            <p>Cantidad: {cantidad}</p>
                                        </div>

                                        <div className="d-flex">
                                            <button 
                                                type="button"
                                                className="text-uppercase py-2 px-5 font-weight-bold btn btn-danger col"
                                                onClick={() => eliminarProducto(_id)}
                                            >
                                                Eliminar &times;
                                            </button>
                                        </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
        </Fragment>
     );
}
 
export default withRouter(Producto);