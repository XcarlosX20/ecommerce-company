import { useContext } from 'react'
import TotalContext from '../context/TotalProvider'

const useTotal = () => {
  return useContext(TotalContext)
}

export default useTotal