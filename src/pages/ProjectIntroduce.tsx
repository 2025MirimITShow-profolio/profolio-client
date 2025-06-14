import styles from '../style/ProjectIntroduce.module.css'
import { useThemeStore } from '../store/themeStore'
import ProjectInfo from '../components/ProjectInfo'
import { useState } from 'react'
import Profolio from '../../public/images/profolioImg'
import styled from 'styled-components'

type IsDarkProps = {
    isDark: boolean
}

const DateContent = styled.span<IsDarkProps>`
    font-Weight: 600;
    font-size: 24px;
    line-height: 150%;
    color: ${({isDark}) => isDark?'#BBB':'#555'}
`
const SkillContent = styled.span<IsDarkProps>`
    font-Weight: 600;
    font-size: 22px;
    line-height: 150%;
    color: ${({isDark}) => isDark?'#BBB':'#555'}
`
const Line = styled.div<IsDarkProps>`
    width: 100%;
    height: 0.5px;
    background-color: ${({isDark}) => isDark?'#555':'#CCC'}
`

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
                    <div className={styles.profolioMeaning}>
                        <div className={styles.smallContainer}>
                            <img className={styles.projectImg} src='/images/projectImg.png' alt='프로젝트'/>
                            <p>프로젝트</p>
                        </div>
                        <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 9.5H17.5" stroke={isDark?'#FFF':'#000'} stroke-width="1.5"/>
                            <path d="M8.75 0.75L8.75 18.25" stroke={isDark?'#FFF':'#000'} stroke-width="1.5"/>
                        </svg>
                        <div className={styles.smallContainer}>
                            <img className={styles.portfolioImg} src='/images/portfolioImg.png' alt='포트폴리오' />
                            <p>포트폴리오</p>
                        </div>
                        <svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 7.5H19M19 7.5L12.4082 1M19 7.5L12.4082 14" stroke={isDark?'#FFF':'#000'} strokeWidth="1.5"/>
                        </svg>
                        {/* <img src='/images/profolioImg.svg' alt='profolio' /> */}
                        <Profolio color={isDark?'#B886FF':'#8734FD'} />
                    </div>
                </ProjectInfo>
                <ProjectInfo
                    title="기획배경"
                    des="프로폴리오가 만들어지게 된 계기를 알아보세요."
                    index={2}
                    show={show}
                    handleClick={handleClick}
                >
                    <div className={styles.Background}>
현재 개발자와 창작자들은 GitHub, Notion, 포트폴리오 사이트 등 여러 플랫폼을 동시에 사용해야 하는 상황입니다.
동일한 프로젝트 정보를 여러 곳에 중복으로 입력해야 하고, 프로젝트 현황을 파악하기 위해 여러 사이트를 순회해야 하는 번거로움이 있습니다.
이러한 비효율적인 작업 환경은 창작자들의 생산성을 저하시키고 프로젝트 관리에 어려움을 주고 있습니다.
따라서 저희는 이 모든 과정을 하나로 통합할 수 있는 포트폴리오 플랫폼을 만들기로 했습니다.
                    </div>
                </ProjectInfo>
                <ProjectInfo
                    title="기획 & 디자인 & 개발"
                    des="제작 프로세스와 디자인 과정, 사용된 개발 언어에 대해 알아보세요."
                    index={3}
                    show={show}
                    handleClick={handleClick}
                >
                    <div className={styles.pdd}>
                        <div className={styles.pContainer}>
                            <div>
                                <span className={styles.date}>2월</span>
                                <DateContent isDark={isDark}>기회 및 기능정리</DateContent>
                            </div>
                            <div>
                                <span className={styles.date}>3월</span>
                                <DateContent isDark={isDark}>화이트, 다크 모드 디자인</DateContent>
                            </div>
                            <div>
                                <span className={styles.date}>4~6월</span>
                                <DateContent isDark={isDark}>프론트, 백 개발</DateContent>
                            </div>
                        </div>
                        <Line isDark={isDark} />
                        <div className={styles.line} />
                        <div className={styles.ddContainer}>
                            <div className={styles.skillContainer}>
                                <div>
                                    <span className={styles.position}>Design</span>
                                    <SkillContent isDark={isDark}>Figma</SkillContent>
                                </div>
                                <div>
                                    <span className={styles.position}>Frontend</span>
                                    <SkillContent isDark={isDark}>React</SkillContent>
                                </div>
                                <div>
                                    <span className={styles.position}>Backend</span>
                                    <SkillContent isDark={isDark}>Nest.js MySQL</SkillContent>
                                </div>
                            </div>
                            <div className={styles.skillImgContainer}>
                                <img src='/images/figmaImg.png' alt='Figma' className={styles.skillImg} />
                                <div className={styles.skillImg}>
                                    <img src='/images/reactImg.png' alt='React' style={{width: '52px', height: '46px'}} />
                                </div>
                                <img src='/images/nestImg.png' alt='Nest.js' className={styles.skillImg} />
                                <img src='/images/mysqlImg.png' alt='MySQL' className={styles.skillImg} />
                            </div>
                        </div>
                    </div>
                </ProjectInfo>
            </div>
        </div>
    )
}