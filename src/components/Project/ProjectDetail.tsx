import React from "react";
import styles from "../../style/ProjectDetail.module.css";
import ProjectMenuButton from "./ProjectMenuButton";

interface ProjectDetailProps {
	name: string;
	description: string;
	onDelete: () => void;
	onShare: () => void;
}

export default function ProjectDetail({
	name,
	description,
	onDelete,
	onShare,
}: ProjectDetailProps) {
	return (
		<div className={styles.detailContainer}>
			<div className={styles.titleRow}>
				<h2 className={styles.name}>{name}</h2>
				<ProjectMenuButton
					onDelete={onDelete}
					onShare={onShare}
					shared={true}
				/>
			</div>
			<p className={styles.description}>{description}</p>
		</div>
	);
}
