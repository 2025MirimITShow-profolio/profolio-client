import { useThemeStore } from "../store/themeStore";
import styled from "styled-components";
import styles from "../style/Header.module.css";
import { useEffect, useRef, useState } from "react";
import { disassemble } from "es-hangul";
import ProfileOnly from "./ProfileOnly";

const projects = [
	"키오스크 리디자인키오스크 리디자인키오스크 리디자인 키오스크 리디자인키오스크 리디자인키오스크 리디자인",
	"투두리스트",
	"프로폴리오",
	"투두리스트",
	"프로폴리오",
	"키오스크 리디자인",
	"투두리스트",
	"프로폴리오",
	"투두리스트",
	"프로폴리오",
];

export default function Header() {
	const isDark = useThemeStore((store) => store.isDark);
	const [search, setSearch] = useState("");
	const [project, setProject] = useState(projects);
	const [click, setClick] = useState(false);
	const searchRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (!search.trim()) {
			setProject(projects);
		} else {
			setProject(
				projects.filter((pro) =>
					disassemble(pro).includes(disassemble(search.trim()))
				)
			);
		}
	}, [search]);

	useEffect(() => {
		function clickOutside(e: MouseEvent) {
			if (
				searchRef.current &&
				!searchRef.current.contains(e.target as Node)
			) {
				setClick(false);
			}
		}
		document.addEventListener("mousedown", clickOutside);
		return () => {
			document.removeEventListener("mousedown", clickOutside);
		};
	}, []);

	return (
		<div
			className={styles.headerContainer}
			style={{
				backgroundColor: isDark
					? "#22222E"
					: "rgba(255, 255, 255, 50%)", // 여기 투명도 문제 있으면 조정 가능
			}}
		>
			<div
				className={styles.searchContainer}
				style={{ backgroundColor: isDark ? "#2B2B37" : "#F5F6F8" }}
				onClick={() => setClick(true)}
			>
				<div className={styles.searchBox}>
					<img
						src="/images/searchIcon.svg"
						alt="검색"
						className={styles.searchImg}
					/>
					<input
						ref={searchRef}
						value={search}
						onChange={(e) => setSearch(e.target.value)}
						placeholder="Searching Project"
						className={styles.searchInput}
					/>
				</div>
				{click && (
					<div
						className={styles.projectContainer}
						style={{ backgroundColor: isDark ? "#41414E" : "#fff" }}
					>
						{project.length > 0 ? (
							project.map((project, i) => (
								<p
									key={i}
									style={{
										color: isDark ? "#fff" : "#111111",
									}}
								>
									{project}
								</p>
							))
						) : (
							<p
								style={{
									color: isDark ? "#8C8C96" : "#888888",
								}}
							>
								프로젝트가 존재하지 않습니다.
							</p>
						)}
					</div>
				)}
			</div>
			<ProfileOnly />
		</div>
	);
}
