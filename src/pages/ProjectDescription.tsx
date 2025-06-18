import { useThemeStore } from "../store/themeStore";
import DescriptionBox from "../components/Project/DescriptionBox";

export default function ProjectDescription({ projectId, readonly }: { projectId: number, readonly: boolean }) {
  const isDark = useThemeStore((store) => store.isDark)

  return(
    <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-start',
      paddingTop: '67px',
      backgroundColor: isDark? '#181822':'#F6F7FB',
    }}>
      <DescriptionBox projectId={projectId} readonly={readonly}/>
    </div>
  )
}