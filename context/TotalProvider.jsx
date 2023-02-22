import {useState, createContext, useReducer} from 'react';
const TotalContext = createContext()

//  const initialState = {
//         pedido : [],
//         direccion: {
//             coords: {},
//             addressCommon: ''
//         },
//         delivery: null,
//         metodoPago: {},
//         proof: {},
 
//         total: 0,
//     }
const TotalProvider = ({children}) => {
    const initialState = {
        pedido : [],
        nombre: '',
        telefono: '',
        direccion: {
            coords: {},
            addressCommon: ''
        },
        delivery: null,
        metodoPago: {},
        proof: {},
 
        total: 0,
    }

function reducer(state, action) {
  switch (action.type) {
    case 'SET_PROP':
      return {...state, [action.payload.key]: action.payload.value};
    case 'SET_DELIVERY': 
        return {...state, delivery: action.payload}
    case 'SET_GEO_DATA':
      return {...state, direccion: {coords: action.payload.coords,addressCommon: action.payload.addressCommon }};
    case 'SET_METHOD_PAY': 
      return {...state, metodoPago: action.payload}
    case 'SET_PROOF_PAY': 
      return {...state, proof: {...state.proof, [action.payload.key]: action.payload.value}, }
    default:
      throw new Error();
  }
}

const [state, dispatch] = useReducer(reducer, initialState)

    return (
        <TotalContext.Provider value={{
        pedido: state.pedido,
        nombre: state.nombre,
        total: state.total,
        telefono: state.telefono,
        details: state.details,
        delivery: state.delivery,
        metodoPago: state.metodoPago,
        proof: state.proof,
        dispatch
        }}>
            {children}
        </TotalContext.Provider>
    )
}
export {TotalProvider}
export default TotalContext
