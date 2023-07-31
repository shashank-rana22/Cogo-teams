import { Select } from '@cogoport/components';
import React, { useState } from 'react';

import styles from './styles.module.css';

const options = [
	{ label: 'Jan 2023', value: 'jan_2023' },
	{ label: 'Feb 2023', value: 'Feb_2023' },
	{ label: 'March 2023', value: 'march_2023' },
];

function Header() {
	const [monthWise, setMonthWise] = useState('march_2023');
	return (
		<div className={styles.container}>
			<div>
				<h2>Leave Management</h2>
				<div>view and manage your leave request</div>
			</div>
			<div className={styles.select_container}>
				<Select
					value={monthWise}
					onChange={setMonthWise}
					placeholder="Select Month"
					options={options}
					size="md"
				/>
			</div>
		</div>
	);
}

export default Header;
