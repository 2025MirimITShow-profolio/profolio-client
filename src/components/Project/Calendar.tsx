import { useState } from "react";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";
import styles from "../../style/Calendar.module.css"
import { useThemeStore } from "../../store/themeStore";

export default function Calendar({ onDateClick }: { onDateClick: (date: Date) => void }) {
  const isDark = useThemeStore((store) => store.isDark)

  const weeks = ["월", "화", "수", "목", "금", "토", "일"];
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDayOfMonth = new Date(year, month, 1);
  const startDay = new Date(firstDayOfMonth);
  startDay.setDate(1-((firstDayOfMonth.getDay()+6)%7));

  const lastDayOfMonth = new Date(year, month +1, 0);
  const endDay = new Date(lastDayOfMonth);
  const lastDayWeekIndex = (lastDayOfMonth.getDay() + 6) % 7;
  const remainingDays = 6 - lastDayWeekIndex;
  endDay.setDate(lastDayOfMonth.getDate() + remainingDays);

  const groupDatesByWeek = (startDay: Date, endDay: Date) => {
    const weeks = [];
    let currentWeek = [];
    let current = new Date(startDay);
  
    while (current <= endDay) {
      currentWeek.push(new Date(current));
      
      if (currentWeek.length === 7) {
        weeks.push(currentWeek);
        currentWeek = [];
      }
      current.setDate(current.getDate() + 1);
    
}
    return weeks;
};

  const calendarDates = groupDatesByWeek(startDay, endDay);

  console.log(calendarDates);
  const handlePrevMonth = () => {
    const prevMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
    setCurrentDate(prevMonth);
    setSelectedDate(prevMonth);
    onDateClick(prevMonth);
  };
  
  const handleNextMonth = () => {
    const nextMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
    setCurrentDate(nextMonth);
    setSelectedDate(nextMonth);
    onDateClick(nextMonth);
  };

  const handleDateClick = (date: Date) => {
    if (date.getMonth() !== month) return;
    setSelectedDate(date);
    onDateClick(date);
  }

  return (
    <div className={styles.container}
      style={{
        backgroundColor: isDark? '#383843' : 'white',
        border: isDark? 'solid 1px #555555':'solid 1px #EEEEEE'
      }}>
      <div style={{display: 'flex', alignItems: 'center'}}>
        <button onClick={handlePrevMonth}><GoChevronLeft size={24} color={isDark?"#999999":'black'}/></button>
        <span style={{fontWeight: "600", fontSize: "28px", margin: "0 13px", color: isDark? 'white':'black'}}>{year}.{String(month + 1).padStart(2, "0")}</span>
        <button onClick={handleNextMonth}><GoChevronRight size={24} color={isDark?"#999999":'black'}/></button>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", marginTop: "54px", fontWeight: "500" }}>
        {weeks.map((day, i) => (
          <div key={i}
            style={{
              marginBottom: "26px",
              fontSize: "22px",
              color: i === 5 ? "#2f85f4" : i === 6 ? "#f85858" : isDark? '#BBBBBB':"black"
            }}>
              {day}
          </div>
        ))}
        {calendarDates?.flat().map((date, idx) => {
          const isCurrentMonth = date.getMonth() === month;
          const isSunday = date.getDay() === 0;
          const isSelected = date.toDateString() === selectedDate.toDateString();

          return (
            <div
              key={idx}
              onClick={()=> handleDateClick(date)}
              style={{
                color: isSelected?
                  'white'
                  :isSunday?
                  "#ff3232"
                  : isDark?
                  isCurrentMonth?
                  'white'
                  : 'rgba(255,255,255,0.3)'
                  : isCurrentMonth?
                  'black'
                  :"rgba(0,0,0,0.3)",
                backgroundColor: isSelected? "#8734fd" : ''
              }}
              className={styles.date}
            >
              {date.getDate()}
            </div>
          );
        })}
      </div>
    </div>
  );
}