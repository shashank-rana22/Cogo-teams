import { Pagination } from '@cogoport/components';

import ListCard from './ListCard';
import styles from './styles.module.css';

function ListObjectiveUserMappings(props) {
	const { list, control } = props;

	return (
		<div className={styles.container}>
			{list.map((item) => (
				<ListCard
					key={item.user?.id}
					objectiveUserMappingData={item}
					control={control}
				/>
			))}

			<div className={styles.pagination_container}>
				<Pagination
					type="table"
					currentPage={1}
					totalItems={1000}
					pageSize={5}
					// onPageChange={onPageChange2}
				/>
			</div>
		</div>
	);
}

export default ListObjectiveUserMappings;
