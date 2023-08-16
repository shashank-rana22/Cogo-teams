import { SingleDateRange } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import React from 'react';

import styles from './styles.module.css';

function CustomDateFilter({ customDate = new Date(), setCustomDate = () => {} }) {
	return (
		<div className={styles.single_date_range}>
			<SingleDateRange
				placeholder="Enter Date"
				dateFormat={GLOBAL_CONSTANTS.formats.date['dd/MM/yyyy']}
				name="date"
				onChange={setCustomDate}
				value={customDate}
				isPreviousDaysAllowed
			/>
		</div>
	);
}

export default CustomDateFilter;
