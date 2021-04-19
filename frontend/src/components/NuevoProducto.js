import React, {Fragment, useState} from 'react';
import { Link, withRouter } from 'react-router-dom';
import clienteAxios from '../config/axios';

const NuevoProducto = (props) => {

    // Generar state como objeto
    const [producto, guardarProducto] = useState({
        nombre: '',
        descripcion: '',
        precio: '',
        cantidad: ''
    });

    // Lee los datos del formulario
    const actualizarState = e => {
        guardarProducto({
            ...producto,
            [e.target.name] :  e.target.value
        })
    }

    // Enviar una peticion a la API
    const crearNuevoProducto = e =>{
        e.preventDefault();

        // enviar la peticion por axios
        clienteAxios.post('/productos', producto)
            .then(respuesta => {
                console.log(respuesta);

                props.guardarConsultar(true);

                // Redireccionar
                props.history.push('/productos')
            })
    }

    return ( 
        <Fragment>
            <h1 className="my-4" >Agregar Nuevo Producto</h1>

            <div className="container mt-4 py-4">
                    <div className="row">
                        <div className="col-12 mb-5 d-flex justify-content-center" >
                            <Link to={'/productos'} className="btn btn-success text-uppercase py-2 px-5 font-weight-bold">Volver</Link>
                        </div>
                        <div className="col-md-8 mx-auto" >
                            <form 
                                onSubmit={crearNuevoProducto}
                                className="bg-white p-5 bordered">
                                <div className="form-group">
                                    <label htmlFor="nombre">Nombre Producto</label>
                                    <input 
                                        type="text" 
                                        className="form-control form-control-lg" 
                                        id="nombre" 
                                        name="nombre" 
                                        placeholder="Nombre Producto"
                                        onChange={actualizarState} 
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="descripcion">Descripcion</label>
                                    <textarea 
                                        className="form-control" 
                                        name="descripcion" 
                                        rows="5"
                                        onChange={actualizarState}
                                    ></textarea>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="precio">Precio</label>
                                    <input 
                                        type="number" 
                                        className="form-control form-control-lg" 
                                        id="precio" 
                                        name="precio" 
                                        placeholder="Precio" 
                                        onChange={actualizarState}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="cantidad">Cantidad</label>
                                    <input 
                                        type="number" 
                                        className="form-control form-control-lg" 
                                        id="cantidad" 
                                        name="cantidad"  
                                        placeholder="Cantidad"
                                        onChange={actualizarState}
                                    />
                                </div>

                                <input type="submit" className="btn btn-primary mt-3 w-100 p-3 text-uppercase font-weight-bold" value="Agregar Producto"  />
                        </form>
                        </div>
                    </div>
                </div>
        </Fragment>
     );
}
 
export default withRouter(NuevoProducto) ;