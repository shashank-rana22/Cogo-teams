import { Loader, Table } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import EmptyStateDocs from '../../../../../../commons/EmptyStateDocs/index.tsx';
import useListTickets from '../../../../../hook/useListTickets';

import styles from './styles.module.css';

function Tickets({
	serialId = '',
}) {
	const { tickets, loading } = useListTickets({ serialId });

	const columns = [
		{
			Header   : 'ID',
			accessor : 'ID',
		},
		{
			Header   : 'Raised by',
			accessor : (row) => row?.User?.name || '-',
		},
		{
			Header   : 'Priority',
			accessor : 'Priority',
		},
		{
			Header   : 'Type',
			accessor : 'Type',
		},
		{
			Header   : 'Reviewer Name',
			accessor : 'ReviewerName',
		},
		{
			Header   : 'Status',
			accessor : 'Status',
		},
	];

	if (loading) {
		return (
			<div className={styles.loader_main}>
				<Loader className={styles.loader} />
			</div>
		);
	}
	if (isEmpty(tickets)) {
		return <EmptyStateDocs />;
	}

	return (
		<div style={{ width: '1270px' }}>
			<Table columns={columns} data={tickets} />
		</div>
	);
}

export default Tickets;
