import React, { useState, useMemo, useEffect, useRef } from "react";
import SideBar from "../components/SideBar";
import ProjectCircleNav from "../components/Project/ProjectCircleNav";
import ProjectMainInfo from "../components/Project/ProjectMainInfo";
import ProjectAddButton from "../components/Project/ProjectAddButton";
import ProjectAddModal from "../components/Project/ProjectAddModal";
import ProjectDeleteModal from "../components/Project/ProjectDeleteModal";
import "../style/ProjectListPage.css";
import Header from "../components/Header";

interface Project {
	id: number;
	name: string;
	description: string;
}

const initialProjects: Project[] = [
	{
		id: 1,
		name: "Profolio",
		description: "프로젝트와 포트폴리오를 한번에 관리할 수 있는 팀 서비스",
	},
	{
		id: 2,
		name: "GulLap",
		description:
			"문해력이 부족한 MZ세대를 위하여 문학작품에서 발췌한 글을 통해 언어학습을 돕는 앱",
	},
	{
		id: 3,
		name: "Momenpick!",
		description:
			"디자이너와 개발자의 공감을 담은 프레임과 여름 감성 프레임으로, ITShow에 방문한 사람들이 추억을 간직할 수 있는 인생네컷 촬영 서비스",
	},
	{ id: 4, name: "Sample Project", description: "샘플 프로젝트 설명" },
	{ id: 5, name: "Test Project", description: "테스트 프로젝트 설명" },
	{ id: 6, name: "Final Project", description: "마지막 프로젝트 설명" },
	{ id: 7, name: "Sample Project", description: "샘플 프로젝트 설명" },
	{ id: 8, name: "Test Project", description: "테스트 프로젝트 설명" },
	{ id: 9, name: "Final Project", description: "마지막 프로젝트 설명" },
	{ id: 10, name: "Sample Project", description: "샘플 프로젝트 설명" },
	{ id: 11, name: "Test Project", description: "테스트 프로젝트 설명" },
	{ id: 12, name: "Final Project", description: "마지막 프로젝트 설명" },
	{ id: 13, name: "Sample Project", description: "샘플 프로젝트 설명" },
	{ id: 14, name: "Test Project", description: "테스트 프로젝트 설명" },
	{ id: 15, name: "Final Project", description: "마지막 프로젝트 설명" },
];

const ProjectList = () => {
	const [projects, setProjects] = useState<Project[]>(initialProjects);
	const [angle, setAngle] = useState(0); // 회전 각도
	const [search, setSearch] = useState("");
	const [addOpen, setAddOpen] = useState(false);
	const wheelCooldown = useRef(false);
	const [deleteOpen, setDeleteOpen] = useState(false);
	const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null);

	const filteredProjects = useMemo(
		() =>
			projects.filter((p) =>
				p.name.toLowerCase().includes(search.toLowerCase())
			),
		[projects, search]
	);

	// 중앙(270도)에 가장 가까운 프로젝트 인덱스 계산
	const centerIdx = useMemo(() => {
		if (filteredProjects.length === 0) return 0;
		let minDiff = 9999;
		let minIdx = 0;
		for (let i = 0; i < filteredProjects.length; i++) {
			const theta = (360 / filteredProjects.length) * i;
			let diff = Math.abs(((((angle + theta) % 360) + 360) % 360) - 270);
			if (diff > 180) diff = 360 - diff;
			if (diff < minDiff) {
				minDiff = diff;
				minIdx = i;
			}
		}
		return minIdx;
	}, [angle, filteredProjects.length]);

	const centerProject = filteredProjects[centerIdx];

	// 프로젝트 추가
	const handleCreate = (name: string, description: string) => {
		setProjects((prev) => [...prev, { id: Date.now(), name, description }]);
		setAddOpen(false);
	};

	// 삭제
	const handleDelete = (id: number) => {
		setDeleteTargetId(id);
		setDeleteOpen(true);
	};

	const handleDeleteConfirm = () => {
		if (deleteTargetId !== null) {
			setProjects((prev) => prev.filter((p) => p.id !== deleteTargetId));
		}
		setDeleteOpen(false);
		setDeleteTargetId(null);
	};

	const handleDeleteCancel = () => {
		setDeleteOpen(false);
		setDeleteTargetId(null);
	};

	// 공유
	const handleShare = (id: number) => {
		alert(`프로젝트 ${id} 공유!`);
	};

	// 반원에서 인덱스 클릭 시 해당 각도로 이동
	const handleCircleChange = (idx: number) => {
		const theta = (360 / filteredProjects.length) * idx;
		setAngle(-theta + 270);
	};

	// window wheel 이벤트로 angle을 계속 증가/감소
	useEffect(() => {
		const onWheel = (e: WheelEvent) => {
			if (filteredProjects.length === 0) return;
			if (wheelCooldown.current) return;
			wheelCooldown.current = true;
			setTimeout(() => {
				wheelCooldown.current = false;
			}, 30); // 부드럽게
			setAngle((prev) => prev + e.deltaY * 0.25); // 감도 조절
		};
		window.addEventListener("wheel", onWheel, { passive: false });
		return () => window.removeEventListener("wheel", onWheel);
	}, [filteredProjects.length]);

	return (
		<div className="projectlist-container">
			<div
				style={{
					position: "relative",
					zIndex: 1000,
					background: "#f7f7fa",
				}}
			>
				<SideBar />
			</div>
			<div className="projectlist-header-wide">
				<Header />
			</div>

			<div className="projectlist-main-wide">
				<div>
					<ProjectAddButton onClick={() => setAddOpen(true)} />
				</div>
				<section className="projectlist-circle-section-wide">
					<ProjectCircleNav
						count={filteredProjects.length}
						activeIdx={centerIdx}
						onChange={handleCircleChange}
						angle={angle}
					/>
					{centerProject && (
						<ProjectMainInfo
							name={centerProject.name}
							description={centerProject.description}
							onDelete={() => handleDelete(centerProject.id)}
							onShare={() => handleShare(centerProject.id)}
						/>
					)}
					<ProjectDeleteModal
						open={deleteOpen}
						onCancel={handleDeleteCancel}
						onConfirm={handleDeleteConfirm}
					/>
				</section>
				<ProjectAddModal
					open={addOpen}
					onClose={() => setAddOpen(false)}
					onCreate={handleCreate}
				/>
			</div>
		</div>
	);
};

export default ProjectList;
