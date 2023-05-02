import { Pagination } from '@cogoport/components';

import EmptyState from '../../../commons/EmptyState';

import ListCard from './ListCard';
import styles from './styles.module.css';

export default function List({ data, stateProps }) {
	const { filters, setFilters } = stateProps;
	// const { list = [], total } = data;

	const renderPagination = (
		<Pagination
			type="table"
			// totalItems={total}
			pageSize={10}
			currentPage={filters.page}
			onPageChange={(val) => setFilters({ ...filters, page: val })}
		/>
	);

	return data?.list?.length === 0 ? <EmptyState /> : (
		<>
			{renderPagination}

			<div className={styles.list_container}>
				{(data?.list || []).map((item) => (
					<ListCard
						key={item?.id}
						item={item}
						bucket={stateProps?.bucket}
					/>
				))}

			</div>

			{renderPagination}
		</>
	);
}
