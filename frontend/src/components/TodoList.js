import React from "react";
import { useState } from "react";

// @ts-ignore
import s from "../css/listtodo.module.css";
import { MdDelete } from "react-icons/md";
import { AiFillEdit } from "react-icons/ai";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import { FaGreaterThan } from "react-icons/fa";

function TodoList({
	model,
	setModel,
	focus,
	currentFocus,
	todoList,
	setTodoList,
	skip,
	setSkip,
}) {
	const [isEdit, setIsEdit] = useState(false);
	const [input, setInput] = useState("");
	const [current, setCurrent] = useState("");
	const toast = useToast();
	const handelEdit = (el) => {
		console.log(el);
		setCurrent(el._id);
		// setIsEdit(true);
	};
	const handelSave = async () => {
		const { data } = await axios({
			method: "put",
			url: `/api/v1/todo/${current}`,
			data: { description: input },
		});

		if (data.status) {
			setCurrent("");
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
				title: `Task Update Successfully`,
				position: "top-right",
				isClosable: true,
			});
		} else {
			toast({
				title: `Server Down Try Again`,
				position: "top-right",
				isClosable: true,
				status: "warning",
			});
		}
	};
	const handelInputChange = (e) => {
		setInput(e.target.value);
	};
	const handelOpen = () => {
		// setModel(!model);
	};
	const handelDelete = async (el) => {
		const { data } = await axios({
			method: "delete",
			url: `/api/v1/todo/${el._id}`,
		});

		if (data.status) {
			setCurrent("");
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
				title: `Task Delete Successfully`,
				position: "top-right",
				isClosable: true,
			});
		} else {
			toast({
				title: `Server Down Try Again`,
				position: "top-right",
				isClosable: true,
				status: "warning",
			});
		}
	};
	const handelPrev = () => {
		console.log(skip);
		setSkip(skip - 1);
	};
	const handelNext = () => {
		setSkip(skip + 1);
	};
	return (
		<div className={s.container}>
			<div className={s.wrapper}>
				{/*Open Model When User click todo*/}

				{todoList.length >= 1
					? todoList.map((_el) => {
							return (
								<li className={s.todo_list}>
									<span
										onClick={() => {
											if (_el._id == current) {
											} else {
												handelOpen();
											}
										}}>
										<input
											type='text'
											className={
												_el._id == current ? s.input_active : s.input_disble
											}
											value={
												_el._id == current && input ? input : _el.description
											}
											onChange={(e) => handelInputChange(e)}
										/>
									</span>

									<span className={s.edit}>
										<span className={s.editor_btn}>
											{!(_el._id.toString() === current) ? (
												<button
													className={s._edit}
													onClick={(el) => handelEdit(_el)}>
													<AiFillEdit />
												</button>
											) : (
												<button className={s._edit} onClick={handelSave}>
													Save
												</button>
											)}
										</span>

										<button
											className={s._delete}
											onClick={() => handelDelete(_el)}>
											<MdDelete />
										</button>
									</span>
								</li>
							);
					  })
					: ""}

				{/*Pagination */}

				<div className={s.pagination}>
					<button
						className={skip ? s.button_prev_dis : s.button_prev}
						onClick={handelPrev}>
						Prev{" "}
					</button>

					<button className={s.button_next} onClick={handelNext}>
						Next{" "}
					</button>
				</div>
			</div>
		</div>
	);
}

export default TodoList;
