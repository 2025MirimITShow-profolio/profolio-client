import styles from '../style/Member.module.css'
import { useThemeStore } from '../store/themeStore'
import data from '../data/member.json'
import MemberCard from '../components/MemberCard'

type MemberDataType = {
    name: string,
    position: string,
    tag: string[],
    email: string,
    instagram?: string,
    github?: string,
    qr: string[]
}
const memberData: MemberDataType[] = data

export default function Member() {
    const isDark = useThemeStore((store) => store.isDark)

    return (
        <div className={styles.container} style={{backgroundColor: isDark?'#181822':'#F4F4F4', color: isDark?'#FFF':'#000'}}>
            <div className={styles.memberContainer}>
                <div className={styles.title}>팀원 소개</div>
                <div className={styles.memberBox}>
                    {memberData.map((member, i) => (
                        <MemberCard
                            key={i}
                            name={member.name}
                            position={member.position}
                            tag={member.tag}
                            email={member.email}
                            instagram={member.instagram}
                            github={member.github}
                            qr={member.qr}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}