import { useThemeStore } from '../store/themeStore'
import styled from 'styled-components'
import styles from '../style/Header.module.css'
import { useEffect, useRef, useState } from 'react'
import { disassemble } from "es-hangul"

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
    background-color: '#000';
    &:hover {
        background-color: ${({isDark}) => isDark?'#2B2B37':'#F5F6F8'} !important;
    }
`

export default function Header() {
    const isDark = useThemeStore((store) => store.isDark)
    const [search, setSearch] = useState('')
    const [project, setProject] = useState(projects)
    const [click, setClick] = useState(false)
    const searchRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if(!search){
            setProject(projects)
        } else {
            setProject(projects.filter((pro) => disassemble(pro).includes(disassemble(search))))
        }
    }, [search])

    useEffect(() => {
        function clickOutside(e:MouseEvent) {
            if(searchRef.current && !searchRef.current.contains(e.target as Node)){
                setClick(false)
            }
        }
        document.addEventListener('mousedown', clickOutside)
        return () => {
            document.removeEventListener('mousedown', clickOutside)
        }
    }, [])

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
                        onChange={e => setSearch(e.target.value.trim())}
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
            <Profile isDark={isDark}>
                <img 
                    src='/images/profileImg.png'
                    alt='프로필 이미지'
                    className={styles.profileImg}
                />
                <img 
                    src='/images/downBtn.svg'
                    alt='더보기'
                    className={styles.moreBtn}
                />
            </Profile>
        </div>
    )
}