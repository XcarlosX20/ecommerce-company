import { useState, useEffect, createContext } from 'react'
import { axiosClient } from '../axios'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'

const QuioscoContext = createContext()

const QuioscoProvider = ({ children }) => {
  const [InfoCompany, setInfoCompany] = useState({})
  const [products, setProducts] = useState([])
  const [categoriaActual, setCategoriaActual] = useState('')
  const [producto, setProducto] = useState({})
  const [modal, setModal] = useState(false)
  const [pedido, setPedido] = useState([])
  const [nombre, setNombre] = useState('')
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)

  const router = useRouter()
  const getInfoCompany = async (query) => {
    try {
      const { data } = await axiosClient(`/api/companies/632d30f27fb46013ddce70c0/?q=${query}`)
      console.log(data)
      setInfoCompany(data)
    } catch (error) {
      console.log(error)
    }
  }
  const getProductsPerCategory = async ({ category }) => {
    const endpoint = `api/products/${'632d30f27fb46013ddce70c0'}/?category=${category}`
    try {
      const products = await axiosClient(endpoint)
      setProducts(products.data)
    } catch (error) {
      console.log(error)
    }
  }
  const getProductsHome = async () => {
    const endpoint = `api/products/${'632d30f27fb46013ddce70c0'}`
    try {
      const products = await axiosClient(endpoint)
      setProducts(products.data)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getInfoCompany('all')
  }, [])
  useEffect(() => {
    if (categoriaActual) {
      getProductsPerCategory({ category: categoriaActual })
    }
  }, [categoriaActual])

  useEffect(() => {
    const nuevoTotal = pedido.reduce((total, producto) => (producto.price * producto.cantidad) + total, 0)
    setTotal(nuevoTotal)
  }, [pedido])
  const handleSetProducto = producto => {
    setProducto(producto)
  }

  const handleChangeModal = () => {
    setModal(!modal)
  }

  const handleAgregarPedido = ({ category, ...producto }) => {
    if (pedido.some(productoState => productoState._id === producto._id)) {
      // Actualizar la cantidad
      const pedidoActualizado = pedido.map(productoState => productoState._id === producto._id ? producto : productoState)
      setPedido(pedidoActualizado)
      toast.success('Guardado Correctamente')
    } else {
      setPedido([...pedido, producto])
      toast.success('Agregado al Pedido')
    }

    setModal(false)
  }

  const handleEditarCantidades = _id => {
    const productoActualizar = pedido.filter(producto => producto._id === _id)
    setProducto(productoActualizar[0])
    setModal(!modal)
  }

  const handleEliminarProducto = _id => {
    const pedidoActualizado = pedido.filter(producto => producto._id !== _id)
    setPedido(pedidoActualizado)
  }

  const colocarOrden = async (e) => {
    e.preventDefault()

    try {
      const data = {
        bag: pedido,
        dataBuyer: {
          ci: 'V-6285174',
          nombre,
          banco: {
            code: '0108',
            name: 'Provincial'
          },
          tlf: '04246206123',
          correo: 'john@mail.com'
        },
        amount: total,
        date: Date.now(),
        number_proof_payment: '8912721'
      }
      await axiosClient.post('/api/requests/companies/632d30f27fb46013ddce70c0', data)

      // Resetear la app
      setCategoriaActual('')
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
  }
  return (
    <QuioscoContext.Provider
      value={{
        InfoCompany,
        setCategoriaActual,
        products,
        categoriaActual,
        getProductsHome,
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
        total,
        loading
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
