import ProjectMenu from "../components/ProjectMenu";
import PdfFileView from "../components/Project/PdfFileView";

export default function Portfolio({ projectId }: { projectId: number }) {
    return (
        <div
            style={{
                flex: 1,
                display: 'flex',
                justifyContent: 'center',
                backgroundColor: '#F6F7FB'
            }}
            >
            <PdfFileView projectId={projectId}/>
        </div>
    )
}