import React from "react";
import styles from "../../style/ProjectMainInfo.module.css";
import ProjectMenuButton from "./ProjectMenuButton";
import { useThemeStore } from "../../store/themeStore";

interface ProjectMainInfoProps {
	title: string;
	description: string;
	onDelete: () => void;
	onShare: () => void;
	onTitleClick: () => void;
	shared: boolean
}

export default function ProjectMainInfo({
	title,
	description,
	onDelete,
	onShare,
	onTitleClick,
	shared
}: ProjectMainInfoProps) {
	const isDark = useThemeStore((store) => store.isDark);
	console.log(shared)

	return (
		<div
			className={`${styles.mainInfoContainer} ${
				isDark ? "#fff" : "23222B"
			}`}
		>
			<div className={styles.row}>
				<span
					className={styles.projectName}
					onClick={onTitleClick}
					style={{
						color: isDark ? "#fff" : "#23222B",
						transition: "color 0.2s",
					}}
				>
					{title}
				</span>
				<ProjectMenuButton onDelete={onDelete} onShare={onShare} shared={shared}/>
			</div>
			<div className={styles.projectDesc}>{description}</div>
		</div>
	);
}
