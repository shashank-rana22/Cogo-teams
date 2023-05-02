import { Pagination } from '@cogoport/components';

import Card from '../../page-components/FCL/Card';
import EmptyState from '../EmptyState';

import styles from './styles.module.css';

function List({ data, activeTab }) {
	const { list = [], total } = data;

	const renderPagination = (
		<Pagination
			type="table"
			totalItems={total}
			pageSize={10}
			currentPage="1"
			// onPageChange={(val) => setFilters({ ...filters, page: val })}
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
							// couldBeCardsCritical={couldBeCardsCritical}
							activeTab={activeTab}
						/>
					))}

				</div>

				{renderPagination}
			</>
		)
	);
}
export default List;
