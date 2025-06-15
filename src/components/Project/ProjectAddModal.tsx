import React, { useState } from "react";
import styles from "../../style/ProjectAddModal.module.css";
import { useThemeStore } from "../../store/themeStore";

interface ProjectAddModalProps {
	open: boolean;
	onClose: () => void;
	onCreate: (title: string, description: string) => void;
}

export default function ProjectAddModal({
	open,
	onClose,
	onCreate,
}: ProjectAddModalProps) {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const isDark = useThemeStore((store) => store.isDark);

	if (!open) return null;

	return (
		<div
			className={styles.modalOverlay}
			style={{
				background: "rgba(0, 0, 0, 0.25)",
			}}
		>
			<div
				className={styles.modalContent}
				style={{
					background: isDark ? "#23222B" : "#fff",
					color: isDark ? "#fff" : "#111",
					boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.25)",
				}}
			>
				<h2 style={{ color: isDark ? "#fff" : "#111" }}>
					프로젝트 추가하기
				</h2>
				<hr
					className={styles.divider}
					style={{
						background: isDark ? "#3A3A47" : "#e0dfe6",
					}}
				/>

				<div className={styles.inputNameGroup}>
					<label
						className={styles.label}
						style={{
							color: isDark ? "#8C8C96" : "#bbbbbb",
						}}
					>
						프로젝트 제목
					</label>
					<input
						className={styles.input}
						style={{
							background: isDark ? "#3A3A47" : "#fafafd",
							color: isDark ? "#fff" : "#23222B",
							border: "none",
						}}
						value={title}
						onChange={(e) => setTitle(e.target.value)}
					/>
				</div>

				<div className={styles.inputGroup}>
					<label
						className={styles.label}
						style={{
							color: isDark ? "#8C8C96" : "#bbbbbb",
						}}
					>
						프로젝트 설명
					</label>
					<textarea
						className={styles.textarea}
						style={{
							background: isDark ? "#3A3A47" : "#fafafd",
							color: isDark ? "#fff" : "#23222B",
							border: "none",
						}}
						value={description}
						onChange={(e) => setDescription(e.target.value)}
					/>
				</div>

				<div className={styles.buttonRow}>
					<button
						className={styles.cancelButton}
						style={{
							background: "none",
							color: isDark ? "#8C8C96" : "#666",
						}}
						onClick={onClose}
					>
						취소하기
					</button>
					<button
						className={`${styles.createButton} ${
							isDark ? styles.dark : ""
						}`}
						onClick={() => {
							onCreate(title, description);
							setTitle("");
							setDescription("");
						}}
					>
						생성하기
					</button>
				</div>
			</div>
		</div>
	);
}
