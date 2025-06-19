import axios from "axios";
import { useThemeStore } from "../store/themeStore";
import { useEffect, useState, useCallback } from "react";
import LogWrite from "../components/Project/LogWrite";
import { RxDotsVertical } from "react-icons/rx";
import LogView from "../components/Project/LogView";
import styles from '../style/ProgressLoog.module.css'

type LogItem = {
	id: number;
	title: string;
	content: string;
	links: string;
	images: string[];
	createdAt: string;
};

export default function ProgressLog({
	projectId,
	readonly,
}: {
	projectId: number;
	readonly: boolean;
}) {
	const isDark = useThemeStore((store) => store.isDark);
	const [isWriting, setIsWriting] = useState(false);
	const [logs, setLogs] = useState<LogItem[]>([]);
	const [selectedLog, setSelectedLog] = useState<LogItem | null>(null);
	const [openedMenuId, setOpenedMenuId] = useState<number | null>(null);

	const fetchLogs = useCallback(async () => {
		try {
			const res = await axios.get(
				`${
					import.meta.env.VITE_BASE_URL
				}/progress-log/project/${projectId}`
			);
			const sortedLogs = res.data.sort(
				(a: LogItem, b: LogItem) => b.id - a.id
			);
			setLogs(sortedLogs);
		} catch (err) {
			console.error(err);
		}
	}, [projectId]);

	useEffect(() => {
		fetchLogs();
	}, [fetchLogs]);

	const handleDelete = async (logId: number) => {
		try {
			await axios.delete(
				`${import.meta.env.VITE_BASE_URL}/progress-log/${logId}`
			);
			setLogs((prev) => prev.filter((log) => log.id !== logId));
		} catch (err) {
			console.error("삭제 실패", err);
		}
	};

	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			const target = e.target as HTMLElement;
			if (
				!target.closest(".log-menu-button") &&
				!target.closest(".log-menu-popup")
			) {
				setOpenedMenuId(null);
			}
		};

		if (openedMenuId !== null) {
			document.addEventListener("click", handleClickOutside);
		}

		return () => {
			document.removeEventListener("click", handleClickOutside);
		};
	}, [openedMenuId]);

	const toggleMenu = (logId: number) => {
		setOpenedMenuId((prev) => (prev === logId ? null : logId));
	};

	return (
		<div
			style={{
				width: "100%",
				backgroundColor: isDark ? "#181822" : "#F6F7FB",
				display: "flex",
				justifyContent: "center",
				paddingTop: "67px",
				height: '100%',
				overflow: 'scroll'
			}}
			className={styles.logBox}
		>
			<div>
				{isWriting ? (
					<div style={{ width: "100%", display: "flex" }}>
						<LogWrite
							onDone={() => {
								setIsWriting(false);
								fetchLogs();
							}}
							projectId={projectId}
						/>
					</div>
				) : selectedLog ? (
					<div style={{ width: "100%", display: "flex" }}>
						<LogView
							log={selectedLog}
							onClose={() => {
								setSelectedLog(null);
								fetchLogs();
							}}
						/>
					</div>
				) : (
					<div style={{ position: "relative" }}>
						<div
							style={{
								display: "flex",
								flexDirection: "column",
								gap: "20px",
								padding: "20px",
								minWidth: "70vw",
							}}
						>
							{logs.length === 0 ? (
								<div
									style={{
										color: "#777777",
										fontSize: "20px",
									}}
								>
									작성된 게시글이 없습니다
								</div>
							) : (
								<>
									{logs.map((log) => (
										<div
											key={log.id}
											style={{
												display: "flex",
												gap: "50px",
												width: "70vw",
												cursor: "pointer",
											}}
											onClick={() => setSelectedLog(log)}
										>
											<div
												style={{
													width: "355px",
													height: "201px",
													backgroundColor: "#ccc",
												}}
											>
												{log.images?.[0] && (
													<img
														src={log.images[0]}
														alt="preview"
														style={{
															width: "100%",
															height: "100%",
															objectFit: "cover",
														}}
													/>
												)}
											</div>
											<div
												style={{
													flex: 1,
													marginTop: "15px",
												}}
											>
												<div
													style={{
														display: "flex",
														gap: "25px",
														alignItems: "center",
													}}
												>
													<div
														style={{
															fontSize: "27px",
															fontWeight: "500",
															color: isDark
																? "white"
																: "black",
														}}
													>
														{log.title}
													</div>
													{!readonly && (
														<div
															style={{
																position:
																	"relative",
															}}
														>
															<RxDotsVertical
																size={17}
																color="#868686"
																className="log-menu-button"
																style={{
																	cursor: "pointer",
																}}
																onClick={(
																	e
																) => {
																	e.stopPropagation();
																	toggleMenu(
																		log.id
																	);
																}}
															/>
															{openedMenuId ===
																log.id && (
																<button
																	className="log-menu-popup"
																	onClick={(
																		e
																	) => {
																		e.stopPropagation();
																		handleDelete(
																			log.id
																		);
																	}}
																	style={{
																		position:
																			"absolute",
																		top: "-8px",
																		left: "24px",
																		backgroundColor:
																			isDark
																				? "#383843"
																				: "#ffffff",
																		color: isDark
																			? "white"
																			: "black",
																		boxShadow:
																			"0 2px 10px rgba(0,0,0,0.1)",
																		padding:
																			"10px 26px",
																		borderRadius:
																			"5px",
																		cursor: "pointer",
																		zIndex: 10,
																		fontSize:
																			"16px",
																		width: "109px",
																	}}
																>
																	삭제하기
																</button>
															)}
														</div>
													)}
												</div>
												<div
													style={{
														color: "#999",
														fontSize: "20px",
														marginTop: "15px",
														fontWeight: 400,
													}}
												>
													{log.createdAt.slice(0, 10)}
												</div>
											</div>
										</div>
									))}
								</>
							)}
						</div>

						{!readonly && (
							<button
								onClick={() => setIsWriting(true)}
								style={{
									position: "absolute",
									top: "20px",
									right: "-20px",
									padding: "15px 26px",
									backgroundColor: "#8734FD",
									color: "white",
									fontSize: "18px",
									border: "none",
									borderRadius: "10px",
									cursor: "pointer",
									zIndex: 10,
								}}
							>
								+ 작성하기
							</button>
						)}
					</div>
				)}
			</div>
		</div>
	);
}
