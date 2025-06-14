import styles from '../style/Login.module.css'
import { useThemeStore } from '../store/themeStore'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

type IsDarkProps = {
    isDark: boolean
}

const InputBox = styled.div<IsDarkProps>`
    width: 100%;
    height: 80px;
    border-radius: 15px;
    background-color: ${({isDark}) => isDark?'#22222E':'#FFF'};
    border: 1px solid ${({isDark}) => isDark?'#333':'#CCC'};
    padding: 25px 30px;
    margin-bottom: 10px;
`

const NextBtn = styled.div<IsDarkProps>`
    width: 100%;
    height: 80px;
    border-radius: 15px;
    background-color: ${({isDark}) => isDark?'#383843':'#CCC'};
    display: flex;
    align-items: center;
    justify-content: center;
    color: #FFF;
    font-weight: 600;
    font-size: 24px;
    margin-top: 13px;
    margin-bottom: 30px;
    cursor: pointer;

    &:hover {
        background-color: ${({isDark}) => isDark?'#CCC':'#383843'};
    }
`

export default function Login() {
    const navigate = useNavigate()
    const isDark = useThemeStore((store) => store.isDark)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    return (
        <div className={styles.container} style={{backgroundColor: isDark?'#181822':'#F5F6F8', color: isDark?'#FFF':'#000'}}>
            <div className={styles.logoContainer}>
                <span className={styles.logo}>Profolio</span>
                <span className={styles.sub}>프로젝트 관리를 한번에</span>
            </div>
            <div className={styles.loginContainer}>
                <span className={styles.text}>로그인하여<br/>프로젝트를 관리해보세요</span>
                <InputBox isDark={isDark}>
                    <input
                        className={styles.infoInput}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder='이메일을 입력하세요'
                    />
                </InputBox>
                <InputBox isDark={isDark}>
                    <input
                        className={styles.infoInput}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder='비밀번호를 입력하세요'
                    />
                </InputBox>
                <NextBtn isDark={isDark}>다음</NextBtn>
                <div className={styles.noIdContainer}>
                    <span>아이디가 없나요?</span>
                    <span className={styles.signupBtn}>Sign up</span>
                </div>
            </div>
            <div className={styles.goBtn} onClick={() => navigate('/')}>Go to main</div>
        </div>
    )
}