import { Pagination } from '@cogoport/components';

import tableColumns from '../../configurations/budget-allocation-table-colum';
import StyledTableComponent from '../StyledTableComponent';

import formattedData from './FormattedData';
import styles from './styles.module.css';

function BudgetAllocate({
	setSelectedDetails = () => {},
	setShowViewModal = () => {},
	promoBudgetList = [],
	paginationData = {},
	setPagination = () => {},
	pagination = { page: 1 },
	loading = true,
	refetch = () => {},
}) {
	return (
		<div className={styles.container}>
			<StyledTableComponent
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
					pageSize={paginationData.page_limit}
					currentPage={paginationData?.page}
					totalItems={paginationData?.total_count}
					onPageChange={(val) => {
						setPagination({ ...pagination, page: val });
					}}
				/>
			</div>
		</div>
	);
}

export default BudgetAllocate;
