import styles from '../style/Login.module.css'
import { useThemeStore } from '../store/themeStore'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import LoginContainer, {InputBox, NextBtn} from '../components/LonginContainer'

export default function Login() {
    const navigate = useNavigate()
    const isDark = useThemeStore((store) => store.isDark)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    return (
        <LoginContainer>
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
            <NextBtn 
                isDark={isDark}
                disabled={email===''||password===''?true:false}
                onClick={() => navigate('/profolio')}
            >
                다음
            </NextBtn>
            <div className={styles.noIdContainer}>
                <span>아이디가 없나요?</span>
                <span className={styles.signupBtn} onClick={() => navigate('/signup')}>Sign up</span>
            </div>
        </LoginContainer>
    )
}