import StyledTable from '../../../common/StyledTable';

import getColumns from './getColumns';
import styles from './styles.module.css';

const TABLE_EMPTY_TEXT = 'No data to show';

function LeaveRequestListing() {
	const columns = getColumns({ });
	return (
		<div className={styles.container}>
			<div>My Requests</div>
			<div>
				<StyledTable
					columns={columns}
					// data
					emptyText={TABLE_EMPTY_TEXT}
					loading={false}
				/>
			</div>
		</div>
	);
}

export default LeaveRequestListing;
