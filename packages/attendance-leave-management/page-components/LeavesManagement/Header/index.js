import { Select } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import React from 'react';

import styles from './styles.module.css';

function Header({ formattedData = [], selectedMonth = '', setSelectedMonth = () => {} }) {
	const handleMonthChange = (val, obj) => {
		setSelectedMonth({
			month : obj.label.split(' ')[GLOBAL_CONSTANTS.zeroth_index],
			value : val,
		});
	};

	return (
		<div className={styles.container}>
			<div>
				<div className={styles.header_text}>Leave Management</div>
				<div>View and manage your leave request</div>
			</div>
			<div className={styles.select_container}>
				<Select
					value={selectedMonth.value || ''}
					onChange={handleMonthChange}
					placeholder="Select Month"
					options={formattedData}
					size="md"
				/>
			</div>
		</div>
	);
}

export default Header;
