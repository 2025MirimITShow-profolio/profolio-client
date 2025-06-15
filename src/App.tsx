import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Start from "./pages/Start";
import Main from "./pages/Main";
import Member from "./pages/Member";
import ProjectIntroduce from "./pages/ProjectIntroduce";

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Start />} />
				<Route path="/profolio" element={<Main />} />
				<Route path="/introduce" element={<ProjectIntroduce />} />
				<Route path="/member" element={<Member />} />
			</Routes>
		</Router>
	);
}

export default App;
