import { useEffect, useState } from "react";
import { useThemeStore } from "../store/themeStore";
import styles from '../style/ProjectMenu.module.css'
import { useLocation, useNavigate } from "react-router-dom";

const menus = [
    { 
      src: 'portfolio',
      title: '포트폴리오',
      icon: 'images/portfolioIcon.svg' 
     },
    { 
      src: 'progress', 
      title: '진행과정',
      icon: 'images/progressIcon.svg' 
     },
    { 
      src: 'description', 
      title: '프로젝트 설명',
      icon: 'images/descriptionIcon.svg' 
    },
    { 
      src: 'feedback', 
      title: 'AI 피드백',
      icon: 'images/feedbackIcon.svg' 
    },
    { 
      src: 'todo', 
      title: 'To Do',
      icon: 'images/todoIcon.svg' 
    },
]

export default function ProjectMenu() {
    const navigate = useNavigate();
    const location = useLocation();

    const isDark = useThemeStore((state) => state.isDark);

    return (
        <div className={styles.ProjectMenu}>
          {menus.map((menu) => {
            const isActive = location.pathname.includes(menu.src);
            return (
              <button
                key={menu.title}
                onClick={()=>navigate(`/${menu.src}`)}
                className={`${styles.menuBtn} ${isActive? styles.active:""}`}
                >
                  <img src={menu.icon} className={styles.btnIcon}></img>
                  {menu.title}
                </button>
            );
          })}
        </div>
    )
}