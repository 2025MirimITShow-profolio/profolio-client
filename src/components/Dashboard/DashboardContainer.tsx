import SimpleBox from "./SimpleBox";
import Tasks from "./Tasks";
import Members from "./Members";
import DailyGoals from "./DailyGoals";
import ProjectTimeline from "./ProjectTimeline";
import styles from "../../style/DashboardContainer.module.css";
import axios from "axios";
import { useUserStore } from "../../store/userStore";
import { useEffect, useState } from "react";

const simpleItem = [
	{
		title: "진행 중인 프로젝트",
		src: "ongoingProject",
		count: 0,
		color: "#0070FF",
	},
	{
		title: "완료한 프로젝트",
		src: "projectsCompleted",
		count: 0,
		color: "#03D7C2",
	},
	{
		title: "해야 하는 일",
		src: "todo",
		count: 0,
		color: "#9385F7",
	},
	{
		title: "완료한 일",
		src: "done",
		count: 0,
		color: "#FE996B",
	},
];

export default function DashboardContainer() {
	const token = useUserStore((store) => store.token);
	const [simpleBox, setSimpleBox] = useState(simpleItem);
	const [updateState, setUpdateState] = useState(1);

	const getProjectCount = async () => {
		try {
			const res = await axios.get(
				`${import.meta.env.VITE_BASE_URL}/projects/counts`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			const data = res.data;
			const updatedBox = [...simpleBox];
			updatedBox[0].count = data.in_progress;
			updatedBox[1].count = data.completed;
			setSimpleBox(updatedBox);
		} catch (error) {
			console.log(error);
		}
	};
	const getTaskCount = async () => {
		try {
			const res = await axios.get(
				`${import.meta.env.VITE_BASE_URL}/tasks/counts`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			const data = res.data;
			const updatedBox = [...simpleBox];
			updatedBox[2].count = data.in_progress;
			updatedBox[3].count = data.completed;
			setSimpleBox(updatedBox);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getProjectCount();
		getTaskCount();
	}, []);
	useEffect(() => {
		console.log(simpleBox);
	}, [simpleBox]);

	useEffect(() => {
		getProjectCount();
		getTaskCount();
	}, [updateState]);

	return (
		<div className={styles.dashboardContainer}>
			<div className={styles.container}>
				<div className={styles.flexContainer}>
					{simpleBox.map((item, i) => (
						<SimpleBox key={i} item={item} />
					))}
				</div>
				<div className={styles.gridContainer}>
					<ProjectTimeline />
					<Tasks setUpdateState={setUpdateState} />
					<Members />
					<DailyGoals updateState={updateState} />
				</div>
			</div>
		</div>
	);
}
