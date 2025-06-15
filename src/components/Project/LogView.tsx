import { useThemeStore } from "../../store/themeStore";
import { FiCalendar } from "react-icons/fi";
import styles from "../../style/LogWrite.module.css"

type LogItem = {
  id: number;
  title: string;
  content: string;
  links: string;
  images: string[];
  createdAt: string;
};

type LogViewProps = {
  log: LogItem;
  onClose: () => void;
};

export default function LogView({ log, onClose }: LogViewProps) {
  const isDark = useThemeStore((store) => store.isDark)

  let parsedLinks: string[] = [];

  if (Array.isArray(log.links)) {
    parsedLinks = log.links;
  } else if (typeof log.links === 'string') {
    try {
      parsedLinks = JSON.parse(log.links);
    } catch {
      if (log.links.trim()) parsedLinks = [log.links];
    }
  }

  function stripHtmlTags(html: string) {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    return tempDiv.textContent || tempDiv.innerText || "";
  }
  

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
          <div
            className={styles.titleinput}
            style={{
              backgroundColor: isDark? '#383843' : 'white',
              color: isDark? 'white' : 'black',
              border: isDark? 'solid 1px #555555' : 'solid 1px #eeeeee'
            }}
          >
            {log.title}
          </div>
        </div>

        <div className={styles.date}
          style={{
            backgroundColor: isDark? '#383843' : 'white',
            color: isDark? '#999999' : '#666666',
            border: isDark? 'solid 1px #555555' : 'solid 1px #eeeeee',
          }}>
          <FiCalendar color="#999999" size={20} />
          {log.createdAt}
        </div>

        {parsedLinks.length > 0 && (
          <div style={{display: 'flex', marginTop: '19px', marginBottom: '43px'}}>
            <a
              className={styles.linkinput}
              style={{
                backgroundColor: 'transparent',
                color: '#8734FD',
                border: 'none',
                textDecoration: 'underline'
              }}
              href={
                parsedLinks[0].startsWith('http') 
                  ? parsedLinks[0] 
                  : `https://${parsedLinks[0]}`
              }
              target="_blank"
              rel="noopener noreferrer"
            >
              {parsedLinks[0]}
            </a>
          </div>

        )}


        <div>
          <div
            className={styles.textarea}
            style={{
              backgroundColor: isDark? '#383843' : 'white',
              color: isDark? 'white' : 'black',
              border: isDark? 'solid 1px #555555' : 'solid 1px #eeeeee'
            }}>
            {stripHtmlTags(log.content)}
          </div>
        </div>
      </div>

      <div style={{display: 'flex', flexDirection: 'column'}}>
        <button
          onClick={onClose}
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
          돌아가기
        </button>

        {log.images.length > 0 && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginTop: "15px" }}>
            {log.images.map((url, idx) => (
              <img
                key={idx}
                src={url}
                alt={`logimg-${idx}`}
                style={{ width: "267px", objectFit: "cover", borderRadius: "8px" }}
              />
            ))}
          </div>
        )}

      </div>

    </div>
  )
}
