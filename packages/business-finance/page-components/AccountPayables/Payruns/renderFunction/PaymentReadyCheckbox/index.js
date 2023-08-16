import { Checkbox } from '@cogoport/components';
import React from 'react';

function PaymentReadyCheckbox({
	itemData = {},
	selectedIds = [],
	setSelectedIds = () => {},
}) {
	const handleCheckboxChange = (event, id) => {
		const isChecked = event.target.checked;

		if (isChecked) {
			setSelectedIds((prevIds) => [...prevIds, id]);
		} else {
			setSelectedIds((prevIds) => prevIds.filter((selectedId) => selectedId !== id));
		}
	};
	return (
		<div>
			<Checkbox
				checked={selectedIds.includes(itemData?.id)}
				onChange={(event) => handleCheckboxChange(event, itemData?.id)}
			/>
		</div>
	);
}

export default PaymentReadyCheckbox;
