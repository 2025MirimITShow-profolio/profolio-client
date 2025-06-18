import { useEffect, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import workerSrc from "pdfjs-dist/build/pdf.worker.min.js?url";
import axios from "axios";
import styles from "../../style/PdfFileView.module.css";
import { FiEdit, FiUpload } from "react-icons/fi";
import { useThemeStore } from "../../store/themeStore";

pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;

export default function PdfFileView({
	projectId,
	readonly,
}: {
	projectId: number;
	readonly: boolean;
}) {
	const isDark = useThemeStore((store) => store.isDark);
	const fileInputRef = useRef<HTMLInputElement | null>(null);
	const [pdfUrl, setPdfUrl] = useState<string | null>(null);
	const [numPages, setNumPages] = useState<number | null>(null);
	const [openedMenu, setOpenedMenu] = useState(false);

	console.log(`project_id : ${projectId}`);

	useEffect(() => {
		const getPdf = async () => {
			try {
				const response = await axios.get(
					`${import.meta.env.VITE_BASE_URL}/portfolio/${projectId}`,
					{
						responseType: "blob",
					}
				);

				if (response.data?.type === "application/json") {
					setPdfUrl(null);
				} else {
					setPdfUrl(URL.createObjectURL(response.data));
				}
			} catch (err) {
				console.error(err);
			}
		};
		getPdf();
	}, [projectId]);

	const handleUploadClick = () => {
		fileInputRef.current?.click();
	};

	const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];

		if (!file || file.type !== "application/pdf") {
			alert("PDF 파일만 업로드할 수 있습니다.");
			return;
		}

		const formData = new FormData();
		formData.append("portfolio", file);
		formData.append("project_id", String(projectId));

		try {
			await axios.post(
				`${import.meta.env.VITE_BASE_URL}/portfolio`,
				formData,
				{
					headers: { "Content-Type": "multipart/form-data" },
				}
			);

			const response = await axios.get(
				`${import.meta.env.VITE_BASE_URL}/portfolio/${projectId}`,
				{
					responseType: "blob",
				}
			);

			if (response.data?.type === "application/json") {
				setPdfUrl(null);
			} else {
				setPdfUrl(URL.createObjectURL(response.data));
			}
		} catch (err) {
			console.error(err);
			alert("포트폴리오 업로드 실패");
		}
	};

	const handleDelete = async () => {
		try {
			await axios.delete(
				`${import.meta.env.VITE_BASE_URL}/portfolio/${projectId}`
			);
			setPdfUrl(null);
		} catch (err) {
			console.error(err);
			alert("포트폴리오 삭제 실패");
		}
	};

	function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
		setNumPages(numPages);
	}

	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			const target = e.target as HTMLElement;
			if (
				!target.closest(".log-menu-button") &&
				!target.closest(".log-menu-popup")
			) {
				setOpenedMenu(false);
			}
		};

		if (openedMenu) {
			document.addEventListener("click", handleClickOutside);
		}

		return () => {
			document.removeEventListener("click", handleClickOutside);
		};
	}, [openedMenu]);

	return (
		<>
			<style>{`
        .react-pdf__Page__annotations {
          display: none !important;
        }

        .${styles.PageContainer}::-webkit-scrollbar {
          width: 8px;
          height: 0;
        }
        
        .${styles.PageContainer}::-webkit-scrollbar-track {
          background: ${isDark ? "#383843" : "#EEEEEE"};
          border-radius: 5px;
        }
        
        .${styles.PageContainer}::-webkit-scrollbar-thumb {
          background: ${isDark ? "#6C6C73" : "#CCCCCC"};
          height: 130px;
          border-radius: 5px;
        }
      `}</style>

			<div>
				{pdfUrl ? (
					<div>
						{!readonly && (
							<div
								style={{
									position: "relative",
									display: "flex",
									justifyContent: "flex-end",
									marginTop: "45px",
								}}
							>
								<FiEdit
									size={31}
									color={isDark ? "#999" : "#777"}
									className="log-menu-button"
									style={{ cursor: "pointer" }}
									onClick={() => {
										setOpenedMenu(true);
									}}
								/>
								{openedMenu && (
									<button
										className="log-menu-popup"
										onClick={() => {
											handleDelete();
										}}
										style={{
											position: "absolute",
											right: "46px",
											backgroundColor: isDark
												? "#383843"
												: "#ffffff",
											color: isDark ? "white" : "black",
											boxShadow:
												"0 2px 10px rgba(0,0,0,0.1)",
											padding: "10px 26px",
											borderRadius: "5px",
											cursor: "pointer",
											zIndex: 10,
											fontSize: "16px",
											width: "109px",
										}}
									>
										삭제하기
									</button>
								)}
							</div>
						)}

						<div className={styles.PageContainer}>
							<Document
								file={pdfUrl}
								onLoadSuccess={onDocumentLoadSuccess}
								onLoadError={console.error}
							>
								{Array.from(
									new Array(numPages),
									(el, index) => (
										<Page
											key={`page_${index + 1}`}
											pageNumber={index + 1}
											width={1254}
											className={styles.Page}
										/>
									)
								)}
							</Document>
						</div>
					</div>
				) : (
					<div>
						<button
							onClick={readonly ? () => {} : handleUploadClick}
							className={styles.addFileBtn}
							style={{
								backgroundColor: isDark ? "#383843" : "white",
								border: isDark
									? "dashed 1px #777777"
									: "dashed 1px #eeeeee",
							}}
						>
							{readonly ? (
								<div style={{ marginBottom: "10px" }}>
									<p>아직 포트폴리오를 등록하지 않았습니다</p>
								</div>
							) : (
								<div style={{ marginBottom: "10px" }}>
									<FiUpload
										color="#999999"
										size={25}
										style={{
											margin: "auto",
											marginBottom: "20px",
										}}
									/>
									<p>클릭하여 포트폴리오 추가하기</p>
									<p>(PDF)</p>
								</div>
							)}
						</button>
						<input
							type="file"
							accept="application/pdf"
							ref={fileInputRef}
							onChange={handleFileChange}
							style={{ display: "none" }}
						/>
					</div>
				)}
			</div>
		</>
	);
}
