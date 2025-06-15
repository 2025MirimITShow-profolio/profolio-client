import { useState } from "react";
import axios from "axios";
import { useThemeStore } from "../../store/themeStore";
import { FiCalendar } from "react-icons/fi";
import { CiImageOn } from "react-icons/ci";
import { LiaPlusSolid } from "react-icons/lia";
import styles from "../../style/LogWrite.module.css"

type LogWriteProps = {
  onDone: () => void;
  projectId: number;
};

export default function LogWrite({ onDone, projectId }: LogWriteProps) {
  const isDark = useThemeStore((store) => store.isDark)
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [link, setLink] = useState('');
  const [images, setImages] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  const date = (new Date());

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const selectedFiles = Array.from(files);
    setImages(selectedFiles);

    const previews = selectedFiles.map((file) => URL.createObjectURL(file));
    setPreviewUrls(previews);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    images.forEach((file) => formData.append("files", file));
    formData.append("projectId", projectId.toString());
    formData.append("title", title);
    formData.append("links", JSON.stringify([link]));
    formData.append("content", content);

    try {
      await axios.post("http://localhost:3000/progress-log", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      onDone();
    } catch (error) {
      console.error(error);
      alert("진행과정 저장 실패");
    }
  };


  return (
    <div className={styles.container}>
      <div className={styles.mainbox}>
        <div>
          <p style={{
            color: '#bbbbbb',
            fontSize: '16px',
            fontWeight: '500',
            marginBottom: '8px'
          }}>제목</p>
          <input
            className={styles.titleinput}
            style={{
              backgroundColor: isDark? '#383843' : 'white',
              color: isDark? 'white' : 'black',
              border: isDark? 'solid 1px #555555' : 'solid 1px #eeeeee'
            }}
            value={title}
            placeholder="제목을 작성해주세요"
            onChange={(e) => setTitle(e.target.value)}
          >
          </input>
        </div>

        <div className={styles.date}
          style={{
            backgroundColor: isDark? '#383843' : 'white',
            color: isDark? '#999999' : '#666666',
            border: isDark? 'solid 1px #555555' : 'solid 1px #eeeeee',
          }}>
          <FiCalendar color="#999999" size={20} />
          {`${date.getFullYear()}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getDate().toString().padStart(2, '0')}`}
        </div>

        <div style={{display: 'flex', marginTop: '19px'}}>
          <input
            className={styles.linkinput}
            style={{
              backgroundColor: 'transparent',
              color: isDark? '#B886FF':'#8734FD',
              border: 'none',
            }}
            type="text"
            placeholder="링크 추가하기"
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
          
          <div style={{ marginLeft: 'auto', marginTop: '23px'}}>
            <label htmlFor="file-upload" className={styles.imageUploadBtn}
              style={{ backgroundColor: isDark? '#383843':'white' }}>
              <LiaPlusSolid size={18} color="#999999" />
              <CiImageOn size={26} color="#999999"/>
            </label>
            <input
              id="file-upload"
              type="file"
              multiple
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleImageChange}
            />
          </div>

        </div>


        <div>
          <textarea
            className={styles.textarea}
            style={{
              backgroundColor: isDark? '#383843' : 'white',
              color: isDark? 'white' : 'black',
              border: isDark? 'solid 1px #555555' : 'solid 1px #eeeeee'
            }}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="내용을 작성해주세요"
          />
        </div>
      </div>

      <div style={{display: 'flex', flexDirection: 'column'}}>
        <button
          onClick={handleSubmit}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            padding: '15px 26px',
            backgroundColor: '#8734FD',
            color: 'white',
            fontSize: '18px',
            border: 'none',
            borderRadius: '10px',
            cursor: 'pointer',
            zIndex: 10
          }}
        >
          완료하기
        </button>

        {previewUrls.length > 0 && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginTop: "15px" }}>
            {previewUrls.map((url, idx) => (
              <img
                key={idx}
                src={url}
                alt={`preview-${idx}`}
                style={{ width: "267px", objectFit: "cover", borderRadius: "8px" }}
              />
            ))}
          </div>
        )}

      </div>

    </div>
  )
}
