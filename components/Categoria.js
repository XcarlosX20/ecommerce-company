import Image from 'next/image'
import { useRouter } from 'next/router'
import { slug } from '../helpers'
import useQuiosco from '../hooks/useQuiosco'
const Categoria = ({ category, query }) => {
  const router = useRouter()
  const { categoriaActual, setCategoriaActual } = useQuiosco()
  // const { nombre, icono, id } = categoria;
  return (
    <button
      onClick={() => {
        router.push(`/categories/${slug(category)}`)
        setCategoriaActual(category)
      }}
      className={`${
        categoriaActual === category || query.category === category
          ? 'bg-amber-400'
          : ''
      } flex items-center gap-4 w-full border p-5 hover:bg-amber-400 text-2xl font-bold hover:cursor-pointer`}
    >
      {category}
    </button>
  )
}

export default Categoria
