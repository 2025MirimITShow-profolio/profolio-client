import SideBar from "../components/SideBar";
import { useState } from "react";
import { useThemeStore } from "../store/themeStore";
import Dashboard from "./Dashboard";
import ProjectList from "./ProjectList";
import SharedProjects from "./SharedProjects";

export default function Main() {
	const [menu, setMenu] = useState(0);
	const isDark = useThemeStore((store) => store.isDark);

	return (
		<div
			style={{
				width: "100%",
				height: "100vh",
				backgroundColor: isDark ? "#181822" : "#F6F7FB",
				display: "flex",
				justifyContent: "space-between",
				position: "relative",
				overflow: "hidden",
			}}
		>
			<SideBar setMenu={setMenu} />
			<div
				style={{
					width: "calc(100%)",
					height: "100vh",
					display: "flex",
					flexDirection: "column",
					backgroundColor: isDark ? "#181822" : "#F6F7FB",
				}}
			>
				{menu === 0 && <Dashboard />}
				{menu === 1 && <ProjectList />}
				{menu === 2 && <SharedProjects/>}
			</div>
		</div>
	);
}
