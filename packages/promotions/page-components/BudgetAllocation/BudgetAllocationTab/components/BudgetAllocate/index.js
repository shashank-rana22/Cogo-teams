import TablePagination from '../../common/TablePagination';
import tableColumns from '../../configurations/budget-allocation-table-colum';
import TableView from '../TableView';

import formattedData from './FormattedData';
import styles from './styles.module.css';

function BudgetAllocate({
	setSelectedDetails = () => {},
	setShowViewModal = () => {},
	promoBudgetList = [],
	paginationData = {},
	filters = {},
	setFilters = () => {},
	loading = true,
	refetch = () => {},
}) {
	return (
		<div className={styles.container}>
			<TablePagination filters={filters} setFilters={setFilters} data={paginationData} />
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
			<TablePagination filters={filters} setFilters={setFilters} data={paginationData} />
		</div>
	);
}

export default BudgetAllocate;
