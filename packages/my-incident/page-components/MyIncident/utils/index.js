import { Tooltip } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

const FIRST_INDEX = 1;

export const toTitleCase = (str) => {
	const titleCase = str
		.toLowerCase()
		.split(' ')
		.map((word) => word.charAt(GLOBAL_CONSTANTS.zeroth_index).toUpperCase() + word.slice(FIRST_INDEX))
		.join(' ');

	return titleCase;
};

export const showOverflowingNumber = (value, maxLength) => {
	const newValue = String(value) || '';

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
};
