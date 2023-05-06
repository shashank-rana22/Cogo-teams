import { Pagination } from '@cogoport/components';

import EmptyState from '../EmptyState';

import styles from './styles.module.css';

export default function List({ data, stateProps, Card, couldBeCardsCritical = false }) {
	const { filters, setFilters, activeTab } = stateProps;
	const { list = [], total } = data;

	const renderPagination = (
		<Pagination
			type="table"
			totalItems={total}
			pageSize={10}
			currentPage={filters.page}
			onPageChange={(val) => setFilters({ ...filters, page: val })}
		/>
	);

	return (
		list.length === 0 ? <EmptyState /> : (
			<>
				{renderPagination}

				<div className={styles.list_container}>
					{list.map((item) => (
						<Card
							key={item?.id}
							item={item}
							couldBeCardsCritical={couldBeCardsCritical}
							activeTab={activeTab}
						/>
					))}

				</div>

				{renderPagination}
			</>
		)
	);
}
