import React, { useState, useRef, useEffect } from "react";
import styles from "../../style/ProjectMenuButton.module.css";
import { useThemeStore } from "../../store/themeStore";
import { useUserStore } from "../../store/userStore";

interface ProjectMenuButtonProps {
	onDelete: () => void;
	onShare: () => void;
	shared: boolean;
}

export default function ProjectMenuButton({
	onDelete,
	onShare,
	shared,
}: ProjectMenuButtonProps) {
	const [open, setOpen] = useState(false);
	const ref = useRef<HTMLDivElement>(null);
	const btnRef = useRef<HTMLButtonElement>(null);
	const dropdownRef = useRef<HTMLDivElement>(null);
	const [dropdownLeft, setDropdownLeft] = useState(true);
	const isDark = useThemeStore((store) => store.isDark);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (ref.current && !ref.current.contains(event.target as Node)) {
				setOpen(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () =>
			document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	useEffect(() => {
		if (open && btnRef.current && dropdownRef.current) {
			const btnRect = btnRef.current.getBoundingClientRect();
			const menuWidth = dropdownRef.current.offsetWidth || 240;
			if (btnRect.right + menuWidth + 8 > window.innerWidth) {
				setDropdownLeft(false);
			} else {
				setDropdownLeft(true);
			}
		}
	}, [open]);

	return (
		<div className={styles.menuWrapper} ref={ref}>
			<button
				className={styles.menuButton}
				ref={btnRef}
				onClick={() => setOpen((v) => !v)}
				style={{
					outline: "none",
				}}
			>
				<span
					className={styles.dot}
					style={{ background: isDark ? "#8C8C96" : "#888" }}
				></span>
				<span
					className={styles.dot}
					style={{ background: isDark ? "#8C8C96" : "#888" }}
				></span>
				<span
					className={styles.dot}
					style={{ background: isDark ? "#8C8C96" : "#888" }}
				></span>
			</button>
			{open && (
				<div
					ref={dropdownRef}
					className={styles.dropdown}
					style={{
						background: isDark ? "#23222B" : "#fff",
						color: isDark ? "#fff" : "#23222B",
					}}
				>
					<button
						style={{
							color: isDark ? "#fff" : "#23222B",
							background: "transparent",
						}}
						onMouseEnter={(e) =>
							(e.currentTarget.style.background = isDark
								? "#3A3A47"
								: "#f0f0f0")
						}
						onMouseLeave={(e) =>
							(e.currentTarget.style.background = "transparent")
						}
						onClick={onDelete}
					>
						삭제하기
					</button>

					<button
						style={{
							color: isDark ? "#fff" : "#23222B",
							background: "transparent",
						}}
						onMouseEnter={(e) =>
							(e.currentTarget.style.background = isDark
								? "#3A3A47"
								: "#f0f0f0")
						}
						onMouseLeave={(e) =>
							(e.currentTarget.style.background = "transparent")
						}
						onClick={onShare}
					>
						{shared ? "공유 중지하기" : "공유하기"}
					</button>
				</div>
			)}
		</div>
	);
}
