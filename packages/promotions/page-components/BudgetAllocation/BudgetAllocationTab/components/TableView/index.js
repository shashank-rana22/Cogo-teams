import { Table } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import EmptyState from '../EmptyState';

function TableView({
	loading = false,
	columns = [],
	formattedData = [],
}) {
	return (
		<div>
			{(!loading && isEmpty(formattedData)) ? (
				<EmptyState />
			) : (
				<Table loading={loading} columns={columns} data={formattedData} />
			)}
		</div>
	);
}

export default TableView;
