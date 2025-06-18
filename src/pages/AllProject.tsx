import { useState } from "react";
import ProjectMenu from "../components/ProjectMenu";
import Portfolio from "./Portfolio";
import ProjectDescription from "./ProjectDescription";
import Todo from "./Todo";
import ProgressLog from "./ProgressLog";
import Feedback from "./Feedback";

export default function AllProject({ projectId }: { projectId: number }) {
	const [menu, setMenu] = useState(0);

	return (
		<>
			<ProjectMenu click={menu} setClick={setMenu} />
			{menu === 0 && <Portfolio projectId={projectId} />}

			{menu === 1 && <ProgressLog projectId={projectId} />}

			{menu === 2 && <ProjectDescription projectId={projectId} />}

			{menu === 3 && <Feedback projectId={projectId} />}

			{menu === 4 && <Todo projectId={projectId} />}
		</>
	);
}
