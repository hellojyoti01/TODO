import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import { ChakraProvider } from "@chakra-ui/react";
axios.defaults.baseURL = "http://localhost:6050";
const id = document.getElementById("root");
const root = ReactDOM.createRoot(id);
root.render(
	<React.StrictMode>
		<BrowserRouter>
			<ChakraProvider>
				<App />
			</ChakraProvider>
		</BrowserRouter>
	</React.StrictMode>
);
