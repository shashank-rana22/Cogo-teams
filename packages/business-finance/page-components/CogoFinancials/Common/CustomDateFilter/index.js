import { SingleDateRange } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import React from 'react';

import styles from './styles.module.css';

function CustomDateFilter({ customDate = new Date(), setCustomDate = () => {}, setIsDateVisible = () => {} }) {
	const handleChange = (date) => {
		const { startDate, endDate } = date || {};
		setCustomDate(date);

		if (startDate && endDate) {
			setIsDateVisible(false);
		}
	};
	return (
		<div className={styles.single_date_range}>
			<SingleDateRange
				placeholder="Enter Date"
				dateFormat={GLOBAL_CONSTANTS.formats.date['dd/MM/yyyy']}
				name="date"
				onChange={(e) => handleChange(e)}
				value={customDate}
				isPreviousDaysAllowed
			/>
		</div>
	);
}

export default CustomDateFilter;
