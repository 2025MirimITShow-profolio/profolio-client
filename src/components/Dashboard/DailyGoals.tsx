import { useState, useEffect } from 'react'
import { useThemeStore } from '../../store/themeStore'
import styles from '../../style/DailyGoals.module.css'
import styled from 'styled-components'
import axios from 'axios'
import { useUserStore } from '../../store/userStore'

type GoalType = {
    date: string,
    goals: number
}

const goalData:GoalType[] = [
    { "date": "2025-05-01", "goals": 3 }
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
    const token = useUserStore((store) => store.token)
    const [goals, setGoals] = useState<GoalType[] | null>(null)
    const [rotated, setRotated] = useState<GoalType[]>([])

    useEffect(() => {
        if (!goals) return
        const firstDate = new Date()
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

    const getDailyTask = async() => {
        try {
            // console.log(token);
            const res = await axios.get('http://localhost:3000/api/daily-tasks', {
                headers : {
                    Authorization: `Bearer ${token}`
                }
            })
            let data = res.data
            if (data.length < 35) {
                const diff = 35 - data.length
                data = data.concat(Array(diff).fill({date: '', goals: -1}))
            }
            setGoals(data)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getDailyTask()
    }, [token])

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