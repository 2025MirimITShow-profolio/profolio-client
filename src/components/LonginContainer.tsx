import styles from '../style/Login.module.css'
import { useThemeStore } from '../store/themeStore'
import { type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

type IsDarkProps = {
    isDark: boolean
}
type NextBtnProps = IsDarkProps & {
    disabled?: boolean
}

export const InputBox = styled.div<IsDarkProps>`
    width: 100%;
    height: 80px;
    border-radius: 15px;
    background-color: ${({isDark}) => isDark?'#22222E':'#FFF'};
    border: 1px solid ${({isDark}) => isDark?'#333':'#CCC'};
    padding: 25px 30px;
    margin-bottom: 10px;
    font-size: 24px;

    & > input {
        width: 100%;
        height: 100%;
        background-color: transparent;
        font-size: 24px;
    }
`

export const NextBtn = styled.div<NextBtnProps>`
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
    pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};

    &:hover {
        background-color: #8734FD;
    }
`

export const AuthenticationInput = styled.input<IsDarkProps>`
    width: calc(100% / 6);
    height: 100%;
    font-size: 33px;
    text-align: center;
    border: 1px solid ${({isDark}) => isDark?'#333':'#CCC'};
    background-color: ${({isDark}) => isDark?'#22222E':'#FFF'};
    caret-color: transparent;
`

export default function LoginContainer({children}:{children: ReactNode}) {
    const navigate = useNavigate()
    const isDark = useThemeStore((store) => store.isDark)

    return (
        <div className={styles.container} style={{backgroundColor: isDark?'#181822':'#F5F6F8', color: isDark?'#FFF':'#000'}}>
            <div className={styles.logoContainer}>
                <span className={styles.logo}>Profolio</span>
                <span className={styles.sub}>프로젝트 관리를 한번에</span>
            </div>
            <div className={styles.loginContainer}>
                {children}
            </div>
            <div className={styles.goBtn} onClick={() => navigate('/')}>Go to main</div>
        </div>
    )
}