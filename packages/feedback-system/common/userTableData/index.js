import { Table, Pagination, Modal, Button } from '@cogoport/components';
import { useState } from 'react';
import { isEmpty } from '@cogoport/utils';

import EmptyState from '../EmptyState';

import styles from './styles.module.css';

function UserTableData({
	columns,
	list = [],
	pagination,
	page_limit,
	setPagination,
	total_count,
	loading = false,
}) {
	if (isEmpty(list) && !loading) {
		return <EmptyState width="40%" height="50%" emptyText="No feedbacks found. Kindly check the filters." />;
	}

	const [openDetails, setopenDetails] = useState(false);

	const toggleModal = () => {
		setopenDetails(!openDetails);
	};

	const new_list = [
		{
			feedback_by : 'Purnendu Shekhar',
			kpi         : 4,
			month       : 'January',
			year        : '2023',
			details     : 'View Details',
		},
		{
			feedback_by : 'Purnendu Shekhar',
			kpi         : 4,
			month       : 'February',
			year        : '2023',
			details     : 'View Details',
		},
	];

	const new_columns = [
		{
			Header: 'Feedback by',
			accessor: ({ feedback_by = '' }) => (
				<div className={styles.column}>{feedback_by}</div>
			),
		},
		{
			Header: 'KPI',
			accessor: ({ kpi = '' }) => (
				<div className={styles.column}>{kpi}</div>
			),
		},
		{
			Header: 'Month',
			accessor: ({ month = '' }) => (
				<div className={styles.column}>{month}</div>
			),
		},
		{
			Header: 'Year',
			accessor: ({ year = '' }) => (
				<div className={styles.column}>{year}</div>
			),
		},
		{
			Header: ' ',
			accessor: ({ details = '' }) => (
				<div style={{ display: 'flex', justifyContent: 'center' }}>
					<button
						onClick={toggleModal}
						className={styles.details_button}
					>
						{details}
					</button>
				</div>
			),
		},
	];

	return (
		<div className={styles.table_container}>
			{new_list.length > 0 ?
				<Table
					// columns={columns}
					// data={list || []}
					columns={new_columns}
					data={new_list || []}
					loading={loading}
					loadingRowsCount={10}
					className={styles.table}
				/>
				: 
				<div className={styles.empty_container}>
					<EmptyState
					height={280}
					width={440}
					emptyText="No Data Found"
					textSize="24px"
					flexDirection="column"
				/>
				</div>
			}

			{total_count > 10 && (
				<div className={styles.pagination_container}>
					<Pagination
						type="table"
						currentPage={pagination}
						totalItems={total_count}
						pageSize={page_limit}
						onPageChange={setPagination}
					/>
				</div>
			)}

			<div className={styles.details_modal}>
				<Modal size="md" show={openDetails} onClose={toggleModal}>
					<Modal.Header title="View Feedback" />
					<Modal.Body>
						<div style={{ paddingBottom: '14px', color: '#4f4f4f' }}>Feedback</div>
						<div>
							et consectetur adipisicing elit. Quis, assumenda.
							Hic ipsam doloremque assumenda et soluta expedita
							consequuntur, voluptates tenetur rem obcaecati
							sapiente aliquam animi voluptas. Pariatur eaque aut sunt?
							Lorem ipsum, dolor sit amet consectetur
							adipisicing elit. Quis, assumenda. Hic ipsam doloremque assumenda
							et soluta expedita consequuntur,
							voluptates tenetur rem obcaecati sapiente aliquam animi voluptas.
							Pariatur eaque aut sunt?
						</div>
					</Modal.Body>
				</Modal>
			</div>
		</div>
	);
}

export default UserTableData;
