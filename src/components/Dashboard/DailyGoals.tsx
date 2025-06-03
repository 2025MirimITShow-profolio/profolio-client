import { useState, useEffect } from 'react'
import { useThemeStore } from '../../store/themeStore'
import styles from '../../style/DailyGoals.module.css'
import styled from 'styled-components'

type GoalType = {
    date: string,
    goals: number
}

const goalData:GoalType[] = [
    { "date": "2025-05-01", "goals": 3 },
    { "date": "2025-05-02", "goals": 9 },
    { "date": "2025-05-03", "goals": 0 },
    { "date": "2025-05-04", "goals": 7 },
    { "date": "2025-05-05", "goals": 5 },
    { "date": "2025-05-06", "goals": 2 },
    { "date": "2025-05-07", "goals": 8 },
    { "date": "2025-05-08", "goals": 1 },
    { "date": "2025-05-09", "goals": 6 },
    { "date": "2025-05-10", "goals": 0 },
    { "date": "2025-05-11", "goals": 4 },
    { "date": "2025-05-12", "goals": 7 },
    { "date": "2025-05-13", "goals": 2 },
    { "date": "2025-05-14", "goals": 9 },
    { "date": "2025-05-15", "goals": 1 },
    { "date": "2025-05-16", "goals": 3 },
    { "date": "2025-05-17", "goals": 6 },
    { "date": "2025-05-18", "goals": 8 },
    { "date": "2025-05-19", "goals": 0 },
    // { "date": "2025-05-20", "goals": 10 },
    // { "date": "2025-05-21", "goals": 5 },
    // { "date": "2025-05-22", "goals": 2 },
    // { "date": "2025-05-23", "goals": 7 },
    // { "date": "2025-05-24", "goals": 1 },
    // { "date": "2025-05-25", "goals": 4 },
    // { "date": "2025-05-26", "goals": 6 },
    // { "date": "2025-05-27", "goals": 9 },
    // { "date": "2025-05-28", "goals": 2 },
    // { "date": "2025-05-29", "goals": 3 },
    // { "date": "2025-05-30", "goals": 0 },
    // { "date": "2025-05-31", "goals": 8 }
]

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
        if(goal < 1) 
            return '#F3EBFF'
        else if(goal < 4)
            return '#CFAEFE'
        else if(goal < 7)
            return '#CFAEFE'
        else
            return '#8734FD'
    }}
`

export function GoalsContainer() {
    const [goals, setGoals] = useState<GoalType[] | null>(null)
    const [rotated, setRotated] = useState<GoalType[]>([])

    useEffect(() => {
        setGoals(goalData)
    }, [])

    useEffect(() => {
        if (!goals) return
        const firstDate = new Date(goals[0].date)
        const firstDay = firstDate.getDay()
        const paddedGoals = [...goals]
        for (let i = 0; i < firstDay; i++) {
            paddedGoals.unshift({ date: '', goals: -1 })
        }
        while (paddedGoals.length < 35) {
            paddedGoals.push({ date: '', goals: -1 })
        }
        const rotatedArr = [];
        for (let i=6; i>=0; i--) {
            for (let j=i; j<= i+7*4; j+=7) {
                rotatedArr.push(paddedGoals[j])
            }
        }
        setRotated(rotatedArr)
    }, [goals])

    return (
        <div className={styles.goalsContainer} style={{color: '#000'}}>
            {rotated.map((g, i) => <Goal key={i} goal={g.goals} />)}
        </div>
    )
}

export default function DailyGoals() {
    const isDark = useThemeStore((store) => store.isDark)
    return (
        <div 
            className={styles.dailyGoalsContainer}
            style={isDark?{backgroundColor: '#2B2B37', color: '#FFFFFF'}:{backgroundColor: '#FFFFFF', color: '#333333'}}
        >
            <div className={styles.header}>Daily Goals</div>
            <div 
                className={styles.container}
                style={{color: isDark?'#777777':'#BBBBBB'}}
            >
                <div className={styles.dateContainer}>
                    {date.map((d, i) => <p key={i}>{d}</p>)}
                </div>
                <GoalsContainer />
                <div />
                <div className={styles.weekContainer}>
                    {week.map((w, i) => <p key={i}>{w}</p>)}
                </div>
            </div>
        </div>
    )
}