import { useState } from 'react'
import { useThemeStore } from '../../store/themeStore'
import styles from '../../style/Tasks.module.css'

const task = [
    '포트폴리오 만들기 포트폴리오 만들기 포트폴리오 만들기 포트폴리오 만들기 포트폴리오 만들기 포트폴리오 만들기 포트폴리오 만들기 포트폴리오 만들기',
    '피그마 만들기',
    '코드 고치기',
    '레이아웃 생각하기',
    '포트폴리오 만들기 포트폴리오 만들기 포트폴리오 만들기 포트폴리오 만들기 포트폴리오 만들기 포트폴리오 만들기 포트폴리오 만들기 포트폴리오 만들기',
    '피그마 만들기',
    '코드 고치기',
    '레이아웃 생각하기',
    '포트폴리오 만들기 포트폴리오 만들기 포트폴리오 만들기 포트폴리오 만들기 포트폴리오 만들기 포트폴리오 만들기 포트폴리오 만들기 포트폴리오 만들기',
    '피그마 만들기',
    '코드 고치기',
    '레이아웃 생각하기',
]

type TaskProps = {
    task: string,
    isDark: boolean
}

export function Task({task, isDark}:TaskProps) {
    const [done, setDone] = useState(false)
    return (
        <div className={styles.task}>
            <div 
                className={styles.doneBtn}
                style={{backgroundColor: done?'#8734FD':isDark?'#41414E':'#EEEEEE'}}
                onClick={() => setDone(pre => !pre)}
            >
                {done && 
                    <svg width="16" height="13" viewBox="0 0 16 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 6.26316L5.5 11L15 1" stroke="white" stroke-width="2.5"/>
                    </svg>
                }
            </div>
            <div className={styles.text} style={done?{textDecoration: 'line-through'}:{}}>
                {task}
            </div>
        </div>
    )
}

export default function Tasks() {
    const isDark = useThemeStore((store) => store.isDark)

    return (
        <div
            className={styles.taskContainer}
            style={isDark?{backgroundColor: '#2B2B37', color: '#FFFFFF'}:{backgroundColor: '#FFFFFF', color: '#000000'}}
        >
            <div className={styles.header}>
                <p style={{fontSize: '25px'}}>Tasks</p>
                <img 
                    src='/images/showMore.svg'
                    alt='더보기'
                />
            </div>
            <div className={styles.taskList}>
                {task.map((t, i) => <Task key={i} task={t} isDark={isDark} />)}
            </div>
        </div>
    )
}