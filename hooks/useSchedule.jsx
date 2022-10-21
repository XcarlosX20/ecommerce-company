import moment from 'moment'
import { useContext, useEffect, useState } from 'react'
import QuioscoContext from '../context/QuioscoProvider'

const useSchedule = () => {
  const [companyOpen, setCompanyOpen] = useState('')
  const {
    InfoCompany: { workdays, workTime }
  } = useContext(QuioscoContext)

  const checkSchedule = (workdays, workTime) => {
    const dayToday = moment().format('dddd')
    const getCurrentHour = moment().hour('HH:mm')
    const startDate = moment(workTime[0], 'HH:mm')
    const endDate = moment(workTime[1], 'HH:mm')
    const checkHours = moment(getCurrentHour).isBetween(startDate, endDate)
    if (workdays.indexOf(dayToday) >= 0 && checkHours) {
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
