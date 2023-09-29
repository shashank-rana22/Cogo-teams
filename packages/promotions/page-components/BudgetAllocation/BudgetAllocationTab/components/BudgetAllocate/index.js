import { Pagination } from '@cogoport/components';

import tableColumns from '../../configurations/budget-allocation-table-colum';
import TableView from '../TableView';

import formattedData from './FormattedData';
import styles from './styles.module.css';

function BudgetAllocate({
	setSelectedDetails = () => {},
	setShowViewModal = () => {},
	promoBudgetList = [],
	paginationData = {},
	setPagination = () => {},
	loading = true,
	refetch = () => {},
}) {
	const { page_limit = 0, total_count = 0, page = 0 } = paginationData;

	return (
		<div className={styles.container}>
			<TableView
				columns={tableColumns}
				formattedData={
					formattedData({
						promoBudgetList,
						setShowViewModal,
						setSelectedDetails,
						refetch,
					}) || []
				}
				loading={loading}
			/>
			<div className={styles.pagination_container}>
				<Pagination
					type="table"
					pageSize={page_limit}
					currentPage={page}
					totalItems={total_count}
					onPageChange={(val) => {
						setPagination((p) => ({ ...p, page: val }));
					}}
				/>
			</div>
		</div>
	);
}

export default BudgetAllocate;
