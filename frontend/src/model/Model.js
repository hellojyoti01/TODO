import React from "react";
import s from "../css/model.module.css";
import { AiOutlineClose } from "react-icons/ai";
function Model({ model, setModel, focus, currentFocus }) {
	const handelClose = () => {
		setModel(!model);
	};
	return (
		<div className={s.container} onClick={handelClose}>
			<div className={s.wrapper}>
				<span className={s.close} onClick={handelClose}>
					<AiOutlineClose />
				</span>
				Todo Details
			</div>
		</div>
	);
}

export default Model;
