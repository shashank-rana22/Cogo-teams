import { Loader, Pagination } from '@cogoport/components';

import EmptyState from '../../../commons/EmptyState';

import ListCard from './ListCard';
import styles from './styles.module.css';

export default function List({ data, loading, allFilters = {}, setAllFilters = () => {}, role = '' }) {
	const { filters } = allFilters;
	// const { list = [], total } = data;

	const renderPagination = (
		<Pagination
			type="table"
			// totalItems={total}
			pageSize={10}
			currentPage={filters.page}
			onPageChange={(val) => setAllFilters({
				...allFilters,
				filters: {
					...(allFilters.filters),
					page: val,
				},
			})}
		/>
	);

	if (loading) {
		return <Loader themeType="primary" />;
	}

	return data?.list?.length === 0 ? <EmptyState /> : (
		<>
			{renderPagination}

			<div className={styles.list_container}>
				{(data?.list || []).map((item) => (
					<ListCard
						key={item?.id}
						item={item}
						role={role}
						allFilters={allFilters}
					/>
				))}

			</div>

			{renderPagination}
		</>
	);
}
