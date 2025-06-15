import React, { useMemo } from "react";
import styles from "../../style/ProjectCircleNav.module.css";
import { useThemeStore } from "../../store/themeStore";

interface ProjectCircleNavProps {
	count: number;
	activeIdx: number;
	onChange: (idx: number) => void;
	angle: number;
}

const SIDEBAR_WIDTH = 100;

const ProjectCircleNav: React.FC<ProjectCircleNavProps> = ({
	count,
	activeIdx,
	onChange,
	angle,
}) => {
	const isDark = useThemeStore((store) => store.isDark);

	// 동적으로 화면 크기 계산 (반지름을 더 크게)
	const { cx, cy, radius, svgW, svgH } = useMemo(() => {
		const h = window.innerHeight;
		const r = (h * 1.2) / 2; // 기존 0.95에서 1.2로 확대
		return {
			cx: SIDEBAR_WIDTH,
			cy: h / 2,
			radius: r,
			svgW: SIDEBAR_WIDTH + r + 200,
			svgH: h,
		};
	}, []);

	// 원 전체(360도)에 균등 분배, 0번 인덱스가 270도(오른쪽 중앙)에 오도록
	const getTheta = (idx: number) => (360 / count) * idx - 270;

	// 중앙(270도)에 가장 가까운 프로젝트 인덱스 계산
	const centerIdx = useMemo(() => {
		if (count === 0) return 0;
		let minDiff = 9999;
		let minIdx = 0;
		for (let i = 0; i < count; i++) {
			const theta = (360 / count) * i;
			let diff = Math.abs(((((angle + theta) % 360) + 360) % 360) - 270);
			if (diff > 180) diff = 360 - diff;
			if (diff < minDiff) {
				minDiff = diff;
				minIdx = i;
			}
		}
		return minIdx;
	}, [angle, count]);

	return (
		<div
			className={styles.circleNavContainer}
			style={{ width: svgW, height: svgH }}
		>
			<svg
				width={svgW}
				height={svgH}
				className={styles.circleSvg}
				style={{ position: "absolute", left: 0, top: 0 }}
			>
				{/* 전체 원 */}
				<circle
					cx={cx}
					cy={cy}
					r={radius}
					fill="none"
					stroke={isDark ? "#A1A1B4" : "#e0dfe6"}
					strokeWidth="2"
					strokeLinecap="round"
					opacity={isDark ? 0.2 : 1}
					style={{
						transform: `rotate(${angle}deg)`,
						transformOrigin: `${cx}px ${cy}px`,
					}}
				/>
				{/* 숫자와 점: 원 전체에 균등 분배 */}
				{Array.from({ length: count }).map((_, idx) => {
					const theta = getTheta(idx) + angle;
					const rad = (theta * Math.PI) / 180;
					// 점 위치: 원의 경계선 위
					const dotX = cx + radius * Math.cos(rad);
					const dotY = cy + radius * Math.sin(rad);
					// 숫자 위치: 점보다 더 바깥쪽(간격 80px)
					const x = cx + (radius + 80) * Math.cos(rad);
					const y = cy + (radius + 80) * Math.sin(rad);
					const isCenter = idx === activeIdx;
					return (
						<g key={idx}>
							<text
								x={x}
								y={y}
								textAnchor="middle"
								alignmentBaseline="middle"
								fontSize="95px"
								fill={
									isCenter
										? isDark
											? "#fff"
											: "#23222B"
										: isDark
										? "#383843"
										: "#d1d1d1"
								}
								fontWeight={isCenter ? 900 : 700}
								className={styles.circleNumber}
								style={{
									cursor: "pointer",
									userSelect: "none",
									transition: "fill 0.2s",
								}}
								onClick={() => onChange(idx)}
							>
								{String(idx + 1).padStart(2, "0")}
							</text>
							<circle
								cx={dotX}
								cy={dotY}
								r={5}
								fill={
									isCenter
										? isDark
											? "#fff"
											: "#23222B"
										: isDark
										? "#383843"
										: "#d1d1d1"
								}
								opacity={isCenter ? 1 : 0.7}
								style={{
									cursor: "pointer",
									transition: "fill 0.2s",
								}}
								onClick={() => onChange(idx)}
							/>
						</g>
					);
				})}
			</svg>
		</div>
	);
};

export default ProjectCircleNav;
