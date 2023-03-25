/* eslint-disable no-param-reassign */
import { InputController } from '@cogoport/forms';
import React from 'react';

import styles from './styles.module.css';

export function Input({ prefix, suffix = null, renderValue = () => {}, ...rest }) {
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
