import React from 'react';

interface ItemTypes {
	createdAt:string,
}
interface PropsType {
	itemData:ItemTypes;
}
function DateWithTime({ itemData }:PropsType) {
	const { createdAt } = itemData || {};
	return (
		<div>
			{createdAt}
		</div>
	);
}

export default DateWithTime;
