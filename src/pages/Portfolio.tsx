import { useThemeStore } from "../store/themeStore";
import PdfFileView from "../components/Project/PdfFileView";

export default function Portfolio({ projectId, readonly }: { projectId: number, readonly: boolean }) {
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
            <PdfFileView projectId={projectId} readonly={readonly}/>
        </div>
    )
}
