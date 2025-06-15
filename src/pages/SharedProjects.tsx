import { useEffect, useState } from "react";
import Header from "../components/Header";
import { useThemeStore } from "../store/themeStore";
import styles from '../style/SharedProjects.module.css'

interface Project {
  id: number;
  title: string;
  date: string;
  imageUrl: string;
}

const dummyProjects: Project[] = [
  {
    id: 1,
    title: "프로필이오",
    date: "2024.01.06",
    imageUrl: "/images/thumbnail.png",
  },
  {
    id: 2,
    title: "Projects",
    date: "2024.01.06",
    imageUrl: "/images/thumbnail.png",
  },
  {
    id: 3,
    title: "Nuto",
    date: "2024.01.06",
    imageUrl: "/images/thumbnail.png",
  },
  {
    id: 4,
    title: "GulLap",
    date: "2024.01.06",
    imageUrl: "/images/thumbnail.png",
  },
];

export default function SharedProjects() {    
  const isDark = useThemeStore((store) => store.isDark)
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    setProjects(dummyProjects);
  }, []);

  return (
      <>
          <Header />
          <div
            style={{
              marginTop: '61px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
            <div className={styles.container}>
              {projects.map((project) => (
                <div className={styles.card} key={project.id}
                  style={{
                    backgroundColor: isDark? '#383843':'white'
                  }}>
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className={styles.image}
                  />
                  <div className={styles.info}>
                    <div className={styles.title} style={{color: isDark? 'white':'black'}}>{project.title}</div>
                    <div className={styles.date}>{project.date}</div>
                  </div>
                </div>
              ))}
            </div>

          </div>
      </>
  )
}