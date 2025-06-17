import React from "react";
import styles from "../../style/ProjectDeleteModal.module.css";
import { useThemeStore } from "../../store/themeStore";
import { useUserStore } from "../../store/userStore";
import axios from "axios";

interface ProjectDeleteModalProps {
	open: boolean;
	message?: string;
	projectId: number | null;
	onCancel: () => void;
	onConfirm: () => void;
}

export default function ProjectDeleteModal({
	open,
	message,
	projectId,
	onConfirm,
	onCancel,
}: ProjectDeleteModalProps) {
	const isDark = useThemeStore((store) => store.isDark);
	const token = useUserStore((store) => store.token);

	const deleteProject = async () => {
		try {
			const res = await axios.delete(
				`${import.meta.env.VITE_BASE_URL}/projects/${projectId}`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			onConfirm();
		} catch (error) {
			console.log(error);
		}
	};

	if (!open) return null;

	return (
		<div
			className={styles.overlay}
			style={{
				background: "rgba(0, 0, 0, 0.25)",
			}}
		>
			<div
				className={styles.modalBox}
				style={{
					background: isDark ? "#23222B" : "#fff",
					boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.25)",
				}}
			>
				<div
					className={styles.message}
					style={{
						color: isDark ? "#fff" : "#333",
					}}
				>
					{message || "프로젝트를 정말 삭제하시겠습니까?"}
				</div>
				<div
					className={styles.buttonRow}
					style={
						{
							"--border-color": isDark ? "#3A3A47" : "#e0dfe6",
						} as React.CSSProperties
					}
				>
					<button
						className={styles.cancelBtn}
						style={{
							color: isDark ? "#8C8C96" : "#888",
						}}
						onClick={onCancel}
					>
						취소
					</button>
					<button
						className={styles.confirmBtn}
						style={{
							color: isDark ? "#6C63FF" : "#a48cf0",
						}}
						onClick={deleteProject}
					>
						확인
					</button>
				</div>
			</div>
		</div>
	);
}
