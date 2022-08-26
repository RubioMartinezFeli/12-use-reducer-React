import React, {useReducer, useEffect} from 'react'
import { JuegoReducer } from '../reducers/JuegoReducer';

/* Definimos la función init fuera del componente, esta función se encarga de 
   procesar cualquier dato para pasarselo al estado, para sacar datos del
   localStorage o hacer una petición ajax*/

const init = () => {
    return JSON.parse(localStorage.getItem("juegos")) || [];
}

export const MisJuegos = () => {

    /* Usa tres parametros
    1. El reducer
    2. Estado tal cual lo queramos inicializar
    3. Función init: función inicializadora*/
    const [juegos, dispach] = useReducer(JuegoReducer, [], init)

    // Usamos useEffect para inicializar los valores del localStorage y guardar 
    // los cada vez que modifiquemos juegos atraves del reducer
    useEffect(() => {
      localStorage.setItem("juegos", JSON.stringify(juegos))
    }, [juegos]);
    

    const conseguirDatosForm = e => {
        e.preventDefault();
        
        let juego = {//Creamos objeto con los datos del formulario
            id: new Date().getTime(),
            titulo: e.target.titulo.value,
            descripcion: e.target.descripcion.valu
        };

        //Objeto que pasamos a dispach
        const accion = {
            type: "crear",
            payload: juego    
        }

        dispach(accion);

        console.log(juegos);
    }

    const borramelo = id => {

        //Objeto que pasamos a dispach
        const accion = {
            type: "borrar",
            payload: id    
        }
        dispach(accion);
    } 

    const editar = (e, id) => {

        let juego = {//Creamos objeto con los datos del formulario
            id,
            titulo: e.target.value,
            descripcion: e.target.value
        };

        //Objeto que pasamos a dispach
        const accion = {
            type: "editar",
            payload: juego    
        }
        dispach(accion);
    } 

  return (
    <div>
        <h1>Estos son mis videojuegos</h1>

        <p>Numero de videojuegos: {juegos.length}</p>

        <ul>
            { 
                juegos.map( juego => (
                    <li key={juego.id}>
                            {juego.titulo}
                        <button onClick={e => borramelo(juego.id)}>x</button>
                        <input type="text"
                         onBlur={e => editar(e, juego.id)}
                         onKeyPress={ e=>{
                            if(e.key == "Enter")
                            editar(e, juego.id)
                         }}
                         placeholder='Nuevo titulo'/>
                    </li>
                ))
            }
        </ul>

        <h3>Agregar juego</h3>

        <form onSubmit={conseguirDatosForm}>
            <input type="text" name='titulo' placeholder='Titulo'/>
            <textarea name='descripcion' placeholder='Descripción'/>
            <input type="submit" value='Guardar'/>
        </form>
        

    </div>
  )
}
