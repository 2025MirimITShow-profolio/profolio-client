import { useState } from "react";
import SharedProjectMenu from "../components/SharedProjectMenu";
import Portfolio from "./Portfolio";
import ProjectDescription from "./ProjectDescription";
import ProgressLog from "./ProgressLog";

export default function SharedProjectDetail({ projectId }: { projectId: number }) {
	const [menu, setMenu] = useState(0);
  console.log(projectId)

	return (
		<>
			<SharedProjectMenu click={menu} setClick={setMenu} />
			{menu === 0 && <Portfolio projectId={projectId} readonly={true}/>}

			{menu === 1 && <ProgressLog projectId={projectId} readonly={true}/>}

			{menu === 2 && <ProjectDescription projectId={projectId} readonly={true}/>}
		</>
	);
}
