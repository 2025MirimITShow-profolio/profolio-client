import SideBar from "../components/SideBar"
import { useThemeStore } from "../store/themeStore";
import ProjectMenu from "../components/ProjectMenu"
import DescriptionBox from "../components/Project/DescriptionBox";

export default function ProjectDescription() {
  const isDark = useThemeStore((store) => store.isDark)

  return(
    <div
      style={{
        width: '100%', 
        height: '100vh', 
        backgroundColor: isDark?'#181822':'#F6F7FB', 
        display: 'flex',
        justifyContent: 'space-between'
      }}
    >
      <SideBar />
      <div
        style={{
          width: 'calc(100%)',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: isDark?'#181822':'#F6F7FB',
        }}
      >
        <ProjectMenu />
        <div style={{marginTop: '67px', marginLeft: '97px'}}>
          <DescriptionBox />
        </div>
      </div>
    </div>
  )
}