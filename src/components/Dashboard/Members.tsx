import { useEffect, useState, type ReactNode } from 'react'
import styled from 'styled-components'
import { useThemeStore } from '../../store/themeStore'
import styles from '../../style/Members.module.css'
import axios from 'axios'
import { useUserStore } from '../../store/userStore'

type dataType = {
    title: string,
    process: number,
    end_date: string,
    team_members: string,
    color: string
}

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

type ProjectType = {
    project: string,
    process: number,
    color: string,
    date: string,
    allMember: string,
    isDark: boolean,
    myProfile: string
}

const MAX_PROFILE = 4;
export function Project({project, process, color, date, allMember, isDark, myProfile}:ProjectType) {
    console.log(allMember)
    const member = (allMember==null||allMember.length === 0)? [] :allMember.split(',');

    console.log('myprofile : ', myProfile)
    console.log('member : ', member);
    const memberProfile = () => {
        const element: ReactNode[] = []
        element.push(
            <div className={styles.profile}>
                {/* 내 프로필 */}
                <img 
                    src={`/images/profile/profile${myProfile}.png`}
                    alt='내 프로필'
                />
            </div>
        )
        for(let i=0; i<member.length && i<MAX_PROFILE; i++){
            element.push(
                <div className={styles.profile}>
                    {/* todo : 프로필 이미지로 변경 */}
                    <img 
                        src={`/images/profile/profile${Math.floor(Math.random() * 13) + 1}.png`}
                        alt='프로필'
                    />
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
                    <div style={{width: `${Math.floor(Math.random() * 100)}%`, height: '100%', backgroundColor: `${color}`}}/>
                </div>
            </div>
            <div className={styles.date} style={{width: '19.1%'}}>
                {!date || date.split('T')[0].replace(/-/g, '.')}
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
    const token = useUserStore((store) => store.token)
    const isDark = useThemeStore((stroe) => stroe.isDark)
    const [data, setData] = useState<dataType[]>([])	
    const [profileImg, setProfileImg] = useState("");


    const getUser = async () => {
		try {
			const res = await axios.get(
				`${import.meta.env.VITE_BASE_URL}/users`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			setProfileImg(res.data.profile_image)
		} catch (error) {
			console.log(error);
		}
	};

    const getProject = async() => {
        try {
            const res = await axios.get('http://localhost:3000/api/projects', {
                headers : {
                    Authorization: `Bearer ${token}`
                }
            })
            setData(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getProject()
        getUser()
    }, [])

    return (
        <div 
            className={styles.membersContainer}
            style={isDark?{backgroundColor: '#2B2B37', color: '#FFFFFF'}:{backgroundColor: '#FFFFFF', color: '#000000'}}
        >
            <p className={styles.members} style={{color: isDark?'#FFFFFF':'#333333'}}>MEMBERS</p>
            <div className={styles.container}>
                <div className={styles.header}>
                    <p style={{width: '25%'}}>프로젝트 명</p>
                    <p style={{width: '26.3%'}}>진행율</p>
                    <p style={{width: '19.5%'}}>대드라인</p>
                    <p style={{width: '28.6%'}}>팀원</p>
                </div>
                <ProjectContainer isDark={isDark}>
                    {data.length>0 && data.map((d, i) => (
                        <Project key={d.title+i} project={d.title} process={d.process} color={d.color} date={d.end_date} allMember={d.team_members} isDark={isDark} myProfile={profileImg}/>
                    ))}
                </ProjectContainer>
            </div>
        </div>
    )
}