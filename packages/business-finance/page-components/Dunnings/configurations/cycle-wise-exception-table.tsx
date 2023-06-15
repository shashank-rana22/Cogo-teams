import { Button } from '@cogoport/components';
import React from 'react';

const cycleWiseExceptionTable = ({ setShowCycleExceptions }) => [
	{
		Header   : 'Cycle Name',
		id       : 'name',
		accessor : 'name',
	},
	{
		Header   : 'Type',
		id       : 'cycleType',
		accessor : 'cycleType',
	},
	{
		Header   : 'Frequency',
		id       : 'frequency',
		accessor : 'frequency',
	},
	{
		Header   : 'Created On',
		id       : 'createdAt',
		accessor : 'createdAt',
	},
	{
		Header   : 'Last Edited On',
		id       : 'updatedAt',
		accessor : 'updatedAt',
	},
	{
		Header   : '',
		id       : 'button',
		accessor : (row) => (
			<div>
				<Button
					size="md"
					themeType="secondary"
					onClick={() => { setShowCycleExceptions(true); }}
				>
					Manage Exceptions

				</Button>
			</div>

		),
	},
];

export default cycleWiseExceptionTable;
