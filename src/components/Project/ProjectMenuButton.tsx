import React, { useState, useRef, useEffect } from "react";
import styles from "../../style/ProjectMenuButton.module.css";

interface ProjectMenuButtonProps {
	onDelete: () => void;
	onShare: () => void;
}

export default function ProjectMenuButton({
	onDelete,
	onShare,
}: ProjectMenuButtonProps) {
	const [open, setOpen] = useState(false);
	const ref = useRef<HTMLDivElement>(null);
	const btnRef = useRef<HTMLButtonElement>(null);
	const dropdownRef = useRef<HTMLDivElement>(null);
	const [dropdownLeft, setDropdownLeft] = useState(true);

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
				setDropdownLeft(false); // 왼쪽에 붙임
			} else {
				setDropdownLeft(true); // 오른쪽에 붙임
			}
		}
	}, [open]);

	return (
		<div className={styles.menuWrapper} ref={ref}>
			<button
				className={styles.menuButton}
				ref={btnRef}
				onClick={() => setOpen((v) => !v)}
			>
				<span className={styles.dot}></span>
				<span className={styles.dot}></span>
				<span className={styles.dot}></span>
			</button>
			{open && (
				<div
					ref={dropdownRef}
					className={styles.dropdown}
					style={
						dropdownLeft
							? {
									left: "calc(100% + 8px)",
									right: "auto",
									top: "-12px",
							  }
							: {
									left: "auto",
									right: "calc(100% + 8px)",
									top: "-12px",
							  }
					}
				>
					<button onClick={onDelete}>삭제하기</button>
					<button onClick={onShare}>공유하기</button>
				</div>
			)}
		</div>
	);
}
