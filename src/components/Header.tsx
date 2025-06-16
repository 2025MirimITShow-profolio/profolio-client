import { useThemeStore } from '../store/themeStore'
import styled from 'styled-components'
import styles from '../style/Header.module.css'
import { useEffect, useRef, useState } from 'react'
import { disassemble } from "es-hangul"
import ProfileInfo from './Dashboard/ProfileInfo'
import ModalPortal from './ModalPortal'
import ProfileEdit from './Dashboard/ProfileEdit'
import { useUserStore } from '../store/userStore'
import axios from 'axios'

const projects = [
    '키오스크 리디자인키오스크 리디자인키오스크 리디자인 키오스크 리디자인키오스크 리디자인키오스크 리디자인',
    '투두리스트',
    '프로폴리오',
    '투두리스트',
    '프로폴리오',
    '키오스크 리디자인',
    '투두리스트',
    '프로폴리오',
    '투두리스트',
    '프로폴리오',
]

type ProfileProps = {
    isDark: boolean
}

const Profile = styled.div<ProfileProps>`
    background-color: transparent;
    width: 118px;
    height: 66px;
    border-radius: 100px;
    display: flex;
    align-items: center;
    column-gap: 19px;
    position: absolute;
    right: 2.9%;
    &:hover {
        background-color: ${({isDark}) => isDark?'#2B2B37':'#F5F6F8'} !important;
    }
`

export default function Header() {
    const isDark = useThemeStore((store) => store.isDark)
    const token = useUserStore((store) => store.token)
    const [search, setSearch] = useState('')
    const [project, setProject] = useState(projects)
    const [click, setClick] = useState(false)
    const [showInfo, setShowInfo] = useState(false)
    const [showEdit, setShowEdit] = useState(false)
    const [name, setName] = useState('')
    const [job, setJob] = useState('')
    const [birth, setBirth] = useState('')
    const [email, setEmail] = useState('')
    const [profileImg, setProfileImg] = useState('')
    const searchRef = useRef<HTMLInputElement>(null)
    const profileRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if(!search.trim()){
            setProject(projects)
        } else {
            setProject(projects.filter((pro) => disassemble(pro).includes(disassemble(search.trim()))))
        }
    }, [search])

    useEffect(() => {
        function clickOutside(e:MouseEvent) {
            if(searchRef.current && !searchRef.current.contains(e.target as Node)){
                setClick(false)
            }
            if(profileRef.current && !profileRef.current.contains(e.target as Node)){
                setShowInfo(false)
            }
        }
        document.addEventListener('mousedown', clickOutside)
        return () => {
            document.removeEventListener('mousedown', clickOutside)
        }
    }, [])

    const getUser = async() => {
        try {
            const res = await axios.get('http://localhost:3000/api/users', {
                headers : {
                    Authorization: `Bearer ${token}`
                }
            })
            const data = res.data
            // console.log(data);
            setName(data.name)
            setJob(data.job)
            setBirth((data.birth_date).split('T')[0].replace(/-/g, '.'))
            setEmail(data.email)
            setProfileImg(data.profile_image)
        } catch (error) {
            console.log(error);
        }
    }

    const patchUser = async() => {
        try {
            const res = await axios.patch('http://localhost:3000/api/users', 
                {
                    name,
                    job
                },
                {
                    headers : {
                        Authorization: `Bearer ${token}`
                }
            })
            const data = res.data
            // console.log(data);
            setName(data.name)
            setJob(data.job)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getUser()
    }, [])

    useEffect(() => {
        if(name==='' || job==='') return
        patchUser()
    }, [showEdit])

    return (
        <div 
            className={styles.headerContainer} 
            style={{backgroundColor: isDark?'#22222E':'rgba(255, 255, 255, 50%)'}}
        >
            <div 
                className={styles.searchContainer} 
                style={{backgroundColor: isDark?'#2B2B37':'#F5F6F8'}} 
                onClick={() => setClick(true)}
            >
                <div 
                    className={styles.searchBox}
                    >
                    <img 
                        src='/images/searchIcon.svg' 
                        alt="검색" 
                        className={styles.searchImg}
                        />
                    <input 
                        ref={searchRef} 
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        placeholder='Searching Project'
                        className={styles.searchInput}
                    />
                </div>
                {click && 
                    <div className={styles.projectContainer} style={{backgroundColor: isDark?'#41414E':'#fff'}}>
                        {project.length>0
                            ?(project.map((project, i) => <p key={i} style={{color: isDark?'#fff':'#111111'}}>{project}</p>))
                            :<p style={{color: isDark?'#8C8C96':'#888888'}}>프로젝트가 존재하지 않습니다.</p>
                        }
                    </div>
                }
            </div>
            <Profile 
                isDark={isDark} 
                ref={profileRef}
                onClick={() => setShowInfo(true)}
            >
                <img 
                    src={`/images/profile/profile${profileImg}.png`}
                    alt='프로필 이미지'
                    className={styles.profileImg}
                />
                <img 
                    src='/images/downBtn.svg'
                    alt='더보기'
                    className={styles.moreBtn}
                />
                {showInfo && <ProfileInfo name={name} job={job} birth={birth} email={email} profileImg={profileImg} setShowInfo={setShowInfo} setShowEdit={setShowEdit} />}
            </Profile>
            {showEdit &&
                <ModalPortal><ProfileEdit name={name} setName={setName} job={job} birth={birth} email={email} profileImg={profileImg} setJob={setJob} isDark={isDark} setShowEdit={setShowEdit} /></ModalPortal>
            }
        </div>
    )
}