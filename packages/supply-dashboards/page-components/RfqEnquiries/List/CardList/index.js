import { Pagination } from '@cogoport/components';
import { IcMSearchlight } from '@cogoport/icons-react';

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
			{!loading && !(list?.data || []).length && (
				<div className={styles.empty_state}>
					<IcMSearchlight
						style={{ width: '300px', height: '200px' }}
					/>
					Sorry, We Could Not Find What You Were Looking For
				</div>

			)}
			{!loading && (list?.data || []).length === 10 && (
				<div className={styles.pagination}>
					<Pagination
						type="table"
						currentPage={filters.page}
						totalItems={list?.total}
						pageSize={10}
						handlePageChange={(val) => { hookSetters.setFilters({ ...filters, page: val }); }}
					/>
				</div>
			) }
		</div>

	);
}
export default CardList;
