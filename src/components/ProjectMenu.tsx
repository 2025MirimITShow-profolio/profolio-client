import { useThemeStore } from "../store/themeStore";
import styles from '../style/ProjectMenu.module.css'

const menus = [
    { 
      menu: 0,
      title: '포트폴리오',
      icon: '/images/portfolioIcon.svg' 
     },
    { 
      menu: 1,
      title: '진행과정',
      icon: '/images/progressIcon.svg' 
     },
    { 
      menu: 2,
      title: '프로젝트 설명',
      icon: '/images/descriptionIcon.svg' 
    },
    { 
      menu: 3, 
      title: 'AI 피드백',
      icon: '/images/feedbackIcon.svg' 
    },
    { 
      menu: 4, 
      title: 'To Do',
      icon: '/images/todoIcon.svg' 
    },
]

type ProjectMenuProps = {
  click: number
  setClick: (val:number) => void
}

export default function ProjectMenu({click, setClick}:ProjectMenuProps) {
    const isDark = useThemeStore((state) => state.isDark);

    return (
        <div className={styles.ProjectMenu}
          style={{backgroundColor: isDark? '#22222E' : 'white'}}>
          {menus.map((menu) => {
            const isActive = click === menu.menu;
            return (
              <button
                key={menu.title}
                onClick={()=>setClick(menu.menu)}
                className={`${styles.menuBtn} ${isActive? styles.active:""}`}
                style={{
                  backgroundColor: isDark? isActive? '#DDDDDD' : '#383843': isActive? '#666666': '#f4f4f4',
                  color: isDark? isActive? 'black': 'white' : isActive? 'white' : 'black'
                }}
                >
                  <img src={menu.icon} className={styles.btnIcon}></img>
                  {menu.title}
                </button>
            );
          })}
        </div>
    )
}