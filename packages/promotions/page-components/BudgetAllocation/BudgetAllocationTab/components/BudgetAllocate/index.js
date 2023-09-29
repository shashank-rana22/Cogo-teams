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
	setPagination = () => {},
	loading = true,
	refetch = () => {},
}) {
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
			<TablePagination setPagination={setPagination} paginationData={paginationData} />
		</div>
	);
}

export default BudgetAllocate;
