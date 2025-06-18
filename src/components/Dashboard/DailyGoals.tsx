import { useState, useEffect } from 'react'
import { useThemeStore } from '../../store/themeStore'
import styles from '../../style/DailyGoals.module.css'
import styled from 'styled-components'
import axios from 'axios'
import { useUserStore } from '../../store/userStore'

type GoalType = {
    date: string,
    task_count: number
}

const date = [
    'Sun', 'Sat', 'Fri', 'Thu', 'Wed', 'Tue', 'Mon'
]
const week = [
    '1st', '2nd', '3rd', '4th', '5th'
]

type GoalProps = {
    goal: number
}

const Goal = styled.div<GoalProps>`
    width: 100%;
    height: 100%;
    border-radius: 5px;
    background-color: ${({goal}) => {
        if(goal === -1)
            return '#ECEDED'
        if(goal < 2) 
            return '#F3EBFF'
        else if(goal < 4)
            return '#CFAEFE'
        else if(goal < 6)
            return '#CFAEFE'
        else
            return '#8734FD'
    }}
`

type GoalsContainerProps = DailyGoalsType & {
  currentDate: Date;
}

export function GoalsContainer({currentDate, updateState}: GoalsContainerProps) {
    const token = useUserStore((store) => store.token)
    const [goals, setGoals] = useState<GoalType[] | null>(null)
    const [rotated, setRotated] = useState<GoalType[]>([])

    useEffect(() => {
        if (goals===null) return
        const firstDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)

        const rawDate = goals[0]?.date
        const formattedDate = rawDate ? `${rawDate.slice(0, 4)}-${rawDate.slice(4, 6)}-${rawDate.slice(6, 8)}` : ''
        const firstTask = formattedDate ? new Date(formattedDate).getDate() - 1 : 0

        const firstDay = firstDate.getDay()
        const paddedGoals = [...goals]
        for (let i = 0; i < firstDay+firstTask; i++) {
            paddedGoals.unshift({ date: '', task_count: -1 })
        }
        while (paddedGoals.length < 35) {
            paddedGoals.push({ date: '', task_count: -1 })
        }
        const rotatedArr = [];
        for (let i=6; i>=0; i--) {
            for (let j=i; j<= i+7*4; j+=7) {
                rotatedArr.push(paddedGoals[j])
            }
        }
        setRotated(rotatedArr)
    }, [goals])

    const getDailyTask = async() => {
        try {
            // console.log(token);
            const res = await axios.get(`http://localhost:3000/api/daily-tasks?date=${currentDate.getFullYear()}${String(currentDate.getMonth() + 1).padStart(2, '0')}`, {
                headers : {
                    Authorization: `Bearer ${token}`
                }
            })
            let data = res.data
            if (data.length < 35) {
                const diff = 35 - data.length
                data = data.concat(Array(diff).fill({date: '', task_count: -1}))
            }
            setGoals(data)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getDailyTask()
        // alert(currentDate);
    }, [currentDate, updateState])

    return (
        <div className={styles.goalsContainer} style={{color: '#000'}}>
            {rotated.map((g, i) => <Goal key={i} goal={g.task_count} />)}
        </div>
    )
}

type DailyGoalsType = {
    updateState: number
}

export default function DailyGoals({updateState}:DailyGoalsType) {
    const isDark = useThemeStore((store) => store.isDark)
    const [currentDate, setCurrentDate] = useState<Date>(new Date())

    const preMonth = () => {
        const newDate = new Date(currentDate);
        newDate.setMonth(newDate.getMonth() - 1);
        setCurrentDate(newDate);
    }
    const nextMonth = () => {
        const newDate = new Date(currentDate);
        newDate.setMonth(newDate.getMonth() + 1);
        setCurrentDate(newDate);
    }

    return (
        <div 
            className={styles.dailyGoalsContainer}
            style={isDark?{backgroundColor: '#2B2B37', color: '#FFFFFF'}:{backgroundColor: '#FFFFFF', color: '#333333'}}
        >
            <div className={styles.header}>
                Daily Goals
                <div className={styles.btnContainer}>
                    {/* <img
                        src='/images/downBtn.svg'
                        alt='이전달'
                        style={{transform: 'rotate(90deg)', cursor: 'pointer'}}
                        onClick={preMonth}
                    />
                    <img
                        src='/images/downBtn.svg'
                        alt='다음달'
                        style={{transform: 'rotate(-90deg)', cursor: 'pointer'}}
                        onClick={nextMonth}
                    /> */}
                </div>
            </div>
            <div 
                className={styles.container}
                style={{color: isDark?'#777777':'#BBBBBB'}}
            >
                <div className={styles.dateContainer}>
                    {date.map((d, i) => <p key={i}>{d}</p>)}
                </div>
                <GoalsContainer currentDate={currentDate} updateState={updateState}/>
                <div />
                <div className={styles.weekContainer}>
                    {week.map((w, i) => <p key={i}>{w}</p>)}
                </div>
            </div>
        </div>
    )
}