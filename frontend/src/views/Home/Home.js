//@ts-ignore

import React, { useEffect } from "react";
import { useState } from "react";
import AddTodo from "../../components/AddTodo.js";
import TodoList from "../../components/TodoList.js";
import Model from "../../model/Model.js";
//@ts-ignore
import s from "../../css/home.module.css";
import axios from "axios";
function Home() {
	const [model, setModel] = useState(false);
	const [focus, currentFocus] = useState("");
	const [todoList, setTodoList] = useState([]);
	const [skip, setSkip] = useState(0);

	const fetchData = async () => {
		const { data } = await axios({
			method: "get",
			url: `/api/v1/todo/get?id=${skip}`,
		});
		console.log(data);
		if (data.status) {
			console.log(data.payload);
			let arr = [...data.payload];
			//@ts-ignore
			setTodoList([...arr]);
		}
	};

	console.log(todoList, "todo List");
	useEffect(() => {
		fetchData();
	}, [skip]);
	return (
		<div className={s.container}>
			{model ? (
				<Model
					model={model}
					setModel={setModel}
					focus={focus}
					currentFocus={currentFocus}
				/>
			) : (
				""
			)}
			<div className={s.wrapper}>
				<AddTodo
					model={model}
					setModel={setModel}
					focus={focus}
					currentFocus={currentFocus}
					todoList={todoList}
					setTodoList={setTodoList}
				/>
				<TodoList
					model={model}
					setModel={setModel}
					focus={focus}
					currentFocus={currentFocus}
					todoList={todoList}
					setTodoList={setTodoList}
					skip={skip}
					setSkip={setSkip}
				/>
			</div>
		</div>
	);
}

export default Home;
