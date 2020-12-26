import {createStore} from 'redux'
import { v4 as uuidv4 } from 'uuid';

const initialState ={
    contactos:[
        {
            id:uuidv4(),
            nombre:"Willian",
            numero:'3135787605',
        },
        {
            id:uuidv4(),
            nombre:"Jose",
            numero :"1231231313",
        }
    ]
}


const reducerContactos = (state = initialState,action)=>{
    switch (action.type) {
        case "ELIMINAR_CONTACTO":
            return{
                ...state,
                contactos:state.contactos.filter(item => item.id !== action.contacto.id)
            }

        case "AGREGAR_CONTACTO":
        return{
            ...state,
            contactos:state.contactos.concat(action.contacto),
        }
        case "ACTUALIZAR_CONTACTO":
            return{
                ...state,
                contactos:state.contactos.map(item => item.id === action.contacto.id ? action.contacto : item)
            }
        default:
            break;
    }
    return state;
}

export default createStore(reducerContactos)