import Image from 'next/image'
import Link from 'next/link'
import useQuiosco from '../hooks/useQuiosco'
import Categoria from './Categoria'
const Sidebar = () => {
  const { InfoCompany, setCategoriaActual } = useQuiosco()
  return (
    <>
      <div>
        <Link href='/'>
          <Image
            onClick={() => setCategoriaActual('')}
            width={300}
            height={100}
            src='/assets/img/logo.svg'
            alt='imagen logotipo'
          />
        </Link>
      </div>
      <nav className='mt-10'>
        {InfoCompany?.categories?.map((category) => (
          <Categoria key={category} category={category} />
        ))}
      </nav>
    </>
  )
}

export default Sidebar
