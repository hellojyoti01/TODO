import React, { useState, useEffect } from "react";

import { Routes, Route, useNavigate } from "react-router-dom";
import AuthProvider from "./context/Auth.provider";

import SignUP from "./views/sign_up";
import SignIn from "./views/sign_in/index";
import Home from "./views/Home/Home.js";
function App() {
	const [auth, setAuth] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		if (!auth) navigate("/sign_up");
	}, [auth]);

	return (
		<div>
			<AuthProvider>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/sign_in' element={<SignIn />} />
					<Route path='/sign_up' element={<SignUP />} />
				</Routes>
			</AuthProvider>
		</div>
	);
}

export default App;
