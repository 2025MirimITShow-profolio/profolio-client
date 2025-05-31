import { useThemeStore } from "../store/themeStore";
import SideBar from "../components/SideBar";

export default function Dashboard() {
    return (
        <div
            style={{width: '100%', height: '100vh', backgroundColor: '#F6F7FB'}}
        >
            <SideBar />
        </div>
    )
}