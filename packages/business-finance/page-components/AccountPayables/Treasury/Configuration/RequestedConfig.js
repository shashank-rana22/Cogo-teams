import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { getByKey } from '@cogoport/utils';
import React from 'react';

const RequestedConfig = ({ currency }) => [

	{
		Header   : 'Timestamp',
		id       : 'timestamp',
		accessor : (row) => (
			<div>
				{formatDate({
					date       : getByKey(row, 'createdAt'),
					dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
					timeFormat : GLOBAL_CONSTANTS.formats.time['hh:mm'],
					formatType : 'dateTime',
				})}
			</div>
		),
	},
	{
		Header   : 'Amount Requested',
		id       : 'amountRequested',
		accessor : (row) => (
			<div>
				{ formatAmount({
					amount  : getByKey(row, 'requestedAmount'),
					currency,
					options : {
						currencyDisplay : 'code',
						style           : 'currency',
					},
				})}

			</div>
		),
	},
	{
		Header   : 'Requested By',
		id       : 'requestedBy',
		accessor : (row) => (
			<div>
				{getByKey(row, 'requestedByName')}
			</div>
		),
	},

];

export default RequestedConfig;
