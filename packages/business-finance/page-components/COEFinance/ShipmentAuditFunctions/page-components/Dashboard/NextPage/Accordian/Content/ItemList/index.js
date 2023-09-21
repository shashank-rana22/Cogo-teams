import { Table } from '@cogoport/components';
import React from 'react';

import getServiceColumns from '../../../../../ConfigurationTab/getServiceColumns';

const dummy = [
	{
		document1 : 'hello1',
		document2 : 'hello2',
		document3 : 'hello3',
		document4 : 'hello4',
		document5 : 'hello5',
		document6 : 'hello6',
		document7 : 'hello7',
		document8 : 'hello8',
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
