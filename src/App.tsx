import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Start from "./pages/Start";
import Dashboard from "./pages/Dashboard";
import Portfolio from "./pages/Portfolio";
import Member from "./pages/Member";
import ProjectIntroduce from "./pages/ProjectIntroduce";
import Todo from "./pages/Todo";

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Start />} />
				<Route path="/introduce" element={<ProjectIntroduce />} />
        		<Route path="/member" element={<Member />} />
				<Route path="/dashboard" element={<Dashboard />} />
				<Route path="portfolio" element={<Portfolio />} />
				<Route path="/todo" element={<Todo />} />
			</Routes>
		</Router>
	);
}

export default App;
