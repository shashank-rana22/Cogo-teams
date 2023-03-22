import { InputController } from '@cogoport/forms';
import React from 'react';

import styles from './styles.module.css';

export function Input({ prefix, suffix = null, ...rest }) {
	return (
		<div className={styles.container}>
			<div className={styles.row}>
				<div className={styles.prefix}>{prefix}</div>
				<InputController {...rest} />
			</div>
			{suffix}
		</div>
	);
}

export default Input;
