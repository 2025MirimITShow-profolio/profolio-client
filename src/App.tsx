import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Start from "./pages/Start";
import Main from "./pages/Main";
import Member from "./pages/Member";
import ProjectIntroduce from "./pages/ProjectIntroduce";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Start />} />
				<Route path="/profolio" element={<Main />} />
				<Route path="/introduce" element={<ProjectIntroduce />} />
				<Route path="/member" element={<Member />} />
				<Route path="/login" element={<Login />} />
				<Route path="/signup" element={<SignUp />} />
			</Routes>
		</Router>
	);
}

export default App;
