import styles from '../../style/ProfileEdit.module.css'

type ProfileEditProps = {
    name: string,
    setName: (val:string) => void,
    job: string,
    setJob: (val:string) => void,
    isDark: boolean,
    setShowEdit: (val:boolean) => void
}

export default function ProfileEdit({name, setName, job, setJob, isDark, setShowEdit}:ProfileEditProps) {
    return (
        <div className={styles.editContainer} style={{backgroundColor: isDark?'#181822':'#FFFFFF'}}>
            <div className={styles.container1}>
                <div className={styles.profileImg}>
                    <img 
                        src='/images/profileImg.png'
                        alt='프로필 이미지'
                    />
                </div>
                <div className={styles.birthday}>2007.08.06</div>
                <div className={styles.email}>d2331@e-mirim.hs.kr</div>
            </div>
            <div className={styles.editInfo}>
                <div className={styles.infoContainer}>
                    <div>이름</div>
                    <input
                        className={styles.inputBox}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className={styles.infoContainer}>
                    <div>직업</div>
                    <input
                        className={styles.inputBox}
                        value={job}
                        onChange={(e) => setJob(e.target.value)}
                    />
                </div>
            </div>
            <div 
                className={styles.saveBtn}
                onClick={() => setShowEdit(false)}
            >
                완료하기
            </div>
        </div>
    )
}