import { Table, Pagination } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import EmptyState from '../../../common/EmptyState';
import useListReimbursements from '../../../hooks/useListReimbursements';
import useUpdateReimbursements from '../../../hooks/useUpdateReimbursements';

import ActivityModal from './ActivityModal';
import getColumns from './getColumns';
import getColumnsManager from './getColumnsManager';
import styles from './styles.module.css';

function ExpenseHistory({ toggleValue }) {
	const { loading, data, setFilters, refetchlist } = useListReimbursements({ toggleValue });
	const { updateReiembursement } = useUpdateReimbursements();
	const { list, page, total_count, page_limit } = data || {};
	const [show, setShow] = useState(false);
	const [item, setItem] = useState({});
	const handleUpdate = (id, action) => {
		const payload = { id };
		console.log('action', action);
		updateReiembursement({ payload, action, refetchlist });
	};
	const handlePagination = (pageNumber) => {
		setFilters((prev) => ({
			...prev,
			page: pageNumber,
		}));
	};

	const handleClose = () => {
		setShow(false);
		setItem({});
	};

	const columns1 = getColumnsManager({ setShow, setItem, handleUpdate });
	const columns2 = getColumns({ setShow, setItem, handleUpdate });
	return (
		<div className={styles.sub_container}>
			<div className={styles.head}>
				<div className={styles.top_text_container}>

					<span className={styles.top_bold_text}>My expense history</span>
					<span className={styles.top_grey_text}>View all you expenses</span>

				</div>
			</div>
			{
				!isEmpty(list) || loading
					? (
						<div className={styles.container}>
							<Table columns={toggleValue ? columns2 : columns1} data={list || []} loading={loading} />
						</div>

					)
					:	<EmptyState />
			}
			<ActivityModal show={show} item={item} onClose={handleClose} />
			<Pagination
				type="table"
				currentPage={page}
				onPageChange={handlePagination}
				totalItems={total_count}
				pageSize={page_limit}
				className={styles.pagination_container}
			/>
		</div>
	);
}
export default ExpenseHistory;
