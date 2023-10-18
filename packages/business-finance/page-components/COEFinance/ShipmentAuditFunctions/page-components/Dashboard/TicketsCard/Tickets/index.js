import { Button, Loader, Pagination, Pill, Table } from '@cogoport/components';
import Modals from '@cogoport/ticket-management/common/Modals';
import { isEmpty, startCase } from '@cogoport/utils';
import React, { useState } from 'react';

import EmptyStateDocs from '../../../../../../commons/EmptyStateDocs/index';
import useListTickets from '../../../../../hook/useListTickets';

import styles from './styles.module.css';

function Tickets({
	serialId = '',
}) {
	const [page, setPage] = useState(1);
	const { tickets, loading, pageData } = useListTickets({ serialId, page: page - 1 });
	const [modalData, setModalData] = useState({});
	const [showReassign, setShowReassign] = useState(false);

	const columns = [
		{
			Header   : 'ID',
			accessor : 'ID',
		},
		{
			Header   : 'Raised by',
			accessor : (row) => row?.User?.Name || '-',
		},
		{
			Header   : 'Priority',
			accessor : (row) => startCase(row?.Priority) || '-',
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
			accessor : (row) => {
				const status = row?.Status;
				if (status === 'unresolved') {
					return <Pill color="red">{status}</Pill>;
				}
				return <Pill color="green">{startCase(status)}</Pill>;
			},
		},
		{
			Header   : 'Action',
			accessor : (row) => (
				<Button
					themeType="secondary"
					onClick={() => setModalData({ ticketId: row?.ID })}
				>
					View
				</Button>
			),
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
		<div className={styles.content}>
			<Table columns={columns} data={tickets} />
			<Modals
				modalData={modalData}
				setModalData={setModalData}
				showReassign={showReassign}
				setShowReassign={setShowReassign}
			/>
			<div className={styles.pagination_container}>
				<Pagination
					type="table"
					currentPage={page}
					totalItems={pageData?.total}
					pageSize={10}
					onPageChange={(val) => setPage(val)}
				/>
			</div>
		</div>
	);
}

export default Tickets;
