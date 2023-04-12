import { format } from '@cogoport/utils';
import React from 'react';

function DateWithTime({ itemData }) {
	return (
		<div>
			{format(itemData?.date, 'hh:mma dd-mm-yyyy', {}, false)}
		</div>
	);
}

export default DateWithTime;
