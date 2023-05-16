import React from "react";
import s from "../css/input.module.css";
function Input({ isEdit }) {
	return (
		<input
			type='text'
			className={!isEdit ? s.input_disble : s.input_active}
			// value={input}
			// onChange={(e) => handelInputChange(e)}
		/>
	);
}

export default Input;
