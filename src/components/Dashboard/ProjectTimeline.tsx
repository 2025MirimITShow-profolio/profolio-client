import { useEffect, useState } from "react";
import { useThemeStore } from "../../store/themeStore";
import styles from '../../style/ProjectTimeline.module.css'
import styled from "styled-components";
import { motion } from "framer-motion";

const time = ['Year', 'Month', 'Week']
const year = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']
const month = [1, 5, 10, 15, 20, 25]
const week = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const unit = [year, month, week]

const today = new Date();
const day = today.getDay();
const diffToMon = day === 0 ? -6 : 1 - day;
const diffToSun = day === 0 ? 0 : 7 - day;
const startDay = [
    new Date(today.getFullYear(), 0, 1), 
    new Date(today.getFullYear(), today.getMonth(), 1),
    new Date(today.getFullYear(), today.getMonth(), today.getDate()+diffToMon)
]
const endDay = [
    new Date(today.getFullYear(), 11, 31),
    new Date(today.getFullYear(), today.getMonth()+1, 0),
    new Date(today.getFullYear(), today.getMonth(), today.getDate()+diffToSun)
]
for(let i=0; i<3; i++){
    console.log(startDay[i], endDay[i]);
}
const percent= [
    0.274,
    100/endDay[1].getDate(),
    14.28
]
month.push(endDay[1].getDate())
const msPerDay = 1000 * 60 * 60 * 24;

const data = [
    { project: "Alpha", startDate: "25-06-15", endDate: "25-06-20" },
    { project: "Beta", startDate: "25-06-28", endDate: "25-06-30" },
    { project: "Gamma", startDate: "25-06-10", endDate: "25-07-01" },
    { project: "Gamma", startDate: "25-06-01", endDate: "25-06-30" },
    { project: "Gamma", startDate: "25-06-01", endDate: "25-06-05" },
    { project: "Gamma", startDate: "25-06-02", endDate: "25-06-08" },
    { project: "Gamma", startDate: "25-06-02", endDate: "25-06-09" },
    { project: "Gamma", startDate: "25-06-03", endDate: "25-06-30" },
    { project: "Gamma", startDate: "25-06-02", endDate: "25-06-30" },
    { project: "Gamma", startDate: "25-05-01", endDate: "25-06-30" },
];

const parsedData = data.map(item => {
    const parseDate = (str:string) => {
        const [yy, mm, dd] = str.split('-').map(Number);
        const fullYear = 2000 + yy; // "25" → 2025
        return new Date(fullYear, mm - 1, dd); // 월은 0부터 시작
    };

    return {
        ...item,
        startDate: parseDate(item.startDate),
        endDate: parseDate(item.endDate)
    };
});;

type IsDarkProps = {
    isDark: boolean
}

const ProcessContainer = styled.div<IsDarkProps>`
    width: 100%;
    height: calc(100% - 54px);
    max-height: calc(100% - 54px);
    display: flex;
    flex-direction: column;
    row-gap: 1px;
    padding: 21px 0 11px;
    row-gap: 1px;
    overflow: auto;

    &::-webkit-scrollbar {
        width: 5px;
        height: 0;
    }

    &::-webkit-scrollbar-track {
        background: ${({isDark}) => isDark?'#383843':'#EEEEEE'};
        border-radius: 5px;
    }

    &::-webkit-scrollbar-thumb {
        background: ${({isDark}) => isDark?'#6C6C73':'#CCCCCC'};
        border-radius: 5px;
    }
`

const UnitBox = styled.div<IsDarkProps>`
    width: calc(100% - 33px);
    min-height: 21px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin-top: 33px;
    overflow: hidden;
    color: ${({isDark}) => isDark?'#777777':'#BBBBBB'}
`

const Line = styled.div<IsDarkProps>`
    width: calc(100% - 33px);
    border-bottom: 1px solid ${({isDark}) => isDark?'#383843':'#EEEEEE'};
    min-height: 60px;
    position: relative;
    display: flex;
    align-items: center;
    overflow: hidden;

    &:first-child {
        border-top: 1px solid ${({isDark}) => isDark?'#383843':'#EEEEEE'};
    }
`

type ProjectProps = {
    name: string,
    start: Date,
    end: Date,
    timeUnit: number
}
export function Project({name, start, end, timeUnit}: ProjectProps) {
    const daysWidth = (end.getTime() - start.getTime()) / msPerDay
    const daysLeft = (start.getTime() - startDay[timeUnit].getTime()) / msPerDay
    const containerWidth = (end>endDay[timeUnit])? 101 : (daysWidth+1) * percent[timeUnit]
    const containerLeft = (start<startDay[timeUnit])? -1 : daysLeft * percent[timeUnit]
    const [isHovering, setIsHovering] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent) => {
        setPosition({ x: e.clientX, y: e.clientY });
    };

    return (
        <div
            className={styles.timeLine}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            onMouseMove={handleMouseMove}
            style={{
                width: `${containerWidth}%`,
                left: `${containerLeft}%`,
                ...(containerLeft != -1 ? {
                    borderTopLeftRadius: '5px',
                    borderBottomLeftRadius: '5px',
                } : {
                    left: '0px'
                }),
                ...(containerWidth != 101 ? {
                    borderTopRightRadius: '5px',
                    borderBottomRightRadius: '5px',
                } : {})
            }}
        >
            {containerLeft != -1 ? <div className={styles.bar} /> : <></>}
            <p className={styles.name}>{name}</p>
            {isHovering && (
                <motion.div
                    className={styles.floatingBox}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ type: "tween", duration: 0.15 }}
                    style={{
                        top: position.y - 30,
                        left: position.x
                    }}
                >
                    {name}
                </motion.div>
            )}
        </div>
    )
}

type Project = {
    startDate: Date,
    endDate: Date,
    project: string
}

export default function ProjectTimeline() {
    const isDark = useThemeStore((store) => store.isDark)
    const [timeUnit, setTimeUnit] = useState(0)
    const [projects, setProjects] = useState<Project[]>([])

    useEffect(() => {
        let projectsArr = []
        for(let i=0; i<parsedData.length; i++) {
            if(!(parsedData[i].startDate > endDay[timeUnit] || parsedData[i].endDate < startDay[timeUnit])){
                projectsArr.push(parsedData[i])
            }
        }
        setProjects(projectsArr)
    }, [timeUnit])

    return (
        <div 
            className={styles.projectTimelineContainer}
            style={isDark?{backgroundColor: '#2B2B37', color: '#FFFFFF'}:{backgroundColor: '#FFFFFF', color: '#000000'}}
        >
            <div className={styles.header}>
                <p className={styles.title}>PROJECT TIMELINE</p>
                <div className={styles.unitContainer}>
                    {time.map((t, i) => (
                        <span
                            style={timeUnit===i?{color: isDark?'#FFF':'#000'}:{color: '#999999'}}
                            onClick={() => setTimeUnit(i)}
                        >
                            {t}
                        </span>

                    ))}
                    <span style={{marginLeft: '15px'}}>
                        <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 9.5H17.5" stroke={isDark?'#BBBBBB':'#777777'} stroke-width="1.5"/>
                            <path d="M8.75 0.75L8.75 18.25" stroke={isDark?'#BBBBBB':'#777777'} stroke-width="1.5"/>
                        </svg>
                    </span>
                </div>
            </div>

            <div className={styles.projectContainer}>
                <ProcessContainer isDark={isDark}>
                    {projects.map((project, i) =>  (
                        <Line isDark={isDark}>
                            <Project name={project.project} start={project.startDate} end={project.endDate} timeUnit={timeUnit} />
                        </Line>
                    ))}
                </ProcessContainer>  

                <UnitBox isDark={isDark}>
                    {unit[timeUnit].map((u, i) => <span key={i}>{u}</span>)}
                </UnitBox>
            </div>
        </div>
    )
}