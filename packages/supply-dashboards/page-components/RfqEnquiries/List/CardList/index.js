import { Pagination } from '@cogoport/components';

import Header from './Header';
import List from './List';
import styles from './styles.module.css';

function CardList({
	fields, list, loading, filters, hookSetters,
}) {
	return (
		<div className={styles.cardlist}>
			<Header columns={fields} />
			{list?.data.map((item) => (<List fields={fields} item={item} loading={loading} />))}
			<div className={styles.pagination}>
				<Pagination
					type="table"
					currentPage={filters.page}
					totalItems={list?.total}
					pageSize={10}
					handlePageChange={(val) => { hookSetters.setFilters({ ...filters, page: val }); }}
				/>
			</div>

		</div>

	);
}
export default CardList;
