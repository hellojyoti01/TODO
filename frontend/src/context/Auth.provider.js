import React, { useState } from "react";
import { createContext, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
const authContext = createContext("");
function Authprovider({ children }) {
	const [token, setToken] = useState(() => {
		const token = localStorage.getItem("token");
		if (token) {
			axios.defaults.headers.common["auth"] = token;
			return token;
		}
	});

	const toast = useToast();
	const navigate = useNavigate();

	const signUp = async (name, email, password) => {
		const { data } = await axios({
			method: "post",
			url: "/api/v1/auth/sign_up",
			data: {
				name,
				email,
				password,
			},
		});
		console.log(data, "data");
		if (data.status) {
			axios.defaults.headers.common["auth"] = data.paylode;
			// localStorage.setItem("token", data.paylode);
			// setToken(data.paylode);
			toast({
				title: "Account created.",
				description: "We've created your account for you. Logn In !!",
				status: "success",
				duration: 9000,
				isClosable: true,
			});
		} else {
			const { message } = data;
			return message;
		}
	};

	const signIn = (email, password) => {
		const err = {
			message: "",
		};
		const sendData = async () => {
			const { data } = await axios({
				method: "post",
				url: "/api/v1/auth/sign_in",
				data: {
					email,
					password,
				},
			});

			if (data.status) {
				setToken(data.paylode);
				localStorage.setItem("token", data.paylode);
				axios.defaults.headers.common["auth"] = data.paylode;
				console.log("login Sucess");
			} else {
				err.message = data;
			}
		};
		sendData();

		if (err.message) return err;
	};

	useEffect(() => {
		if (token) {
			const fetchUser = async () => {
				const { data } = await axios({
					method: "get",
					url: "/api/v1/who_am_i",
				});

				if (data.status) {
					navigate("/");
				} else {
					navigate("/sign_up");
				}
			};
			fetchUser();
		}
		navigate("/sign_up");
	}, [token]);

	//@ts-ignore
	const v = {
		setToken,
		signIn,

		signUp,
	};
	return (
		<>
			{/*@ts-ignore*/}
			<authContext.Provider value={v}>
				<>{children}</>
			</authContext.Provider>
		</>
	);
}

function useAuth() {
	const auth = useContext(authContext);
	return auth;
}
export { useAuth };
export default Authprovider;
