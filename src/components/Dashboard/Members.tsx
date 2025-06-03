import type { ReactNode } from 'react'
import styled from 'styled-components'
import { useThemeStore } from '../../store/themeStore'
import styles from '../../style/Members.module.css'

const data = [
    {
        project: '키오스크 리디자인 키오스크 리디자인',
        process: 30,
        date: '2025.01.31',
        member: ['A', 'B', 'C', 'A', 'B', 'C', 'A', 'B', 'C'],
    },
    {
        project: '키오스크 리디자인',
        process: 70,
        date: '2025.01.31',
        member: ['A', 'B', 'C'],
    },
    {
        project: '키오스크 리디자인',
        process: 20,
        date: '2025.01.31',
        member: ['A', 'B'],
    },
    {
        project: '키오스크 리디자인 키오스크 리디자인',
        process: 30,
        date: '2025.01.31',
        member: [],
    },
    {
        project: '키오스크 리디자인',
        process: 70,
        date: '2025.01.31',
        member: ['A'],
    },
    {
        project: '키오스크 리디자인',
        process: 20,
        date: '2025.01.31',
        member: ['A', 'B', 'C'],
    },
]

type ProjectContainerProps = {
    isDark: boolean
}

const ProjectContainer = styled.div<ProjectContainerProps>`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    row-gap: 29px;
    overflow-y: auto;

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
`;

type ProjectProps = {
    project: string,
    process: number,
    date: string,
    member: string[],
    isDark: boolean,
}

const MAX_PROFILE = 4;
export function Project({project, process, date, member, isDark}:ProjectProps) {
    const memberProfile = () => {
        const element: ReactNode[] = []
        for(let i=0; i<member.length && i<MAX_PROFILE; i++){
            element.push(
                <div className={styles.profile}>
                    {/* todo : 프로필 이미지로 변경 */}
                    {member[i]}
                </div>
            )
        }
        return element
    }

    return (
        <div className={styles.project}>
            <div style={{width: '25%'}}>
                <div className={styles.projectName}>
                    {project}
                </div>
            </div>
            <div  style={{width: '26.7%'}}>
                <div className={styles.processBar} style={{backgroundColor: isDark?'#6C6C73':'#EEEEEE'}}>
                    <div style={{width: `${process}%`, height: '100%', backgroundColor: '#450923'}}/>
                </div>
            </div>
            <div className={styles.date} style={{width: '19.1%'}}>
                {date}
            </div>
            <div className={styles.memberProfile} style={{width: '28.6%'}}>
                {memberProfile()}
                {member.length > MAX_PROFILE &&
                    <div className={styles.plus}>+{member.length-MAX_PROFILE}</div>
                }
            </div>
        </div>
    )
}

export default function Members() {
    const isDark = useThemeStore((stroe) => stroe.isDark)
    return (
        <div 
            className={styles.membersContainer}
            style={isDark?{backgroundColor: '#2B2B37', color: '#FFFFFF'}:{backgroundColor: '#FFFFFF', color: '#000000'}}
        >
            <p className={styles.members} style={{color: isDark?'#FFFFFF':'#333333'}}>MEMBERS</p>
            <div className={styles.container}>
                <div className={styles.header}>
                    <p style={{width: '25%'}}>프로젝트 명</p>
                    <p style={{width: '26.7%'}}>진행율</p>
                    <p style={{width: '19.1%'}}>대드라인</p>
                    <p style={{width: '28.6%'}}>팀원</p>
                </div>
                <ProjectContainer isDark={isDark}>
                    {data.map((d, i) => (
                        <Project key={d.project+i} project={d.project} process={d.process} date={d.date} member={d.member} isDark={isDark} />
                    ))}
                </ProjectContainer>
            </div>
        </div>
    )
}