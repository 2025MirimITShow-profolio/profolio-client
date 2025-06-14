import DescriptionBox from "../components/Project/DescriptionBox";

export default function ProjectDescription({ projectId }: { projectId: number }) {

  return(
    <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-start',
      paddingTop: '67px',
      backgroundColor: '#F6F7FB',
    }}>
      <DescriptionBox projectId={projectId}/>
    </div>
  )
}