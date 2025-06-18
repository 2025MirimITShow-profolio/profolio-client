import { useEffect, useRef, useState } from "react";
import { useThemeStore } from "../store/themeStore";
import axios from "axios";
import styles from "../style/Feedback.module.css";
import { IoSend } from "react-icons/io5";

type Message = {
	role: "user" | "ai";
	content: string;
	timestamp: string;
};

export default function Feedback({ projectId }: { projectId: number }) {
	const isDark = useThemeStore((store) => store.isDark);
	const [messages, setMessages] = useState<Message[]>([
		{
			role: "ai",
			content: "안녕? 무엇을 도와줄까?",
			timestamp: new Date().toISOString(),
		},
	]);
	const [input, setInput] = useState("");
	const [loading, setLoading] = useState(false);
	const bottomRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const fetchMessages = async () => {
			try {
				const res = await axios.get(
					`${import.meta.env.VITE_BASE_URL}/ai-feedbacks/${projectId}`
				);
				setMessages([
					{
						role: "ai",
						content: "안녕? 무엇을 도와줄까?",
						timestamp: new Date().toISOString(),
					},
					...res.data.result,
				]);
			} catch (err) {
				console.error("채팅 불러오기 오류:", err);
			}
		};

		fetchMessages();
	}, [projectId]);

	useEffect(() => {
		// 메시지 올 때마다 스크롤 아래로
		bottomRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages]);

	const sendMessage = async () => {
		if (!input.trim()) return;

		const userMessage: Message = {
			role: "user",
			content: input,
			timestamp: new Date().toISOString(),
		};

		setMessages((prev) => [...prev, userMessage]);
		setInput("");
		setLoading(true);

		try {
			const res = await axios.post(
				`${import.meta.env.VITE_BASE_URL}/ai-feedbacks/${projectId}`,
				{
					prompt: input,
				}
			);

			const aiMessage: Message = res.data.result;
			setMessages((prev) => [...prev, aiMessage]);
		} catch (err) {
			console.error("메시지 전송 오류:", err);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className={styles.container}>
			<div className={styles.chatbox}>
				{messages.map((msg, i) => (
					<div
						key={i}
						className={
							msg.role === "user"
								? styles.chatUser
								: styles.chatAi
						}
					>
						<div
							className={styles.content}
							style={{
								backgroundColor: isDark ? "#6C6C73" : "white",
								color: isDark ? "white" : "black",
							}}
						>
							{msg.content}
						</div>
					</div>
				))}
				<div ref={bottomRef} />
			</div>
			<div
				className={styles.inputarea}
				style={{
					backgroundColor: isDark ? "#383843" : "white",
				}}
			>
				<input
					className={styles.input}
					placeholder="메시지를 입력하세요"
					value={input}
					onChange={(e) => setInput(e.target.value)}
					onKeyDown={(e) => e.key === "Enter" && sendMessage()}
					disabled={loading}
				/>
				<button
					className={styles.sendbtn}
					onClick={sendMessage}
					disabled={loading}
				>
					<IoSend color="#ffffff" size={24} />
				</button>
			</div>
		</div>
	);
}
