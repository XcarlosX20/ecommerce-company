import Layout from '../layout/Layout'
import Producto from '../components/Producto'
import useQuiosco from '../hooks/useQuiosco'
import { useEffect } from 'react'

export default function Home () {
  const { categoriaActual, products, setCategoriaActual, getProductsHome } =
    useQuiosco()
  useEffect(() => {
    setCategoriaActual('')
    getProductsHome()
  }, [])

  return (
    <Layout pagina={`Menú ${categoriaActual || ''}`}>
      <h1 className='text-4xl font-black'>Our products</h1>
      <p className='text-2xl my-10'>
        Elige y personaliza tu pedido a continuación
      </p>
      <div className='grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4'>
        {products.map((producto) => (
          <Producto key={producto._id} producto={producto} />
        ))}
      </div>
    </Layout>
  )
}
