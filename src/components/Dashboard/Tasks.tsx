import { useEffect, useState, type Key } from 'react'
import { useThemeStore } from '../../store/themeStore'
import styles from '../../style/Tasks.module.css'
import { useUserStore } from '../../store/userStore'
import axios from 'axios'

type TaskProps = {
    task: TaskType,
    getTasks: () => Promise<void>,
    edit: boolean,
    isDark: boolean
}

export function Task({task, getTasks, edit, isDark}:TaskProps) {
    const token = useUserStore((store) => store.token)
    const [done, setDone] = useState(false)
    const [hovered, setHovered] = useState(false)

    const deleteClick = async() => {
        try {
            console.log("task id :", task.id);
            const res = await axios.delete(`http://localhost:3000/api/tasks/${task.id}`, {
                headers : {
                    Authorization: `Bearer ${token}`
                }
            })
            getTasks();
        } catch (error) {
            console.log(error);
        }
        getTasks()
    }

    const doneClick = async() => {
        try {
            const res = await axios.patch(`http://localhost:3000/api/tasks/${task.id}/status`,{}, {
                headers : {
                    Authorization: `Bearer ${token}`
                }
            })
            getTasks()   
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className={styles.task} style={(!edit && hovered)?{backgroundColor: '#F5F6F8', padding: '10px 13px', width: '100%', borderRadius: '6px', cursor: 'pointer'}:{}} onMouseMove={() => {setHovered(true)}} onMouseLeave={() => {setHovered(false)}}>
            {edit && <div 
                className={styles.doneBtn}
                style={{backgroundColor: task.is_done?'#8734FD':isDark?'#41414E':'#EEEEEE'}}
                onClick={() => {setDone(pre => !pre); doneClick()}}
            >
                {edit && task.is_done && 
                    <svg width="16" height="13" viewBox="0 0 16 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 6.26316L5.5 11L15 1" stroke="white" stroke-width="2.5"/>
                    </svg>
                }
            </div>}
            <div className={styles.text} style={task.is_done?{textDecoration: 'line-through'}:{}}>
                {task.title}
            </div>
            {!edit && hovered && (
                <div className={styles.itemContainer}>
                    <img src='/images/delete.svg' alt='삭제하기' onClick={deleteClick}/>
                </div>
            )}
        </div>
    )
}

type TaskType = {
    id: number
    title: string,
    is_done: boolean;
}

export default function Tasks() {
    const isDark = useThemeStore((store) => store.isDark)
    const token = useUserStore((store) => store.token)
    const [task, setTask] = useState<TaskType[]>([])
    const [add, setAdd] = useState(false)
    const [addText, setAddText] = useState('')
    const [edit, setEdit] = useState(1)

    const getTasks = async() => {
        try {
            console.log(token);
            const res = await axios.get('http://localhost:3000/api/tasks/all', {
                headers : {
                    Authorization: `Bearer ${token}`
                }
            })
            let data = res.data
            console.log(data);
            setTask(data)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getTasks()
    }, [token])

    const addTask = async() => {
        if(addText.trim() === '') return 
        try {
            const res = await axios.post('http://localhost:3000/api/tasks', {
                title: addText,
                date: new Date()
            }, {
                headers : {
                    Authorization: `Bearer ${token}`
                }
            })
            setAddText('')
            getTasks()
        } catch (error) {
            console.log(error);
        }
    }

    const handleClick = (e:React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Enter'){
            addTask()
            setAdd(false)
        }
    }

    return (
        <div
            className={styles.taskContainer}
            style={isDark?{backgroundColor: '#2B2B37', color: '#FFFFFF'}:{backgroundColor: '#FFFFFF', color: '#000000'}}
        >
            {edit===2 && (
                <div
                    className={styles.editBtn}
                    style={{backgroundColor: isDark?'#000':'#FFF'}}
                    onClick={() => setEdit(3)}
                >
                    수정하기
                </div>
            )}
            <div className={styles.header}>
                <div className={styles.addBtnContainer}>
                    {edit!=3?(
                        <>
                            <p style={{ fontWeight: '600', fontSize: '25px'}}>Tasks</p>
                            <div className={styles.addBtn} onClick={() => {setAdd(pre => !pre); setAddText('')}}>
                                <img
                                    src='/images/plus.svg'
                                />
                            </div>
                        </>
                    ):(
                        <p style={{ fontWeight: '600', fontSize: '25px'}}>수정하기</p>
                    )}
                </div>
                <div className={styles.optionBtn} onClick={() => setEdit(pre => (pre+1)%3)}>
                    <img 
                        src={`/images/${edit===3?'save':'showMore'}.svg`}
                        alt={edit===3?'저장하기':'더보기'}
                    />
                </div>                
            </div> 
            {add && (
                <div className={styles.addBox}>
                    <div 
                        className={styles.doneBtn}
                        style={{backgroundColor: isDark?'#41414E':'#EEEEEE'}}                    
                    >
                    </div>
                    <input
                        className={styles.addTextBox}
                        value={addText}
                        onChange={(e) => setAddText(e.target.value)}
                        onKeyDown={handleClick}
                    />
                </div>
            )}
            <div className={styles.taskList}>
                {task.map((t, i) => <Task key={t.id} getTasks={getTasks} task={t} edit={edit<3} isDark={isDark} />)}
            </div>
        </div>
    )
}