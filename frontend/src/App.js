import React, {useEffect, useState} from 'react';
import { BrowserRouter as Router, Route, Switch  } from 'react-router-dom';
import { useSelector } from 'react-redux';

import clienteAxios from './config/axios';

// Componentes
import Productos from './components/Productos';
import NuevoProducto from './components/NuevoProducto';
import Producto from './components/Producto';
import Login from './components/Login';
import { selectUser } from './features/userSlice';

const App = () => {
  //login
  const user = useSelector(selectUser);

  // State de la app
  const [productos, guardarProducto] = useState([]);
  const [consultar, guardarConsultar] = useState(true);

  useEffect( () => {
    if(consultar) {
      const consultarAPI = () => {
        clienteAxios.get('/productos')
          .then(respuesta => {
              // colocar en el state el resultado
              guardarProducto(respuesta.data);

              // deshabilitar la consulta
              guardarConsultar(false);
          })
          .catch(error => {
            console.log(error);
          })
      }
      consultarAPI();
    }
  }, [consultar] )

  return (
    <Router>
        <Switch>
           <Route 
              exact 
              path="/"
              component={ () => user ? <Productos /> : <Login />}
            />

            <Route 
              exact 
              path="/productos"
              component={() => <Productos productos={productos} />}
            />

            <Route 
              exact 
              path="/nuevo"
              component={()=> <NuevoProducto guardarConsultar={guardarConsultar} />}
            />

            <Route 
              exact 
              path="/producto/:id"
              render={(props)=> {
                const producto = productos.filter(producto => producto._id === props.match.params.id)

                return (
                  <Producto
                    producto={producto[0]}
                    guardarConsultar={guardarConsultar}
                  />
                )
              }}
            />
        </Switch>
    </Router>
  );
}

export default App;
