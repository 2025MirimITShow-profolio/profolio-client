import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Start from "./pages/Start";
import Main from "./pages/Main";
import Dashboard from "./pages/Dashboard";
import Portfolio from "./pages/Portfolio";
import Member from "./pages/Member";
import ProjectIntroduce from "./pages/ProjectIntroduce";
import Todo from "./pages/Todo";
import ProjectDescription from "./pages/ProjectDescription";

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Start />} />
				<Route path="/profolio" element={<Main />} />
				<Route path="/introduce" element={<ProjectIntroduce />} />
        		<Route path="/member" element={<Member />} />
				<Route path="portfolio" element={<Portfolio />} />
				<Route path="/description" element={<ProjectDescription />} />
				<Route path="/todo" element={<Todo />} />
			</Routes>
		</Router>
	);
}

export default App;
