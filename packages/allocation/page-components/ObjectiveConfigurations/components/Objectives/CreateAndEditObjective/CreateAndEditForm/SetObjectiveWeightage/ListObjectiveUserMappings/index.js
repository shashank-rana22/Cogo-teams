import { Pagination } from '@cogoport/components';

import ListCard from './ListCard';
import styles from './styles.module.css';

function ListObjectiveUserMappings(props) {
	const { list, control, formValues, getNextPage, paginationData } = props;

	const { page, page_limit, total_count } = paginationData || {};

	return (
		<div className={styles.container}>
			{list.map((item) => (
				<ListCard
					key={item.user?.id}
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
