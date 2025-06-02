import styles from '../../style/SimpleBox.module.css'

type SimpleBoxProps = {
    item: {
        title: string,
        src: string,
        count: number,
        color: string,
    }
}

export default function SimpleBox({item}:SimpleBoxProps) {
    return (
        <div className={styles.boxContainer} style={{backgroundColor: item.color}}>
            <div className={styles.box}>
                <div className={styles.imgBox}>
                    <img src={`/images/${item.src}.svg`} alt={item.title} />
                </div>
                <div className={styles.boxInfo}>
                    <p style={{fontSize: '19px'}}>{item.title}</p>
                    <div style={{fontSize: '28px'}}>{item.count}</div>
                </div>
            </div>
            <img src={`/images/${item.src}Light.svg`} alt='lightIcon' className={styles.lightImg}/>
        </div>
    )
}