import styles from '../style/ProjectIntroduce.module.css'
import { useThemeStore } from '../store/themeStore'
import ProjectInfo from '../components/ProjectInfo'
import { useState } from 'react'

export default function ProjectIntroduce() {
    const isDark = useThemeStore((store) => store.isDark)
    const [show, setShow] = useState(0)

    const handleClick = (index: number) => {
        if(index===show){
            setShow(0)
        } else {
            setShow(index)
        }
    }

    return (
        <div className={styles.container} style={{backgroundColor: isDark?'#000':'#FFF', color: isDark?'#FFF':'#000'}}>
            <div className={styles.sideContainer}>
                <div>
                    <span className={styles.content}>프로젝트 소개</span>
                    <div className={styles.title}>
                        프로폴리오는<br/>
                        이렇게<br/>
                        만들어졌어요
                    </div>
                </div>
                <div className={styles.explanation}>
                    프로폴리오를 통해 프로젝트와 포트폴리오를<br/>
                    한곳에서 편리하게 관리할 수 있도록,<br/>
                    오랜 고민과 개발 과정을 거쳐 서비스를 만들었습니다.
                </div>
            </div>
            <div className={styles.infoContainer}>
                <ProjectInfo
                    title="프로폴리오 뜻"
                    des="프로폴리오는 프로젝트와 포트폴리오를 합친 뜻입니다."
                    index={1}
                    show={show}
                    handleClick={handleClick}
                >
                    <div style={{height: '100px'}}></div>
                </ProjectInfo>
                <ProjectInfo
                    title="기획배경"
                    des="프로폴리오가 만들어지게 된 계기를 알아보세요."
                    index={2}
                    show={show}
                    handleClick={handleClick}
                >
                    <div style={{height: '100px'}}></div>
                </ProjectInfo>
                <ProjectInfo
                    title="기획 & 디자인 & 개발"
                    des="제작 프로세스와 디자인 과정, 사용된 개발 언어에 대해 알아보세요."
                    index={3}
                    show={show}
                    handleClick={handleClick}
                >
                    <div style={{height: '100px'}}></div>
                </ProjectInfo>
            </div>
        </div>
    )
}