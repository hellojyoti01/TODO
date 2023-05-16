import React from "react";
import { useState, useEffect } from "react";
//@ts-ignore
import s from "../css/addtodo.module.css";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
function AddTodo({
	model,
	setModel,
	focus,
	currentFocus,
	todoList,
	setTodoList,
}) {
	const toast = useToast();
	const [todo, setTodo] = useState("");
	const [error, setError] = useState({
		message: "",
	});
	const handelAdd = () => {
		if (!todo) {
			return toast({
				title: `Add Your Task`,
				status: "warning",
				isClosable: true,
			});
		}

		const sendData = async () => {
			const { data } = await axios({
				method: "post",
				url: "/api/v1/todo/add",
				data: {
					description: todo,
				},
			});

			if (data.status) {
				const sendData = async () => {
					const { data } = await axios({
						method: "get",
						url: "/api/v1/todo/get",
					});
					if (data.status) {
						setTodoList([...data.payload]);
					} else {
						console.log(data, "get controller todo");
						toast({
							title: `Server Error`,
							position: "top-right",
							isClosable: true,
						});
					}
				};

				sendData();
				toast({
					title: `Task Add Successfully`,
					position: "top-right",
					isClosable: true,
				});
				setTodo("");
			} else {
				toast({
					title: `Server Down LogIn Again`,
					position: "top-right",
					isClosable: true,
					status: "warning",
				});
			}
			console.log(data, "Addd");
		};
		sendData();
	};
	//Debounceing Implement
	function debounce(func, timeout = 300) {
		let timer;
		return () => {
			clearTimeout(timer);
			timer = setTimeout(() => {
				func();
			}, timeout);
		};
	}

	//Change Regular executing process
	const processChange = debounce(() => handelAdd());
	useEffect(() => {
		if (error?.message) {
			toast({
				title: error?.message,
				status: "error",
				isClosable: true,
			});
		}
	}, [error]);

	return (
		<div className={s.container}>
			<div className={s.wrapper}>
				<input
					type='text'
					name='addtodo'
					id='addtodo'
					className={s.input}
					value={todo}
					onChange={(e) => setTodo(e.target.value)}
				/>
				<button
					className={s.button}
					style={{
						verticalAlign: "middle",
					}}
					onClick={processChange}>
					<span>Add</span>
				</button>
			</div>
		</div>
	);
}

export default AddTodo;
