import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Portfolio from "./pages/Portfolio";
import ProjectList from "./pages/ProjectList";

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Dashboard />} />
				<Route path="portfolio" element={<Portfolio />} />
				<Route path="Project" element={<ProjectList />} />
			</Routes>
		</Router>
	);
}

export default App;
