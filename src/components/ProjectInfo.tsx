import { useState, type ReactNode } from 'react'
import styles from '../style/IntroduceProjectInfo.module.css'
import { useThemeStore } from '../store/themeStore'

type ProjectInfoProps = {
    title: string,
    des: string,
    index: number,
    show: number,
    handleClick: (val:number) => void,
    children: ReactNode
}

export default function ProjectInfo({title, des, index, show, handleClick, children}:ProjectInfoProps) {
    const isDark = useThemeStore((store) => store.isDark)

    return (
        <div className={styles.container}>
            <div 
                className={styles.mainContainer} 
                style={{
                    backgroundColor: show===index?'#8734FD':isDark?'#383843':'#F5F6F8',
                    color: show===index?'#FFF':isDark?'#FFF':'#000'
                }}
            >
                <div>
                    <p className={styles.title}>{title}</p>
                    <p className={styles.des} style={{color: show===index?'#CCC':isDark?'#BBB':'#555'}}>{des}</p>
                </div>
                <svg width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg"
                    className={styles.showBtn}
                    style={show===index ? {transform: 'rotate(45deg)'}:{}}
                    onClick={() => handleClick(index)}
                >
                    <path d="M13.5 0L13.5 27" stroke={show===index?'#FFF':isDark?'#FFF':'#000'} stroke-width="2"/>
                    <path d="M27 13.5L-3.27826e-07 13.5" stroke={show===index?'#FFF':isDark?'#FFF':'#000'} stroke-width="2"/>
                </svg>            </div>
            {show===index &&
                <div className={styles.subContainer} style={{backgroundColor: isDark?'#383843':'#F5F6F8'}}>
                    {children}
                </div>
            }
        </div>
    )
}