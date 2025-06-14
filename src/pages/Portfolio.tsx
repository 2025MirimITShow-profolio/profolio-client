import ProjectMenu from "../components/ProjectMenu";
import PdfFileView from "../components/Project/PdfFileView";

export default function Portfolio() {
    return (
        <div
            style={{
                flex: 1,
                display: 'flex',
                justifyContent: 'center'
            }}
            >
            <PdfFileView projectId={7}/>
        </div>
    )
}