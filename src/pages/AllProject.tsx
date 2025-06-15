import { useState } from "react"
import ProjectMenu from "../components/ProjectMenu"
import Portfolio from "./Portfolio"
import ProjectDescription from "./ProjectDescription"
import Todo from "./Todo"
import ProgressLog from "./ProgressLog"
import { useParams } from "react-router-dom"

export default function AllProject() {
    const [menu, setMenu] = useState(0)
    const {project_id} = useParams();
    const projectId = Number(project_id);

    return (
        <>
            <ProjectMenu click={menu} setClick={setMenu}/>
            {menu===0 && 
                <Portfolio projectId={projectId}/>
            }

            {menu===1 && 
                <ProgressLog projectId={projectId}/>
            }

            {menu===2 && 
                <ProjectDescription projectId={projectId}/>
            }

            {menu===4 &&
                <Todo projectId={projectId}/>
            }
        </>
    )
}