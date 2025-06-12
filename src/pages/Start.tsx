import { useThemeStore } from "../store/themeStore"
import styles from '../style/Start.module.css'
import styled from "styled-components"
import { useNavigate } from "react-router-dom"

type IsDarkProps = {
    isDark: boolean
}
const Toggle = styled.div<IsDarkProps>`
    width: ${({isDark}) => isDark?'117px':'124px'};
    height: 43px;
    position: absolute;
    border-radius: 100px;
    background-color: white;
    position: absolute;
    left: ${({isDark}) => isDark?'119px':'2px'};
`
const TextSpan = styled.span<IsDarkProps>`
    color: ${({isDark}) => isDark?'#FFF':'#000'}
`

export default function Start() {
    const isDark = useThemeStore((store) => store.isDark)
    const toggleDark = useThemeStore((store) => store.toggleDark)
    const navigate = useNavigate()

    return (
        <div className={styles.start} style={{backgroundColor: isDark?'#211E31':'#F5F6F8'}}>
            <div className={styles.toggleContainer} onClick={() => toggleDark()}>
                <Toggle isDark={isDark} />
                <span className={styles.toggleItem} style={{left: '23px', color: isDark?'#666':'#000'}}>화이트모드</span>
                <span className={styles.toggleItem} style={{right: '27px', color: isDark?'#000':'#666'}}>다크모드</span>
            </div>
            <img
                src={isDark?'/images/logoDark.svg':'/images/logoLight.svg'}
                alt="logo"
                style={{marginTop: '12vh'}}
            />
            <p className={styles.text}>
                <TextSpan isDark={isDark}>프로젝트와</TextSpan>와 <TextSpan isDark={isDark}>포트폴리오</TextSpan> 관리를 한 번에 시작해보세요!
            </p>
            <div className={styles.cardContainer}>
                <div className={styles.introduce} onClick={() => navigate('/introduce')}>
                    <div className={styles.introduceDes}>
                        <p style={{paddingBottom: '5px'}}>프로폴리오의 기획배경에</p>
                        <p>대해 알아보세요!</p>
                    </div>
                    <span>프로폴리오 소개</span>
                    <img src="/images/cardIntroduce.png" alt="프로폴리오 소개" 
                        style={{
                            width: '157px',
                            height: '79px',
                            marginTop: '31px'
                        }}
                    />
                </div>
                <div className={styles.login}>
                    <span className={styles.loginDes}>로그인하여 시작해보세요</span>
                    <span>로그인/회원가입</span>
                    <img src="/images/cardLogin.png" alt="로그인/회원가입" 
                        style={{
                            width: '95px',
                            height: '95px',
                            marginTop: '68px'
                        }}                        
                    />
                </div>
                <div className={styles.member} onClick={() => navigate('/member')}>
                    <span className={styles.memberDes}>프로폴리오의 팀원을 소개합니다!</span>
                    <span>팀원 소개</span>
                    <img src="/images/cardMember.png" alt="팀원 소개" 
                        style={{
                            width: '141px',
                            height: '99px',
                            marginTop: '62px'
                        }}                    
                    />
                </div>
            </div>
            <img src="/images/star1.svg" alt="별" style={{position: 'absolute', top: '15.926vh', left: '9.948vw'}} />
            <img src="/images/star2.svg" alt="별" style={{position: 'absolute', top: '72.22vh', left: '15.208vw'}} />
            <img src="/images/star3.svg" alt="별" style={{position: 'absolute', top: '50vh', right: '9.635vw'}} />
            <img src="/images/star4.svg" alt="별" style={{position: 'absolute', top: '86.204vh', right: '16.146vw'}} />
        </div>
    )
}