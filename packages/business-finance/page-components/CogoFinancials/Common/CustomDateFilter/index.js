import { SingleDateRange } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import React from 'react';

function CustomDateFilter({ customDate = new Date(), setCustomDate = () => {} }) {
	return (
		<div style={{ minWidth: '212px' }}>
			<SingleDateRange
				placeholder="Enter Date"
				dateFormat={GLOBAL_CONSTANTS.formats.date['dd/MM/yyyy']}
				name="date"
				onChange={setCustomDate}
				value={customDate}
			/>

		</div>
	);
}

export default CustomDateFilter;
