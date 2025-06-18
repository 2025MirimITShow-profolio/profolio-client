import { useEffect, useState } from "react";
import { useThemeStore } from "../store/themeStore";
import styles from "../style/SideBar.module.css";
import SideMenu from "./SideMenu";
import SearchProject from "./SearchProject";
import { useLocation, useNavigate } from "react-router-dom";
import { useUserStore } from "../store/userStore";
import axios from "axios";

type MenusDataType = {
	src: string;
	title: string;
	more?: {
		title: string;
		id: number;
	}[];
};

const menusData: MenusDataType[] = [
	{
		src: "dashboard",
		title: "Dashboard",
	},
	{
		src: "allProjects",
		title: "All projects",
		more: [],
	},
	{
		src: "sharedProjects",
		title: "Shared projects",
		more: [],
	},
];

type SideBarProps = {
	setMenu: (val: number) => void;
};

export default function SideBar({ setMenu }: SideBarProps) {
	const navigate = useNavigate();
	const setToken = useUserStore((store) => store.setToken);
	const isDark = useThemeStore((state) => state.isDark);
	const [clickedMenu, setClickedMenu] = useState("Dashboard");
	const [open, setOpen] = useState(false);
	const [menus, setMenus] = useState(menusData);
	const location = useLocation();
	const token = useUserStore((store) => store.token);

	useEffect(() => {
		if (location.pathname.startsWith("/project")) {
			setClickedMenu("All projects");
		} else if (location.pathname === "/dashboard") {
			setClickedMenu("Dashboard");
		} else if (location.pathname === "/shared") {
			setClickedMenu("Shared projects");
		}
	}, [location.pathname]);

	useEffect(() => {
		setOpen(false);
	}, [clickedMenu]);

	const logOut = () => {
		setToken("");
		navigate("/");
	};

	const allProject = async () => {
		try {
			const res = await axios.get(
				`${import.meta.env.VITE_BASE_URL}/projects`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			let menu = [...menus];
			menu[1].more = res.data;
			setMenus(menu);
		} catch (error) {
			console.log(error);
		}
	};
	const allSharedProject = async () => {
		try {
			const res = await axios.get(
				`${import.meta.env.VITE_BASE_URL}/projects/shared`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);

			console.log(res.data);

			const sharedprojectres = res.data.map((project: any) => ({
				title: project.title,
				id: project.id,
			}));

			let menu = [...menus];
			menu[2].more = sharedprojectres;
			console.log("sharedprojectres : ", sharedprojectres);
			setMenus(menu);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		allProject();
		allSharedProject();
	}, []);

	return (
		<div
			className={styles.SideBar}
			style={{ backgroundColor: isDark ? "#22222E" : "#FFFFFF" }}
		>
			<img
				src={isDark ? "/images/logoDark.png" : "/images/logoLight.png"}
				alt="logo"
				className={styles.logo}
			/>
			{menus.map((menu, idx) => (
				<div>
					<SideMenu
						key={idx}
						src={menu.src}
						title={menu.title}
						more={menu.more}
						clickedMenu={clickedMenu}
						setClickedMenu={setClickedMenu}
						open={open}
						setOpen={setOpen}
						idx={idx}
						setMenu={setMenu}
					/>
					{menu.more &&
						menu.more.length > 0 &&
						clickedMenu === menu.title &&
						!open && (
							<SearchProject
								projects={menu.more}
								title={menu.title}
								clickedMenu={clickedMenu}
							/>
						)}
				</div>
			))}
			<img
				src="/images/logoutBtn.png"
				alt="Log out"
				className={styles.logout}
				onClick={logOut}
			/>
		</div>
	);
}
