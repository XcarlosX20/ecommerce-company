import moment from 'moment'
import { useContext, useEffect, useState } from 'react'
import QuioscoContext from '../context/QuioscoProvider'

const useSchedule = () => {
  const [companyOpen, setCompanyOpen] = useState('')
  const {
    InfoCompany: { companyName, workdays, workTime }
  } = useContext(QuioscoContext)

  const checkSchedule = (workdays, workTime) => {
    const date = new Date()
    const hoy = new Date(Date.now())
    const dayToday = moment().format('dddd')
    if (workdays.indexOf(dayToday) >= 0) {
      setCompanyOpen('open')
    } else {
      setCompanyOpen('closed')
    }
  }
  useEffect(() => {
    if (workdays) {
      checkSchedule(workdays, workTime)
    }
  }, [workdays, workTime])
  return { companyOpen }
}
export default useSchedule
