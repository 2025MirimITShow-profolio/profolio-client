import { useEffect, useState } from "react";
import { useThemeStore } from "../../store/themeStore";
import styles from '../../style/ProjectTimeline.module.css'
import styled from "styled-components";
import { motion } from "framer-motion";
import ModalPortal from "../ModalPortal";
import AddTimeline from "./AddTimeline";
import axios from "axios";
import { useUserStore } from "../../store/userStore";

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

// const data = [
//     { project: "Alpha", start_date: "25-06-15", end_date: "25-06-20" },
//     { project: "Beta", start_date: "25-06-28", end_date: "25-06-30" },
//     { project: "Gamma", start_date: "25-06-10", end_date: "25-07-01" },
//     { project: "Gamma", start_date: "25-06-01", end_date: "25-06-30" },
//     { project: "Gamma", start_date: "25-06-01", end_date: "25-06-05" },
//     { project: "Gamma", start_date: "25-06-02", end_date: "25-06-08" },
//     { project: "Gamma", start_date: "25-06-02", end_date: "25-06-09" },
//     { project: "Gamma", start_date: "25-06-03", end_date: "25-06-30" },
//     { project: "Gamma", start_date: "25-06-02", end_date: "25-06-30" },
//     { project: "Gamma", start_date: "25-05-01", end_date: "25-06-30" },
// ];

// const parsedData = data.map(item => {
//     const parseDate = (str:string) => {
//         const [yy, mm, dd] = str.split('-').map(Number);
//         const fullYear = 2000 + yy; // "25" → 2025
//         return new Date(fullYear, mm - 1, dd); // 월은 0부터 시작
//     };

//     return {
//         ...item,
//         start_date: parseDate(item.start_date),
//         end_date: parseDate(item.end_date)
//     };
// });;

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
    color: ${({isDark}) => isDark?'#777777':'#BBBBBB'};
    font-weight: 500;
    font-size: 18px;
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
    start.setHours(0, 0, 0, 0)
    end.setHours(0, 0, 0, 0)
    const daysWidth = (end.getTime() - start.getTime()) / msPerDay
    const daysLeft = (start.getTime() - startDay[timeUnit].getTime()) / msPerDay
    const widthBool = (end>endDay[timeUnit])
    const leftBool = (start<startDay[timeUnit])
    const containerWidth = widthBool ? 100 : (daysWidth+1) * percent[timeUnit]
    const containerLeft = leftBool ? 0 : daysLeft * percent[timeUnit]
    const [isHovering, setIsHovering] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent) => {
        setPosition({ x: e.clientX, y: e.clientY });
    };

    return (
        (name !== '')?
        <div
            className={styles.timeLine}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            onMouseMove={handleMouseMove}
            style={{
                width: `${containerWidth}%`,
                left: `${containerLeft}%`,
            }}
        >
            <div className={styles.bar} />
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
        : <div className={styles.timeLine}/>
    )
}

type Project = {
    start_date: Date,
    end_date: Date,
    title: string
}

export default function ProjectTimeline() {
    const token = useUserStore((store) => store.token)
    const isDark = useThemeStore((store) => store.isDark)
    const [timeUnit, setTimeUnit] = useState(0)
    const [allProjects, setAllProjects] = useState<Project[]>([])
    const [projects, setProjects] = useState<Project[]>([])
    const [add, setAdd] = useState(false)

    const getAll = async() => {
        try {
            const res = await axios.get('http://localhost:3000/api/projects/timeline', {
                headers : {
                    Authorization: `Bearer ${token}`
                }
            })
            const data = res.data
            console.log(data)
            setAllProjects(data)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getAll()
    }, [])

    function isDateInRange(date:Date) {
        date.setHours(0, 0, 0, 0)
        console.log(date);
        console.log(date >= startDay[timeUnit]);
        console.log(date <= endDay[timeUnit]);
        return date >= startDay[timeUnit] && date <= endDay[timeUnit];
    }

    useEffect(() => {
        const projectsArr = []
        for(let i=0; i<allProjects.length; i++){
            if(isDateInRange(new Date(allProjects[i].start_date)) || isDateInRange(new Date(allProjects[i].end_date)))
                projectsArr.push(allProjects[i])
        }

        while(projectsArr.length < 4) {
            projectsArr.push({
                title: '',
                start_date: new Date(),
                end_date: new Date()
            });
        }

        setProjects(projectsArr);
    }, [timeUnit, allProjects]);

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
                            style={{color: timeUnit===i?isDark?'#FFF':'#000':'#999', cursor: 'pointer'}}
                            onClick={() => setTimeUnit(i)}
                        >
                            {t}
                        </span>

                    ))}
                    <span style={{marginLeft: '15px'}} onClick={() => setAdd(true)}>
                        <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 9.5H17.5" stroke={isDark?'#BBBBBB':'#777777'} strokeWidth="1.5"/>
                            <path d="M8.75 0.75L8.75 18.25" stroke={isDark?'#BBBBBB':'#777777'} strokeWidth="1.5"/>
                        </svg>
                    </span>
                </div>
            </div>

            <div className={styles.projectContainer}>
                <ProcessContainer isDark={isDark}>
                    {projects.map((project, i) =>  (
                        <Line key={i} isDark={isDark}>
                            <Project name={project.title} start={new Date(project.start_date)} end={new Date(project.end_date)} timeUnit={timeUnit} />
                        </Line>
                    ))}
                </ProcessContainer>  

                <UnitBox isDark={isDark}>
                    {unit[timeUnit].map((u, i) => <span key={i}>{u}</span>)}
                </UnitBox>
            </div>
            {add &&
                <ModalPortal><AddTimeline setAllProjects={setAllProjects} setAdd={setAdd} /></ModalPortal>
            }
        </div>
    )
}