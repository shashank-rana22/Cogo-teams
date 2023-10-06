import completedColumn from '../configs/completed-table';
import pendingColumns from '../configs/pending-table';

const getColumns = (status, refetch) => {
	if (status === 'completed') {
		return completedColumn;
	}
	return (
		pendingColumns(refetch)
	);
};

export default getColumns;
