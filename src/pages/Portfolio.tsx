import ProjectMenu from "../components/ProjectMenu";
import SideBar from "../components/SideBar";
import PdfFileView from "../components/Project/PdfFileView";
import { useThemeStore } from "../store/themeStore";

export default function Portfolio() {
    
    const isDark = useThemeStore((store) => store.isDark)
    return (
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
            <div
                style={{
                    flex: 1,
                    display: 'flex',
                    justifyContent: 'center'
                }}
                >
                <PdfFileView projectId={7}/>
            </div>
            </div>
        </div>
    )
}