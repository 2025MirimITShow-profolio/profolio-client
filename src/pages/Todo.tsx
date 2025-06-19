import { useEffect, useState } from "react";
import axios from "axios";
import Calendar from "../components/Project/Calendar";
import { useThemeStore } from "../store/themeStore";
import TodoBox from "../components/Project/TodoBox";
import { useUserStore } from "../store/userStore";

type Todo = {
	id: number;
	title: string;
	is_done: boolean;
	date: string;
};

export default function Todo({ projectId }: { projectId: number }) {
	const token = useUserStore((store) => store.token);
	const isDark = useThemeStore((store) => store.isDark);
	const [selectedDate, setSelectedDate] = useState(new Date());
	const [todos, setTodos] = useState<Todo[]>([]);

	useEffect(() => {
		const fetchTodos = async () => {
			const res = await axios.get(
				`${import.meta.env.VITE_BASE_URL}/tasks/project/${projectId}`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			setTodos(res.data);
		};
		fetchTodos();
	}, []);

	const handleAdd = async (title: string) => {
		const year = selectedDate.getFullYear();
		const month = String(selectedDate.getMonth() + 1).padStart(2, "0");
		const day = String(selectedDate.getDate()).padStart(2, "0");

		console.log(`${year}${month}${day}`);

		try {
			const res = await axios.post(
				`${import.meta.env.VITE_BASE_URL}/tasks`,
				{
					project_id: projectId,
					title,
					date: `${year}${month}${day}`,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			setTodos((prev) => [...prev, res.data]);
		} catch (err) {
			console.error("todo 추가 실패:", err);
		}
	};

	const handleCheck = async (id: number) => {
		const prevTodos = [...todos];

		setTodos((prev) =>
			prev.map((todo) =>
				todo.id === id ? { ...todo, is_done: !todo.is_done } : todo
			)
		);

		try {
			await axios.patch(
				`${import.meta.env.VITE_BASE_URL}/tasks/${id}/status`,
				null,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
		} catch (err) {
			console.error("todo 상태 변경 실패:", err);
			setTodos(prevTodos);
		}
	};

	const handleDelete = async (id: number) => {
		try {
			await axios.delete(`${import.meta.env.VITE_BASE_URL}/tasks/${id}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			setTodos((prev) => prev.filter((todo) => todo.id !== id));
		} catch (err) {
			console.error("todo 삭제 실패:", err);
		}
	};

	const handleEdit = async (id: number, newTitle: string) => {
		try {
			const res = await axios.patch(
				`${import.meta.env.VITE_BASE_URL}/tasks/${id}`,
				{
					title: newTitle,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			setTodos((prev) =>
				prev.map((todo) =>
					todo.id === id ? { ...todo, title: res.data.title } : todo
				)
			);
		} catch (err) {
			console.error("todo 수정 실패:", err);
		}
	};

	const formatDate = (yyyymmdd: string) => {
		const year = Number(yyyymmdd.slice(0, 4));
		const month = Number(yyyymmdd.slice(4, 6)) - 1;
		const day = Number(yyyymmdd.slice(6, 8));
		return new Date(year, month, day);
	};

	const filteredTodos = todos.filter(
		(todo) =>
			formatDate(todo.date).toDateString() === selectedDate.toDateString()
	);

	return (
		<div
			style={{
				display: "flex",
				justifyContent: "center",
				alignItems: "flex-start",
				paddingTop: "146px",
				backgroundColor: isDark ? "#181822" : "#F6F7FB",
				gap: "37px",
			}}
		>
			<Calendar onDateClick={setSelectedDate} />
			<TodoBox
				todos={filteredTodos}
				onAdd={handleAdd}
				onCheck={handleCheck}
				onDelete={handleDelete}
				onEdit={handleEdit}
			/>
		</div>
	);
}
