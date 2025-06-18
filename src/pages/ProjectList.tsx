import { useState, useMemo, useEffect, useRef } from "react";
import { ProjectCircleNav } from "../components/Project/ProjectCircleNav";
import ProjectMainInfo from "../components/Project/ProjectMainInfo";
import ProjectAddButton from "../components/Project/ProjectAddButton";
import ProjectAddModal from "../components/Project/ProjectAddModal";
import ProjectDeleteModal from "../components/Project/ProjectDeleteModal";
import "../style/ProjectListPage.css";
import AllProject from "./AllProject";
import { useThemeStore } from "../store/themeStore";
import ProfileOnly from "../components/ProfileOnly";
import axios from "axios";
import { useUserStore } from "../store/userStore";

const ProjectList = () => {
	const [projects, setProjects] = useState<Project[]>([]);
	const [angle, setAngle] = useState(0);
	const [search] = useState("");
	const [addOpen, setAddOpen] = useState(false);
	const wheelCooldown = useRef(false);
	const [deleteOpen, setDeleteOpen] = useState(false);
	const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null);
	const projectId = useUserStore((store) => store.projectId);
	const setProjectId = useUserStore((store) => store.setProjectId);
	const [centerProject, setCenterProject] = useState<Project | null>(null);

	const isDark = useThemeStore((state) => state.isDark);
	const token = useUserStore((store) => store.token);

	interface Project {
		id: number;
		title: string;
		description: string;
		is_shared: boolean;
	}

	useEffect(() => {
		document.body.style.overflow = "hidden";
		return () => {
			document.body.style.overflow = "";
		};
	}, []);

	const getProjects = async () => {
		try {
			const res = await axios.get(
				`${import.meta.env.VITE_BASE_URL}/projects`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			console.log(res.data);
			setProjects(res.data);
		} catch (e) {
			console.error("프로젝트 불러오기 실패 : ", e);
		} finally {
		}
	};

	const updateProject = async () => {
		try {
			const res = await axios.patch(
				`${import.meta.env.VITE_BASE_URL}/projects/${
					centerProject?.id
				}/status`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);

			getProjects();
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getProjects();
	}, []);

	const filteredProjects = useMemo(() => {
		if (!Array.isArray(projects)) return [];

		return projects.filter((p) =>
			p.title.toLowerCase().includes(search.toLowerCase())
		);
	}, [projects, search]);

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

	useEffect(() => {
		setCenterProject(filteredProjects[centerIdx]);
	}, [centerIdx, filteredProjects]);

	// 프로젝트 추가
	const handleCreate = (title: string, description: string) => {
		getProjects();
		setAddOpen(false);
	};

	// 삭제
	const handleDelete = (id: number) => {
		setDeleteTargetId(id);
		setDeleteOpen(true);
	};

	const handleDeleteConfirm = async () => {
		setDeleteOpen(false);
		setDeleteTargetId(null);
		await getProjects();
	};

	const handleDeleteCancel = () => {
		setDeleteOpen(false);
		setDeleteTargetId(null);
	};

	// 공유
	const handleShare = (id: number) => {
		updateProject();
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
			}, 30);
			setAngle((prev) => prev + e.deltaY * 0.25); // 감도 조절
		};
		window.addEventListener("wheel", onWheel, { passive: false });
		return () => window.removeEventListener("wheel", onWheel);
	}, [filteredProjects.length]);

	// 프로젝트 제목 클릭 시
	const handleProjectClick = (id: number) => {
		setProjectId(id);
	};

	if (projectId !== null) {
		return <AllProject key={projectId} projectId={projectId} />;
	}

	return (
		<>
			<div
				className={`projectlist-container${
					isDark ? "#18182" : "#F6F7FB"
				}`}
			>
				<div
					className="projectlist-header-wide"
					style={{
						position: "relative",
						zIndex: 1000,
						background: isDark ? "#181828" : "#F6F7FB",
					}}
				>
					<ProfileOnly />
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
								id={centerProject.id.toString()}
								title={centerProject.title}
								description={centerProject.description}
								onDelete={() => handleDelete(centerProject.id)}
								onShare={() => handleShare(centerProject.id)}
								shared={centerProject.is_shared}
								onTitleClick={() => {
									handleProjectClick(centerProject.id);
								}}
							/>
						)}
						<ProjectDeleteModal
							open={deleteOpen}
							onCancel={handleDeleteCancel}
							onConfirm={handleDeleteConfirm}
							projectId={deleteTargetId}
						/>
					</section>
					<ProjectAddModal
						open={addOpen}
						onClose={() => setAddOpen(false)}
						onCreate={handleCreate}
					/>
				</div>
			</div>
		</>
	);
};

export default ProjectList;
