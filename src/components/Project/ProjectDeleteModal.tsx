import React from "react";
import styles from "../../style/ProjectDeleteModal.module.css";
import { useThemeStore } from "../../store/themeStore";

interface ProjectDeleteModalProps {
	open: boolean;
	message?: string;
	onCancel: () => void;
	onConfirm: () => void;
}

export default function ProjectDeleteModal({
	open,
	message,
	onCancel,
	onConfirm,
}: ProjectDeleteModalProps) {
	const isDark = useThemeStore((store) => store.isDark);

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
						onClick={onConfirm}
					>
						확인
					</button>
				</div>
			</div>
		</div>
	);
}
