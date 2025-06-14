import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Start from "./pages/Start";
import Main from "./pages/Main";
import Member from "./pages/Member";
import ProjectIntroduce from "./pages/ProjectIntroduce";
import AllProject from "./pages/AllProject";
import Dashboard from "./pages/Dashboard";
import ProjectList from "./pages/ProjectList";

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Start />} />
				<Route path="/profolio" element={<Main />} />
				<Route path="/introduce" element={<ProjectIntroduce />} />
        		<Route path="/member" element={<Member />} />
				<Route path="/project/:project_id" element={<AllProject/>}/>
				<Route path="/" element={<Dashboard />} />\
				<Route path="Project" element={<ProjectList />} />
			</Routes>
		</Router>
	);
}

export default App;
