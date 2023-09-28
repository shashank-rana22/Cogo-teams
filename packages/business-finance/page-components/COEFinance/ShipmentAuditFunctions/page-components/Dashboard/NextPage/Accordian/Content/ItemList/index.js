import { Table } from '@cogoport/components';
import React from 'react';

import getServiceColumns from '../../../../../../configurations/getServiceColumns';

const dummy = [
	{
		document1 : 'hello123456',
		document2 : 1,
		document3 : 'Per BL',
		document4 : 100000000,
		document5 : 100,
		document6 : 111.01,
		document7 : 100000,
		document8 : 10.12345,
	},
];

export default function List() {
	const TABLE_COLUMNS = getServiceColumns();
	return (
		<div>
			<Table columns={TABLE_COLUMNS} data={dummy} />
		</div>
	);
}
