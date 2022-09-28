import { useState, useEffect, createContext } from 'react'
import {axiosClient} from '../axios'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'

const QuioscoContext = createContext()


const QuioscoProvider = ({children}) => {
    const [categorias, setCategorias] = useState([])
    const [products, setProducts] = useState([])
    const [categoriaActual, setCategoriaActual] = useState({})
    const [producto, setProducto ] = useState({})
    const [modal, setModal] = useState(false)
    const [pedido, setPedido] = useState([])
    const [nombre, setNombre] = useState('')
    const [total, setTotal] = useState(0)


    const router = useRouter()
    const obtenerCategorias = async () => {
        //const { data } = await axiosClient('/api/categorias')
        setCategorias([
    {
        icono: "cafe",
        nombre: "Café"
      },
      {
        icono: "hamburguesa",
        nombre: "Hamburguesas"
      },
      {
        icono: "pizza",
        nombre: "Pizzas"
      },
      {
        icono: "dona",
        nombre: "Donas"
      },
      {
        icono: "pastel",
        nombre: "Pasteles"
      },
      {
        icono: "galletas",
        nombre: "Galletas"
      }
])
    }
    useEffect(() => {
        obtenerCategorias()
    }, [])
    useEffect(() => {
        setCategoriaActual(categorias[0])
    }, [categorias])

    useEffect(() => {
        const nuevoTotal = pedido.reduce((total, producto) => (producto.precio * producto.cantidad ) + total, 0)

        setTotal(nuevoTotal)
    }, [pedido])

    const getProductsPerCategory = async ({category}) => {
        const products = [{ nombre: 'a', imagen: 'img', precio:"12", category: 'Café' },
    { nombre: 'b', imagen: 'imgb', precio:"132", category: 'Hamburguesas' },{ nombre: 'ba', imagen: 'imgB', precio:"112", category: 'Pizzas' }]
        setProducts(products.filter(i => (i.category === category.nombre)))
         router.push('/')
    }
    const handleSetProducto = producto => {
        setProducto(producto)
    }

    const handleChangeModal = () => {
        setModal(!modal)
    }

    const handleAgregarPedido = ({categoriaId, ...producto}) => {
        if(pedido.some(productoState => productoState.id === producto.id)) {
           // Actualizar la cantidad
           const pedidoActualizado = pedido.map(productoState => productoState.id === producto.id ? producto : productoState)
           setPedido(pedidoActualizado)

           toast.success('Guardado Correctamente')
        } else {
            setPedido([...pedido, producto])
            toast.success('Agregado al Pedido')
        }

        setModal(false)
        
    }

    const handleEditarCantidades = id => {
        const productoActualizar = pedido.filter( producto => producto.id === id)
        setProducto(productoActualizar[0])
        setModal(!modal)
    }

    const handleEliminarProducto = id => {
        const pedidoActualizado = pedido.filter( producto => producto.id !== id)
        setPedido(pedidoActualizado)
    }

    const colocarOrden = async (e) => {
        e.preventDefault();

        try {
            await axiosClient.post('/api/ordenes', {pedido, nombre, total, fecha: Date.now().toString()})

            // Resetear la app
            setCategoriaActual(categorias[0])
            setPedido([])
            setNombre('')
            setTotal(0)

            toast.success('Pedido Realizado Correctamente')

            setTimeout(() => {
                router.push('/')
            }, 3000)

        } catch (error) {
            console.log(error)
        }

    };

    return(
        <QuioscoContext.Provider
            value={{
                categorias,
                products,
                categoriaActual,
                getProductsPerCategory,
                producto,
                handleSetProducto,
                modal, 
                handleChangeModal,
                handleAgregarPedido,
                pedido,
                handleEditarCantidades,
                handleEliminarProducto,
                nombre, 
                setNombre,
                colocarOrden,
                total
            }}
        >
            {children}
        </QuioscoContext.Provider>
    )
}

export {
    QuioscoProvider
}
export default QuioscoContext