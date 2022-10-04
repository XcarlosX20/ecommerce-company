import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import Producto from '../../components/Producto'
import useQuiosco from '../../hooks/useQuiosco'
import Layout from '../../layout/Layout'
const CategoryProducts = () => {
  const { query } = useRouter()
  const { categoriaActual, products, setCategoriaActual, loading } =
    useQuiosco()
  useEffect(() => {
    setCategoriaActual(query.category)
  }, [categoriaActual, query])

  return (
    <Layout pagina={`Menú ${categoriaActual || ''}`}>
      <h1 className='text-4xl font-black'>
        {query.category && `Products of ${query.category}`}
      </h1>
      <p className='text-2xl my-10'>
        Elige y personaliza tu pedido a continuación
      </p>
      {loading
        ? (
            'loading'
          )
        : (
          <div className='grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4'>
            {products.map((producto) => (
              <Producto key={producto._id} producto={producto} />
            ))}
          </div>
          )}
    </Layout>
  )
}

export default CategoryProducts
