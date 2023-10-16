import React from 'react';

function DateWithTime({ itemData }) {
	const { createdAt } = itemData || {};
	return (
		<div>
			{createdAt}
		</div>
	);
}

export default DateWithTime;
