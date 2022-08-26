
/* Un estado tiene dos parametros, el estado a gestionar y la acción, el reducer
 simepre debe devolver el estado, para lanzar un reducer hay que usar una función
 dispach en el componente hay que pasarle un objeto con dos datos,
  1. el tipo de acción(crear, borrar) 
  2. el paylload: datos a guardar en el estado */

export const JuegoReducer = (state = [], action) => {

    switch (action.type) {
        case "crear":
            return [...state, action.payload]

        case "borrar":
            return state.filter(juego => juego.id !== action.payload )

        case "editar":
           let indice = state.findIndex(juego => juego.id === action.payload.id)
           state[indice] = action.payload;
           return [...state];
           
        default:
            return state;
    }

}