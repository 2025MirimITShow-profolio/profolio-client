import { useEffect, useRef, useState } from "react"
import styles from '../style/SearchProject.module.css'
import { useThemeStore } from "../store/themeStore"

type ProjectNameProps = {
    name: string,
    idx: number,
    selectProject?: number | null,
    setSelectProject?: (idx:number) => void
}

export function ProjectName({name, idx, selectProject, setSelectProject}:ProjectNameProps) {
    const [color, setColor] = useState('')
    const isDark = useThemeStore((state) => state.isDark)
    const textRef = useRef<HTMLSpanElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)
    const [animate, setAnimate] = useState(false)

    useEffect(() => {
        const textEl = textRef.current
        const containerEl = containerRef.current
        if(textEl && containerEl){
            setAnimate(textEl.scrollWidth > containerEl.clientWidth)
        }
    }, [name])

    useEffect(() => {
        if(isDark){
            if(idx === selectProject) setColor('#000')
            else setColor('#fff')
        } else {
            if(idx === selectProject) setColor('#fff')
            else setColor('#000')
        }
    }, [selectProject, isDark])

    return (
        <div 
            className={styles.empty}
            style={{backgroundColor: idx === selectProject ? (isDark ? '#DDDDDD' : '#555555') : undefined, color: color}}
            onClick={() => setSelectProject?.(idx)}
        >
            <div
                ref={containerRef}
                className={styles.projectName}
            >
                <span 
                    ref={textRef}
                    className={styles.text} 
                    style={{animationDuration: animate?`${name.length * 0.2}s`:undefined}}
                >
                    {name}
                </span>
            </div>
        </div>
    )
}

type SearchProjectProps = {
    projects: string[],
    title?: string,
    clickedMenu?: string,
}

export default function SearchProject({projects, title, clickedMenu}:SearchProjectProps) {
    const isDark = useThemeStore((state) => state.isDark)
    const [selectProject, setSelectProject] = useState<number | null>(null)

    return (
        <div 
            className={styles.searchContainer}
            style={{backgroundColor: isDark?'#383843':'#F5F5F5', height: title===clickedMenu?'auto':'0'}}
        >
            <div className={styles.projectListContainer}>
                {projects.map((pro, i) => (
                    <ProjectName key={pro + i} name={pro} idx={i} selectProject={selectProject} setSelectProject={setSelectProject} />
                ))}
            </div>
        </div>
    )
}