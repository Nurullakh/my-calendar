import { useMemo } from "react"
import moment from "moment";
import Style from './Header.module.scss'

const Header = ({currentMonth, locale, change}) => {
  const title = useMemo(() => {
    if (moment().format("YYYY") === currentMonth.format("YYYY")) {
      return currentMonth.locale(locale).format("MMMM");
    }
    return currentMonth.locale(locale).format("MMMM YYYY");
  }, [currentMonth, locale])

  function prev() {
    let newMonth = moment(currentMonth)
      .subtract(1, "months")
      .startOf("month");
    change(newMonth)
  }

  function next() {
    let newMonth = moment(currentMonth)
      .add(1, "months")
      .startOf("month");
    change(newMonth)
  }

  return (
    <div className={Style.header}>
      <div className={Style.prev} onClick={prev} />
      <div className={Style.title}>{title}</div>
      <div className={Style.next} onClick={next} />
    </div>
  )
}

export default Header