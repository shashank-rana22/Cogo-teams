// import { format } from '@cogoport/utils';
import React from 'react';

function DateWithTime({ itemData }) {
	const { createdAt } = itemData || {};
	return (
		<div>
			{/* {format(createdAt, 'hh:mma dd-mm-yyyy', {}, false)} */}
			{createdAt}
		</div>
	);
}

export default DateWithTime;
