import { Select, Input } from '@cogoport/components';
import { useState } from 'react';

import styles from './styles.module.css';

function RoleInput() {
	const [value, setValue] = useState('');
	const options = [
		{ label: 'abc', value: 'def' },
	];
	return (
		<div className={styles.role_input}>
			<Select
				value={value}
				onChange={(val) => setValue(val)}
				placeholder="Select the Role"
				options={options}
				size="md"
				style={{ width: '400px' }}
			/>
			<Input placeholder="Enter  Email Id" />
		</div>
	);
}
export default RoleInput;
