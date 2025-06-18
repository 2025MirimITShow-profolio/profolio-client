import React, { useState, useEffect, useRef } from "react";
import styles from "../../style/ProjectCarousel.module.css";

interface Project {
	id: number;
	name: string;
	description?: string;
}

interface ProjectCarouselProps {
	projects: Project[];
	centerIdx: number;
	onCenterChange: (idx: number) => void;
	showClockNumbers?: boolean;
}

const ProjectCarousel: React.FC<ProjectCarouselProps> = ({
	projects,
	centerIdx,
	onCenterChange,
	showClockNumbers,
}) => {
	const [angle, setAngle] = useState(0);
	const containerRef = useRef<HTMLDivElement>(null);
	const [containerSize, setContainerSize] = useState(0);

	const projectCount = projects.length;

	// 반응형을 위한 반지름 계산
	useEffect(() => {
		const updateSize = () => {
			if (containerRef.current) {
				const size = containerRef.current.offsetWidth;
				setContainerSize(size);
			}
		};
		updateSize();
		window.addEventListener("resize", updateSize);
		return () => window.removeEventListener("resize", updateSize);
	}, []);

	const radius = containerSize * 0.4;
	const clockRadius = containerSize * 0.45;

	useEffect(() => {
		setAngle(-((360 / projectCount) * centerIdx));
	}, [centerIdx, projectCount]);

	const handleWheel = (e: React.WheelEvent) => {
		if (projectCount === 0) return;
		if (e.deltaY > 0) {
			onCenterChange((centerIdx + 1) % projectCount);
		} else if (e.deltaY < 0) {
			onCenterChange((centerIdx - 1 + projectCount) % projectCount);
		}
	};

	return (
		<div
			ref={containerRef}
			className={styles.carouselContainer}
			onWheel={handleWheel}
		>
			{showClockNumbers && containerSize > 0 && (
				<svg
					width={clockRadius * 2}
					height={clockRadius * 2}
					className={styles.clockSvg}
					style={{
						left: `calc(50% - ${clockRadius}px)`,
						top: `calc(50% - ${clockRadius}px)`,
					}}
				>
					<circle
						cx={clockRadius}
						cy={clockRadius}
						r={clockRadius - 18}
						fill="none"
						stroke="#e0dfe6"
						strokeWidth="2.5"
					/>
					{projects.map((_, idx) => {
						const theta = (360 / projectCount) * idx - 90;
						const x =
							clockRadius +
							(clockRadius - 38) *
								Math.cos((theta * Math.PI) / 180);
						const y =
							clockRadius +
							(clockRadius - 38) *
								Math.sin((theta * Math.PI) / 180);
						return (
							<text
								key={idx}
								x={x}
								y={y}
								textAnchor="middle"
								alignmentBaseline="middle"
								fontSize="2.2rem"
								fill="#e0dfe6"
								fontWeight="bold"
								style={{
									userSelect: "none",
									fontFamily: "inherit",
								}}
							>
								{String(idx + 1).padStart(2, "0")}
							</text>
						);
					})}
				</svg>
			)}
			<div
				className={styles.carousel}
				style={{ transform: `rotate(${angle}deg)` }}
			>
				{projects.map((project, idx) => {
					const theta = (360 / projectCount) * idx;
					const x = radius * Math.cos((theta * Math.PI) / 180);
					const y = radius * Math.sin((theta * Math.PI) / 180);
					const isCenter = idx === centerIdx;
					return (
						<div
							key={project.id}
							className={
								styles.projectItem +
								(isCenter ? " " + styles.center : "")
							}
							style={{
								transform: `translate(${x}px, ${y}px) rotate(${-angle}deg)`,
							}}
							onClick={() => onCenterChange(idx)}
						>
							{project.name}
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default ProjectCarousel;
