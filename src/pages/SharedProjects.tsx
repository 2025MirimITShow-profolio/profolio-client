import { useEffect, useState } from "react";
import Header from "../components/Header";
import { useThemeStore } from "../store/themeStore";
import styles from '../style/SharedProjects.module.css'
import axios from "axios";
import { useUserStore } from "../store/userStore";
import SharedProjectDetail from "./SharedProjectDetail";

interface Project {
  id: number;
  title: string;
  created_at: Date;
}

export default function SharedProjects() {    
  const isDark = useThemeStore((store) => store.isDark)
  const token = useUserStore((store) => store.token)
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(
    null
  );

  useEffect(()=>{
    const fetchProject = async () => {
      try{
        const res = await axios.get(`http://localhost:3000/api/projects/shared`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        setProjects(res.data);
      } catch (err) {
        console.error("공유된 프로젝트 데이터 불러오기 실패", err);
      }
    };

    fetchProject();
  },[]);

  const dateFormat = (date: string | Date) => {
    const d = new Date(date);
    return `${d.getFullYear()}.${(d.getMonth() + 1).toString().padStart(2, '0')}.${d.getDate().toString().padStart(2, '0')}`;
  }
    
  const handleProjectClick = (id: number) => {
    setSelectedProjectId(id);
  };

  if (selectedProjectId !== null) {
    console.log(selectedProjectId)
    return <SharedProjectDetail projectId={selectedProjectId}/>;
  }

  return (
      <>
          <Header />
          <div
            style={{
              marginTop: '61px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-start'
            }}>
            <div className={styles.container}>
              {projects.map((project) => (
                <div className={styles.card} key={project.id}
                  style={{
                    backgroundColor: isDark? '#383843':'white'
                  }}
                  onClick={()=>{handleProjectClick(project.id)}}>
                  <div
                    className={styles.image}
                  />
                  <div className={styles.info}>
                    <div className={styles.title} style={{color: isDark? 'white':'black'}}>{project.title}</div>
                    <div className={styles.date}>{dateFormat(project.created_at)}</div>
                  </div>
                </div>
              ))}
            </div>

          </div>
      </>
  )
}