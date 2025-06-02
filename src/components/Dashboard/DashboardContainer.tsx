import styles from '../../style/DashboardContainer.module.css'

export default function DashboardContainer() {
    return (
        <div className={styles.dashboardContainer}>
            <div 
                className={styles.container} 
            >
                <div className={styles.flexContainer}>
                    <div style={{width: '100%', height: '100%', backgroundColor: '#123123'}}>1</div>
                    <div style={{width: '100%', height: '100%', backgroundColor: '#321321'}}>2</div>
                    <div style={{width: '100%', height: '100%', backgroundColor: '#456456'}}>3</div>
                    <div style={{width: '100%', height: '100%', backgroundColor: '#654654'}}>4</div>
                </div>
                <div className={styles.gridContainer}>
                    <div style={{width: '100%', height: '100%', backgroundColor: '#123123'}}>1</div>
                    <div style={{width: '100%', height: '100%', backgroundColor: '#321321'}}>2</div>
                    <div style={{width: '100%', height: '100%', backgroundColor: '#654654'}}>4</div>
                    <div style={{width: '100%', height: '100%', backgroundColor: '#456456'}}>3</div>
                </div>

            </div>
        </div>
    )
}