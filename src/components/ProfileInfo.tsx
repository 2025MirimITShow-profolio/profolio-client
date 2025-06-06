import { useThemeStore } from '../store/themeStore'
import styles from '../style/ProfileInfo.module.css'

type ProfileProps = {
    setShowInfo: (val:boolean) => void
}

export default function ProfileInfo({setShowInfo}:ProfileProps) {
    const isDark = useThemeStore((store) => store.isDark)
    const toggleDark = useThemeStore((store) => store.toggleDark)
    return (
        <div 
            className={styles.container}
            style={{backgroundColor: isDark?'#474758':'#FFFFFF'}}
        >
            <div className={styles.close}>
                <span onClick={(e) => {e.stopPropagation(); setShowInfo(false)}}>
                    <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 1L16 16" stroke={isDark?'#AAAAAA':'#555555'} stroke-width="1.2" stroke-linecap="round"/>
                        <path d="M16 1L0.999999 16" stroke={isDark?'#AAAAAA':'#555555'} stroke-width="1.2" stroke-linecap="round"/>
                    </svg>
                </span>
            </div>
            <div className={styles.container1}>
                <div className={styles.profileImg}>
                    <img 
                        src='/images/profileImg.png'
                        alt='프로필 이미지'
                    />
                </div>
                <div className={styles.toggleNameJob}>
                    <div 
                        className={styles.toggle}
                        style={{backgroundColor: isDark?'#6E6E82':'#EEEEEE'}}
                        onClick={toggleDark}
                    >
                        <div
                            className={styles.toggleBtn}
                            style={{backgroundColor: isDark?'#2B2B2B':'#8734FD', transform: isDark?'translateX(100%)':'translateX(0)'}}
                            >
                                {isDark? (
                                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M9.74103 17.9336C9.27407 17.9333 8.80778 17.8982 8.34603 17.8286C6.32387 17.5088 4.4676 16.5195 3.07468 15.0191C1.68176 13.5187 0.832847 11.5941 0.663974 9.55381C0.4951 7.51349 1.01605 5.47555 2.14333 3.76657C3.27061 2.05758 4.93896 0.776494 6.88103 0.128602C7.0889 0.0583014 7.31225 0.0473554 7.526 0.0969941C7.73975 0.146633 7.93542 0.254889 8.09103 0.409602C8.25973 0.573822 8.37945 0.781701 8.43684 1.01003C8.49423 1.23835 8.48703 1.47813 8.41603 1.7026C8.14908 2.56986 8.02975 3.4758 8.06303 4.3826C8.13876 5.80475 8.58048 7.18325 9.34538 8.38457C10.1103 9.58589 11.1725 10.5693 12.429 11.2396C13.5606 11.8829 14.8384 12.2249 16.14 12.2326C16.3667 12.2357 16.5881 12.3008 16.7804 12.4209C16.9727 12.5409 17.1285 12.7112 17.2309 12.9134C17.3333 13.1156 17.3784 13.342 17.3613 13.568C17.3442 13.794 17.2656 14.0111 17.134 14.1956C16.2826 15.3563 15.1694 16.2997 13.8848 16.9492C12.6002 17.5987 11.1805 17.936 9.74103 17.9336ZM7.26103 1.0666C7.23891 1.06665 7.21694 1.07037 7.19603 1.0776C5.98034 1.48103 4.87705 2.16577 3.97595 3.07609C3.07484 3.98641 2.40137 5.09661 2.01034 6.31635C1.6193 7.53609 1.52174 8.83092 1.72559 10.0955C1.92945 11.36 2.42896 12.5586 3.18349 13.5937C3.93802 14.6288 4.92624 15.4711 6.06776 16.0521C7.20928 16.6332 8.47185 16.9365 9.75274 16.9375C11.0336 16.9384 12.2967 16.637 13.4391 16.0577C14.5814 15.4784 15.5709 14.6375 16.327 13.6036C16.3512 13.5697 16.3653 13.5296 16.3676 13.488C16.3699 13.4464 16.3603 13.405 16.34 13.3686C16.3222 13.3287 16.2933 13.2947 16.2568 13.2706C16.2203 13.2465 16.1777 13.2333 16.134 13.2326C14.6657 13.2242 13.2239 12.84 11.946 12.1166C10.5376 11.3627 9.34796 10.2575 8.49241 8.90844C7.63687 7.55934 7.14449 6.01203 7.06303 4.4166C7.02707 3.39861 7.16229 2.38181 7.46303 1.4086C7.47789 1.35925 7.47934 1.30683 7.46721 1.25674C7.45508 1.20665 7.42982 1.16069 7.39403 1.1236C7.37701 1.10542 7.35641 1.09096 7.33351 1.08115C7.31062 1.07134 7.28594 1.06638 7.26103 1.0666Z" fill="#EEEEEE"/>
                                    </svg>
                                ) : (
                                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M19.2365 11.0137H20.9922M11.0547 2.83185V1.01562M11.0547 20.9844V19.1955M18.0547 18.0137L16.782 16.7409M18.0547 4.01367L16.782 5.2864M4.05469 18.0137L5.32741 16.7409M4.05469 4.01367L5.32741 5.2864M1 11.0137H2.87287M11.0547 15.9228C12.3567 15.9228 13.6053 15.4056 14.5259 14.4849C15.4466 13.5643 15.9638 12.3156 15.9638 11.0137C15.9638 9.7117 15.4466 8.46305 14.5259 7.54242C13.6053 6.62179 12.3567 6.10458 11.0547 6.10458C9.75272 6.10458 8.50407 6.62179 7.58344 7.54242C6.6628 8.46305 6.1456 9.7117 6.1456 11.0137C6.1456 12.3156 6.6628 13.5643 7.58344 14.4849C8.50407 15.4056 9.75272 15.9228 11.0547 15.9228Z" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                )}
                        </div>
                    </div>
                    <div className={styles.nameJob}>
                        <span className={styles.name} style={{color: isDark?'#FFFFFF':'#000000'}}>이자연</span>
                        <span className={styles.job} style={{color: isDark?'#AAAAAA':'#777777'}}>디자이너</span>
                    </div>
                </div>
            </div>
            <div className={styles.info} style={{color: isDark?'#AAAAAA':'#888888'}}>
                <div>2007.08.06</div>
                <div>d2331@e-mirim.hs.kr</div>
                <div className={styles.editBtn} style={{backgroundColor: isDark?'#DDDDDD':'#F5F5F5'}}>수정하기</div>
            </div>
        </div>
    )
}