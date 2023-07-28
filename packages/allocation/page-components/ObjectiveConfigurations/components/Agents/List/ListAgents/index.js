import { Pagination } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import EmptyState from '../../../../../../common/EmptyState';
import LoadingState from '../../../../common/LoadingState';

import ListCard from './ListCard';
import styles from './styles.module.css';

function ListAgents(props) {
	const { setActiveMode, list, loading, refetch, paginationData, getNextPage, setRefCallback } = props;

	const { page, page_limit, total_count } = paginationData;

	if (loading) return <LoadingState loadingRows={5} />;

	if (isEmpty(list)) {
		return 			(
			<EmptyState
				flexDirection="column"
				height={400}
				width={700}
				textSize={24}
			/>
		);
	}

	return (
		<>
			{list.map((item) => (
				<ListCard
					key={item.id}
					item={item}
					setActiveMode={setActiveMode}
					refetch={refetch}
					setRefCallback={setRefCallback}
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
		</>
	);
}

export default ListAgents;
