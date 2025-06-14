import { useState } from "react"
import ProjectMenu from "../components/ProjectMenu"
import Portfolio from "./Portfolio"
import ProjectDescription from "./ProjectDescription"
import Todo from "./Todo"

export default function AllProject() {
    const [menu, setMenu] = useState(0)

    return (
        <>
            <ProjectMenu click={menu} setClick={setMenu}/>
            {menu===0 && 
                <Portfolio />
            }

            {menu===2 && 
                <ProjectDescription />
            }

            {menu===4 &&
                <Todo />
            }
        </>
    )
}