import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Start from "./pages/Start";
import Dashboard from "./pages/Dashboard";
import Portfolio from "./pages/Portfolio";

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Start />} />
				<Route path="/dashboard" element={<Dashboard />} />
				<Route path="portfolio" element={<Portfolio />} />
			</Routes>
		</Router>
	);
}

export default App;
