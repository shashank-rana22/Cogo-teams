import { Radio } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

function RadioSelectPayrun({
	itemData = {},
	checkedRow = null,
	setCheckedRow = () => {},
}) {
	const { id } = itemData || {};
	const handleRadioChange = () => {
		if (isEmpty(checkedRow)) {
			setCheckedRow(itemData);
		} else {
			setCheckedRow(null);
			setCheckedRow(itemData);
		}
	};

	return (
		<div>
			<Radio
				name="selectRadio"
				disabled={itemData?.type === 'OVERSEAS'}
				checked={checkedRow?.id === id}
				onChange={handleRadioChange}
			/>
		</div>
	);
}

export default RadioSelectPayrun;
