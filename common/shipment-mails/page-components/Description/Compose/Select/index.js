import { SelectController } from '@cogoport/forms';
import React from 'react';

import styles from './styles.module.css';

export function Select({ prefix, suffix = null, ...rest }) {
	return (
		<div className={styles.container}>
			<div className={styles.row}>
				<div className={styles.prefix}>{prefix}</div>
				<SelectController
					{...rest}
					theme="admin"
					className="primary md"
					caret={false}
				/>
			</div>
			{suffix}
		</div>
	);
}

export default Select;
