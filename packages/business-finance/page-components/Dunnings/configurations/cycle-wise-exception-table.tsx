import { Button } from '@cogoport/components';
import React from 'react';

const cycleWiseExceptionTable = () => [
	{
		Header   : 'Cycle Name',
		id       : 'cycleName',
		accessor : 'cycleName',
	},
	{
		Header   : 'Type',
		id       : 'type',
		accessor : 'type',
	},
	{
		Header   : 'Frequency',
		id       : 'frequency',
		accessor : 'frequency',
	},
	{
		Header   : 'Created On',
		id       : 'createdOn',
		accessor : 'createdOn',
	},
	{
		Header   : 'Last Edited On',
		id       : 'lastEditedOn',
		accessor : 'lastEditedOn',
	},
	{
		Header   : '',
		id       : 'button',
		accessor : (row) => (
			<div>
				<Button>hy</Button>
			</div>

		),
	},
];

export default cycleWiseExceptionTable;
