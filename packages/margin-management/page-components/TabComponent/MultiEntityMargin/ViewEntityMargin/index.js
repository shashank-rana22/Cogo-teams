import { Loader, Table } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import EmptyState from '../../../../common/EmptyStateMargins';
import useGetEntityMargin from '../../../../hooks/useGetEntityMargin';

import getColumns from './getColumns';

function ViewEntityMargin({ showModal = {}, service = '' }) {
	const { data = {}, loading = false } = useGetEntityMargin({
		showModal,
		service,
	});

	const { margin_slabs = [] } = data?.margin || {};

	const columns = getColumns();

	if (loading) {
		return (
			<div style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 }}>
				<Loader
					size={40}
					borderWidth={2}
					spinBorderColor="#303B67"
					outerBorderColor="#dce1ff"
				/>
			</div>
		);
	}

	if (isEmpty(margin_slabs)) {
		return (
			<EmptyState emptyDataText="No Record Found, Kindly Create" />
		);
	}
	return (
		<Table data={margin_slabs} columns={columns} />
	);
}

export default ViewEntityMargin;
