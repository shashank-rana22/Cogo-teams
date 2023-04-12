import { InputController } from '@cogoport/forms';
import React from 'react';

import styles from './styles.module.css';

export function Input({ prefix, suffix = null, emailValue, setEmailValue, setValue, setDeleteEmail, ...rest }) {
	const handleDelete = (item) => {
		setDeleteEmail(true);

		const tempEmailArray = emailValue;
		emailValue.forEach((ele, idx) => {
			if (ele === item) {
				tempEmailArray.splice(idx, 1);
			}
		});
		setEmailValue(tempEmailArray);
		setValue(rest?.name, '');
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

				{emailValue?.length > 0
					? <div className={styles.value_container}>{renderValue()}</div> : null}

				<InputController {...rest} />
			</div>
			{suffix}
		</div>
	);
}

export default Input;
