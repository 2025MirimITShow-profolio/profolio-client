import SimpleBox from './SimpleBox'
import Tasks from './Tasks'
import Members from './Members'
import DailyGoals from './DailyGoals'
import ProjectTimeline from './ProjectTimeline'
import styles from '../../style/DashboardContainer.module.css'

const simpleItem = [
    {
        title: '진행 중인 프로젝트',
        src: 'ongoingProject',
        count: 3,
        color: '#0070FF',
    },
    {
        title: '완료한 프로젝트',
        src: 'projectsCompleted',
        count: 6,
        color: '#03D7C2',
    },
    {
        title: '해야 하는 일',
        src: 'todo',
        count: 2,
        color: '#9385F7',
    },
    {
        title: '완료한 일',
        src: 'done',
        count: 1,
        color: '#FE996B',
    },
]

export default function DashboardContainer() {
    return (
        <div className={styles.dashboardContainer}>
            <div 
                className={styles.container} 
            >
                <div className={styles.flexContainer}>
                    {simpleItem.map((item, i) => (
                        <SimpleBox key={i} item={item} />
                    ))}
                </div>
                <div className={styles.gridContainer}>
                    <ProjectTimeline />
                    <Tasks />
                    <Members />
                    <DailyGoals />
                </div>

            </div>
        </div>
    )
}