import styles from '../style/MemberCard.module.css'
import styled from 'styled-components'
import ReactCardFlip from 'react-card-flip';
import { useEffect, useState } from 'react';

const Tag = styled.div`
    width: auto;
    height: 41px;
    border-radius: 100px;
    border: 1px solid #8734FD;
    background-color: #FFF;
    color: #8734FD;
    font-weight: 600;
    font-size: 18px;
    padding: 10px 25px;
`

type MemberCardProps = {
    name: string,
    position: string,
    tag: string[],
    email: string,
    instagram?: string,
    github?: string,
    qr: string[]
}

export default function MemberCard({name, position, tag, email, instagram, github, qr}:MemberCardProps) {
    const [flipped, setFlipped] = useState(false)

    const handleClick = () => {
        setFlipped((prev) => !prev);
    };

    useEffect(() => {
        console.log(email);
    }, [])

    return (
        <div className={styles.memberCard}>
            <div className={styles.profileBox}>
                <div className={styles.profile}>
                    <img src={`/images/${name}Profile.png`} alt={`${name} 프로필`} style={{width: '171px', height: '171px'}}/>
                </div>
                <div className={styles.name}>{name}</div>
                <div className={styles.position}>{position}</div>
                <div className={styles.tagBox}>
                    {tag.map((t, i) => (
                        <Tag key={i}>
                            {`# ${t}`}
                        </Tag>
                    ))}
                </div>
            </div>
            <div>
            <ReactCardFlip
                isFlipped={flipped}
                containerClassName={styles.flipBox}
            >
                <div className={styles.flipFront} onClick={handleClick}>
                    <div>
                        <p className={styles.tagName}>Email</p>
                        <p className={styles.tagContent}>{email}</p>
                    </div>
                    {instagram && <div>
                        <p className={styles.tagName}>Instagram</p>
                        <p className={styles.tagContent}>{instagram}</p>
                    </div>}
                    {github && <div>
                        <p className={styles.tagName}>Github</p>
                        <p className={styles.tagContent}>{github}</p>
                    </div>}
                </div>

                <div className={styles.flipBack} onClick={handleClick}>
                    {qr.map((qr, i) => (
                        <div key={i} className={styles.infoContainer}>
                            <img src={`/images/${name}${qr}.png`} alt={`${name}${qr}`} style={{width: '125px', height: '125px'}}/>
                            <p>{qr}</p>
                        </div>
                    ))}
                </div>
            </ReactCardFlip>
            </div>
        </div>
    )
}