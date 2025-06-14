import { useEffect, useState } from "react";
import { useThemeStore } from "../store/themeStore";
import styles from '../style/SideBar.module.css'
import SideMenu from "./SideMenu";
import SearchProject from "./SearchProject";
import { useLocation } from 'react-router-dom';

const menus = [
    {
        src: 'dashboard',
        title: 'Dashboard',
    },
    {
        src: 'allProjects',
        title: 'All projects',
        more: [
            '키오스크 리디자인키오스크 리디자인키오스크 리디자인 키오스크 리디자인키오스크 리디자인키오스크 리디자인',
            '키오스크 리디자인키오스크 리디',
            '투두리스트',
            '프로폴리오',
            '투두리스트',
            '프로폴리오',
            '키오스크 리디자인',
            '투두리스트',
            '프로폴리오',
            '투두리스트',
            '프로폴리오',
        ],
    },
    {
        src: 'sharedProjects',
        title: 'Shared projects',
        more: [
            '키오스크 리디자인',
            '투두리스트',
            '프로폴리오',
            '투두리스트',
            '프로폴리오',
        ],
    }
]

type SideBarProps = {
    setMenu: (val:number) => void
}

export default function SideBar({setMenu}:SideBarProps) {
    const isDark = useThemeStore((state) => state.isDark)
    const [clickedMenu, setClickedMenu] = useState('Dashboard')
    const [open, setOpen] = useState(false)
    const location = useLocation();

    useEffect(() => {
        if (location.pathname.startsWith('/project')) {
            setClickedMenu('All projects');
        } else if (location.pathname === '/dashboard') {
            setClickedMenu('Dashboard');
        } else if (location.pathname === '/shared') {
            setClickedMenu('Shared projects');
        }
    }, [location.pathname]);

    useEffect(() => {
        setOpen(false)
    }, [clickedMenu])

    return (
        <div 
            className={styles.SideBar} 
            style={{backgroundColor: isDark?'#22222E':'#FFFFFF'}}
        >
            <img 
                src={isDark?'/images/logoDark.png':'/images/logoLight.png'}
                alt="logo"
                className={styles.logo}
            />
            {menus.map((menu, idx) => (
                <div>
                    <SideMenu
                        key={idx}
                        src={menu.src}
                        title={menu.title}
                        more={menu.more}
                        clickedMenu={clickedMenu}
                        setClickedMenu={setClickedMenu}
                        open={open}
                        setOpen={setOpen}
                        idx={idx}
                        setMenu={setMenu}
                    />
                    {
                        (menu.more && clickedMenu===menu.title && !open) && 
                        <SearchProject projects={menu.more} title={menu.title} clickedMenu={clickedMenu} />
                    }
                </div>
            ))}
            <img
                src='/images/logoutBtn.png'
                alt='Log out'
                className={styles.logout}
            />
        </div>
    )
}