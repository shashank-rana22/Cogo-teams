import { Refetch } from '../common/interfaces';
import completedColumn from '../configs/completed-table';
import requestedColumns from '../configs/pending-table';

const getColumns = (status: string, refetch: Refetch) => {
	if (status === 'COMPLETED') {
		return completedColumn(refetch);
	}
	return (
		requestedColumns(refetch)
	);
};

export default getColumns;
