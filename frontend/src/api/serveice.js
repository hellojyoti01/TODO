import axios from "axios";

const auth = {
	logIn: () => {},
	signUp: (name, email, password) => {
		console.log(name, "name", email, "email", password, "password");
		let passWord = password + "";
		const emailRegex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
		//         ^ matches the starting of the sentence.

		// [a-zA-Z0-9+_.-] matches one character from the English alphabet (both cases), digits, “+”, “_”, “.” and, “-” before the @ symbol.

		// + indicates the repetition of the above-mentioned set of characters one or more times.

		// @ matches itself.

		// [a-zA-Z0-9.-] matches one character from the English alphabet (both cases), digits, “.” and “–” after the @ symbol.

		// $ indicates the end of the sentence
		const error = {
			message: "",
		};
		const Responce = {
			message: null,
		};

		function Validation(n, e, p) {
			if (!n || !e || !p) {
				error.message = "Field can not be empty !!";
				return false;
			}
			if (n.length <= 5) {
				error.message = "Name Must Be Greater Then 5";
				return false;
			}
			if (!emailRegex.test(e)) {
				error.message = "Invalid Email";
				return false;
			}
			if (p.length <= 5) {
				error.message = "Password Must Be Greater Then 5 ";
				return false;
			}
			if (p.length >= 10) {
				error.message = "Password Must Be Less Then 10";
				return false;
			}
			return true;
		}
		const sendData = async () => {
			const { data = null } = await axios({
				method: "post",
				url: "/api/v1/auth/sign_up",
				data: {
					name,
					email,
					password: passWord,
				},
			});

			if (data) {
				Responce.message = data;
			}
		};

		if (Validation(name, email, passWord)) {
			sendData();
			return {
				status: "success",
				message: Responce.message,
			};
		} else {
			return {
				status: "error",
				messgae: error.message,
			};
		}
	},
};

export { auth };
