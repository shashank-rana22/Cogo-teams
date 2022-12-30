import React from 'react';

import getElementController from '../getController';

function Item(props) {
	const {
		type,
		control,
		span,
	} = props || {};
	const Element = getElementController(type);
	const flex = (span || 12) / 12;

	return (
		<div style={{ flex }}>
			<Element
				control={control}
				{...props}
			/>
		</div>
	);
}

export default Item;
