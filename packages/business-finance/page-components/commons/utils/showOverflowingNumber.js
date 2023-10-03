import { Tooltip } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

function ShowOverflowingNumber({ value = '-', maxLength = 0 }) {
	const newValue = (value) || '';

	if (String(newValue).length > maxLength) {
		return (
			<Tooltip content={newValue} interactive>
				<div>
					{(newValue).substring(GLOBAL_CONSTANTS.zeroth_index, maxLength)}
					...
				</div>
			</Tooltip>
		);
	}
	return <div>{newValue}</div>;
}

export default ShowOverflowingNumber;
