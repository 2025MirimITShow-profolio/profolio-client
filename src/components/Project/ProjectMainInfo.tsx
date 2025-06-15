import React from "react";
import styles from "../../style/ProjectMainInfo.module.css";
import ProjectMenuButton from "./ProjectMenuButton";
import { useThemeStore } from "../../store/themeStore";

interface ProjectMainInfoProps {
	name: string;
	description: string;
	onDelete: () => void;
	onShare: () => void;
	onTitleClick: () => void;
}

export default function ProjectMainInfo({
	name,
	description,
	onDelete,
	onShare,
	onTitleClick,
}: ProjectMainInfoProps) {
	const isDark = useThemeStore((store) => store.isDark);

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
					{name}
				</span>
				<ProjectMenuButton onDelete={onDelete} onShare={onShare} />
			</div>
			<div className={styles.projectDesc}>{description}</div>
		</div>
	);
}
