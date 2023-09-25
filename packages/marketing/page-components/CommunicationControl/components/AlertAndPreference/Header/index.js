import { Select } from '@cogoport/components';
import { useState } from 'react';

import styles from './styles.module.css';

const START_INDEX = 0;
const WORD_LENGTH = 1;

function Header({
	orgName = '', options = {},
}) {
	const [value, setValue] = useState('');
	return (
		<div className={styles.container}>
			<div className={styles.company}>
				<h2 className={styles.logo}>{orgName?.slice(START_INDEX, WORD_LENGTH)}</h2>
				<h2 className={styles.name}>{orgName}</h2>
			</div>
			<div className={styles.input_container}>
				<h3 style={{ marginBottom: 0 }}>Select Users</h3>
				<Select
					value={value}
					options={options}
					isClearable
					onChange={setValue}
					label="Select Users"
					placeholder="select your fav"
				/>
			</div>
		</div>
	);
}
export default Header;
