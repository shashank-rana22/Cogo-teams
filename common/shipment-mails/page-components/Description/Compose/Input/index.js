/* eslint-disable no-param-reassign */
import { InputController } from '@cogoport/forms';
import React from 'react';

import styles from './styles.module.css';

export function Input({ prefix, suffix = null, emailValue, setEmailValue, setValue, ...rest }) {
	const handleDelete = (item) => {
		const tempUserEmailArray = emailValue;
		tempUserEmailArray.forEach((ele, idx) => {
			if (ele === item) {
				emailValue.splice(idx, 1);
			}
		});
		setValue('toUserEmail', '');
		setEmailValue(tempUserEmailArray);
	};

	const renderValue = () => (emailValue || []).map((item) => (
		<div style={{ display: 'flex' }}>
			<div className={styles.value}>{item}</div>
			<div
				className={styles.cancel}
				role="button"
				tabIndex={0}
				onClick={() => handleDelete(item)}
			>
				x
			</div>
		</div>
	));

	return (
		<div className={styles.container}>
			<div className={styles.row}>
				<div className={styles.prefix}>{prefix}</div>

				<div className={styles.value_container}>{renderValue()}</div>

				<InputController {...rest} />
			</div>
			{suffix}
		</div>
	);
}

export default Input;
