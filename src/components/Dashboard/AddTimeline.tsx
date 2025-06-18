import styles from "../../style/AddTimeline.module.css";
import { useThemeStore } from "../../store/themeStore";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { ko } from "date-fns/locale";
import { format } from "date-fns";
import { useState } from "react";
import styled from "styled-components";

type CancelProps = {
	isDark: boolean;
};
const Cancel = styled.div<CancelProps>`
	width: 118px;
	height: 50px;
	border-radius: 10px;
	display: flex;
	align-items: center;
	justify-content: center;
	color: ${({ isDark }) => (isDark ? "#CCC" : "#999")};

	&:hover {
		background-color: ${({ isDark }) => (isDark ? "#444" : "#EEE")};
	}
`;

type TimelineProject = {
	title: string;
	start_date: Date;
	end_date: Date;
};

type AddTimelineProps = {
	setAllProjects: React.Dispatch<React.SetStateAction<TimelineProject[]>>;
	setAdd: (val: boolean) => void;
};
export default function AddTimeline({
	setAllProjects,
	setAdd,
}: AddTimelineProps) {
	const isDark = useThemeStore((store) => store.isDark);
	const [showCalendar, setShowCalendar] = useState(false);
	const [project, setProject] = useState("");
	const [range, setRange] = useState([
		{
			startDate: new Date(),
			endDate: new Date(),
			key: "selection",
		},
	]);

	const handleAdd = () => {
		setAllProjects((prev) => [
			...prev,
			{
				title: project,
				start_date: range[0].startDate!,
				end_date: range[0].endDate!,
			},
		]);
		setAdd(false);
	};

	return (
		<div
			className={styles.container}
			style={{
				backgroundColor: isDark ? "#181822" : "#FFFFFF",
				color: isDark ? "#FFF" : "#000",
			}}
		>
			<div
				className={styles.header}
				style={{
					borderBottom: `0.5px solid ${
						isDark ? "#555555" : "#CCCCCC"
					}`,
				}}
			>
				타임라인 추가하기
			</div>
			<div className={styles.inputContainer}>
				<div className={styles.label}>할 일</div>
				<input
					className={styles.nameInputBox}
					style={
						isDark
							? {
									backgroundColor: "#22222E",
									border: "1px solid #333",
									color: "#FFF",
							  }
							: {
									backgroundColor: "rgba(245, 246, 248, 50%)",
									border: "1px solid #EEE",
									color: "#000",
							  }
					}
					value={project}
					onChange={(e) => setProject(e.target.value)}
				/>
			</div>
			<div className={styles.inputContainer}>
				<div className={styles.label}>기간</div>
				<div
					className={styles.dateInputBox}
					style={
						isDark
							? {
									backgroundColor: "#22222E",
									border: "1px solid #333",
									color: "#888",
							  }
							: {
									backgroundColor: "rgba(245, 246, 248, 50%)",
									border: "1px solid #EEE",
									color: "#666",
							  }
					}
					onClick={(e) => {
						e.stopPropagation();
						setShowCalendar((pre) => !pre);
					}}
				>
					<img src="/images/calendar.svg" alt="달력" />
					<div>
						{format(range[0].startDate, "yyyy.MM.dd")} ~{" "}
						{format(range[0].endDate, "yyyy.MM.dd")}
					</div>
				</div>
				{showCalendar && (
					<DateRange
						className={styles.calender}
						ranges={range}
						onChange={(item) =>
							setRange([
								{
									startDate:
										item.selection.startDate ?? new Date(),
									endDate:
										item.selection.endDate ?? new Date(),
									key: item.selection.key ?? "selection",
								},
							])
						}
						locale={ko}
						moveRangeOnFirstSelection={false}
						rangeColors={["#8734FD"]}
						direction="vertical"
						showDateDisplay={false}
					/>
				)}
			</div>
			<div className={styles.btnContainer}>
				<Cancel
					isDark={isDark}
					className={styles.cancel}
					onClick={() => setAdd(false)}
				>
					취소하기
				</Cancel>
				<div className={styles.submit} onClick={handleAdd}>
					확인하기
				</div>
			</div>
		</div>
	);
}
