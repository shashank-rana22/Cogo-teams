import { Pagination } from '@cogoport/components';

import LoadingState from '../../../../../../common/LoadingState';

import ListCard from './ListCard';
import styles from './styles.module.css';

function ListObjectiveUserMappings(props) {
	const { list, listLoading, control, formValues, getNextPage, paginationData } = props;

	const { page = 1, page_limit = 0, total_count = 0 } = paginationData || {};

	if (listLoading) {
		return (
			<div className={styles.loading_state_container}>
				<LoadingState loadingRows={3} />
			</div>
		);
	}

	return (
		<div className={styles.container}>
			{list.map((item) => (
				<ListCard
					key={item.user_id}
					objectiveUserMappingData={item}
					control={control}
					formValues={formValues}
				/>
			))}

			<div className={styles.pagination_container}>
				<Pagination
					type="table"
					currentPage={page}
					totalItems={total_count}
					pageSize={page_limit}
					onPageChange={getNextPage}
				/>
			</div>
		</div>
	);
}

export default ListObjectiveUserMappings;
