import { Pagination } from '@cogoport/components';

import tableColumns from '../../configurations/budget-allocation-table-colum';
import StyledTableComponent from '../StyledTableComponent';

import formattedData from './FormattedData';
import styles from './styles.module.css';

const ZERO = 0;

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
	const pageSize = paginationData ? paginationData.page_limit : ZERO;
	const currentPage = paginationData ? paginationData?.page : ZERO;
	const totalItems = paginationData ? paginationData?.total_count : ZERO;
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
					pageSize={pageSize}
					currentPage={currentPage}
					totalItems={totalItems}
					onPageChange={(val) => {
						setPagination({ ...pagination, page: val });
					}}
				/>
			</div>
		</div>
	);
}

export default BudgetAllocate;
