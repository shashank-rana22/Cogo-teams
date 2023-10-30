import completedColumn from '../configs/completed-table';
import requestedColumns from '../configs/pending-table';

const getColumns = (status, refetch) => {
	if (status === 'COMPLETED') {
		return completedColumn(refetch);
	}
	return (
		requestedColumns(refetch)
	);
};

export default getColumns;
