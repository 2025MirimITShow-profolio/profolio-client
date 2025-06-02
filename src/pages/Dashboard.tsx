import { useThemeStore } from "../store/themeStore";
import SideBar from "../components/SideBar";
import Header from "../components/Header";
import DashboardContainer from "../components/Dashboard/DashboardContainer";

export default function Dashboard() {
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
                <Header />
                <DashboardContainer />
            </div>
        </div>
    )
}