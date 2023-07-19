import { Select, Input } from '@cogoport/components';
import { useState, useEffect } from 'react';

import styles from './styles.module.css';

function RoleInput({ index, setEmails }) {
	const [role, setRole] = useState('');
	const [email, setEmail] = useState('');
	const [name, setName] = useState('');

	useEffect(() => {
		setEmails((prev) => ({ ...prev, [index]: { role, email, name } }));
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [role, email, name]);

	const options = [
		{ label: 'abc', value: 'def' },
	];
	return (
		<div className={styles.role_input}>
			<Select
				value={role}
				onChange={(val) => setRole(val)}
				placeholder="Select the Role"
				options={options}
				size="md"
				style={{ width: '400px' }}
			/>
			<Input type="email" placeholder="Enter  Email Id" value={email} onChange={setEmail} />
			<Input placeholder="Name" value={name} onChange={setName} />
		</div>
	);
}
export default RoleInput;
