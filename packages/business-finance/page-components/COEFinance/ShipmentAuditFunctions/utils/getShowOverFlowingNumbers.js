import { Tooltip } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

import { getFormatAmount } from './getFormatAmount';

function ShowOverflowingNumber(value = '', maxLength = '', currency = '') {
	const formatter = new Intl.NumberFormat('en-IN');
	const newValue = formatter.format(value) || '';

	if (String(newValue).length > maxLength) {
		return (
			<Tooltip content={`${currency} ${value}`} interactive>
				<div>
					{`${currency} ${(newValue).substring(GLOBAL_CONSTANTS.zeroth_index, maxLength)}`}
					...
				</div>
			</Tooltip>
		);
	}
	return (
		<Tooltip content={`${currency} ${value}`} interactive>
			<div>
				{getFormatAmount(value, currency)}
			</div>
		</Tooltip>
	);
}

export default ShowOverflowingNumber;
