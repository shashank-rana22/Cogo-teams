import { Input } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

function InputComponent(props) {
	const { item = {}, otherFormattedData = {} } = props || {};

	return (
		<div>
			<div className={styles.single_header}>{item.label}</div>
			<div className={styles.sub_input}>
				<Input
					defaultValue={otherFormattedData[item?.key]}
					onChange={(value) => {
						const toKey = item.key;
						otherFormattedData[toKey] = value;
					}}
				/>
			</div>
		</div>
	);
}

export default InputComponent;
