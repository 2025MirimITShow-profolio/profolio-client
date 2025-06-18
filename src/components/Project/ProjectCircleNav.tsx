import React, { useState, useEffect, useMemo } from "react";
import styles from "../../style/ProjectCircleNav.module.css";
import { useThemeStore } from "../../store/themeStore";

interface ProjectCircleNavProps {
	count: number;
	activeIdx: number;
	onChange: (idx: number) => void;
	angle: number;
}

const SIDEBAR_WIDTH = 100;

export function ProjectCircleNav({
	count,
	activeIdx,
	onChange,
	angle,
}: ProjectCircleNavProps) {
	const isDark = useThemeStore((store) => store.isDark);

	// state로 창 크기에 따른 계산
	const [dimensions, setDimensions] = useState(() => {
		const h = window.innerHeight;
		const r = (h * 1.2) / 2;
		return {
			cx: SIDEBAR_WIDTH,
			cy: h / 2,
			radius: r,
			svgW: SIDEBAR_WIDTH + r + 200,
			svgH: h,
		};
	});

	useEffect(() => {
		const handleResize = () => {
			const h = window.innerHeight;
			const r = (h * 1.2) / 2;
			setDimensions({
				cx: SIDEBAR_WIDTH,
				cy: h / 2,
				radius: r,
				svgW: SIDEBAR_WIDTH + r + 200,
				svgH: h,
			});
		};
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	const { cx, cy, radius, svgW, svgH } = dimensions;

	// 각도 계산 (원 전체 360도를 균등 분배하여 0번 인덱스가 270도에 위치)
	const getTheta = (idx: number) => (360 / count) * idx - 270;

	// 현재 중앙에 가까운 인덱스 계산 (centerIdx)
	const centerIdx = useMemo(() => {
		if (count === 0) return 0;
		let minDiff = Infinity;
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
				{/* 숫자와 점 */}
				{Array.from({ length: count }).map((_, idx) => {
					const theta = getTheta(idx) + angle;
					const rad = (theta * Math.PI) / 180;
					const dotX = cx + radius * Math.cos(rad);
					const dotY = cy + radius * Math.sin(rad);
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
}
