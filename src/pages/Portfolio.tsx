import { useThemeStore } from "../store/themeStore";
import PdfFileView from "../components/Project/PdfFileView";

export default function Portfolio({ projectId }: { projectId: number }) {
    const isDark = useThemeStore((store) => store.isDark)
    return (
        <div
            style={{
                flex: 1,
                display: 'flex',
                justifyContent: 'center',
                backgroundColor: isDark? '#181822':'#F6F7FB'
            }}
            >
            <PdfFileView projectId={projectId}/>
        </div>
    )
}
