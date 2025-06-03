import { useEffect, useRef, useState } from "react"
import { Document, Page, pdfjs } from "react-pdf";
import workerSrc from 'pdfjs-dist/build/pdf.worker.min.js?url';
import axios from "axios";
import styles from "../../style/PdfFileView.module.css"

pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;

// 파일 추가 버튼 아이콘 추가 및 파일 삭제 버튼 추가 필요함!
export default function PdfFileView({projectId} : {projectId:number}){
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [numPages, setNumPages] = useState<number | null>(null);

  console.log(`project_id : ${projectId}`);

  useEffect(()=>{
    const getPdf = async () => {
      try{
        const response = await axios.get(`http://localhost:3000/api/portfolio/${projectId}`, {
          responseType: "blob",
        });


        if(response.data?.type === "application/json"){
          setPdfUrl(null);
        }
        else{
          setPdfUrl(URL.createObjectURL(response.data));
        }
      }
      catch(err){
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

    try{
      await axios.post(`http://localhost:3000/api/portfolio`, formData, {
        headers: {"Content-Type": "multipart/form-data"}
      });
      window.location.reload(); // 파일 저장 후 새로고침
    }
    catch(err){
      console.error(err);
      alert("포트폴리오 업로드 실패");
    }
  };

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  return (
    <>
      <style>{`
        .react-pdf__Page__annotations {
          display: none !important;
        }
      `}</style>
    <div>
      {pdfUrl? (
        <div style={{ height: '80vh', overflowY: 'scroll' }}>
          <Document
            file={pdfUrl}
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={console.error}
            className={styles.PageContainer}
          >
            {Array.from(new Array(numPages), (el, index) => (
              <Page key={`page_${index + 1}`}
                pageNumber={index + 1}
                width={1254}
                className={styles.Page}/>
            ))}
          </Document>
        </div>
      ) : (
        <div>
          <button onClick={handleUploadClick} className={styles.addFileBtn}>
            <p>클릭하여 포트폴리오 추가하기</p>
            <p>(PDF)</p>
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