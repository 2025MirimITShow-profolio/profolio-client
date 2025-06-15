import styles from '../../style/ProfileEdit.module.css'

type ProfileEditProps = {
    name: string,
    setName: (val:string) => void,
    job: string,
    setJob: (val:string) => void,
    birth: string,
    email: string,
    profileImg: string,
    isDark: boolean,
    setShowEdit: (val:boolean) => void
}

export default function ProfileEdit({name, setName, job, setJob, birth, email, profileImg, isDark, setShowEdit}:ProfileEditProps) {
    return (
        <div className={styles.editContainer} style={{backgroundColor: isDark?'#181822':'#FFFFFF'}}>
            <div className={styles.container1}>
                <div className={styles.profileImg}>
                    <img 
                        src={`/images/profile/profile${profileImg}.png`}
                        alt='프로필 이미지'
                    />
                </div>
                <div className={styles.birthday}>{birth}</div>
                <div className={styles.email}>{email}</div>
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