import { Pagination } from '@cogoport/components';
import { IcMSearchlight } from '@cogoport/icons-react';

import Header from './Header';
import List from './List';
import styles from './styles.module.css';

function CardList({
	fields,
	list,
	loading,
	filters,
	hookSetters,
	headerRequired = true,
	paginationRequired = true,
	setSelectedRate = {},
	selectedRate,
}) {
	return (
		<div className={styles.cardlist}>
			{headerRequired
			&& <Header columns={fields} />}
			{(list || []).map((item) => (
				<div>
					<List
						fields={fields}
						item={item}
						loading={loading}
						headerRequired={headerRequired}
						setSelectedRate={setSelectedRate}
						selectedRate={selectedRate}
					/>
					{!headerRequired && <div className={styles.line} />}
				</div>
			))}
			{loading && ([1, 2, 3, 4, 5]).map((item) => (
				<div>
					{!headerRequired && <div className={styles.line} />}
					<List fields={fields} item={item} loading={loading} headerRequired={headerRequired} />
					{!headerRequired && <div className={styles.line} />}
				</div>
			))}
			{!loading && !(list || []).length && (
				<div className={headerRequired ? styles.empty_state : styles.small_empty_state}>
					<IcMSearchlight
						style={headerRequired ? { width: '300px', height: '200px' } : { width: '30px', height: '20px' }}
					/>
					Sorry, We Could Not Find What You Were Looking For
				</div>

			)}
			{!loading && (list || []).length === 10 && paginationRequired
				&& (
					<div className={styles.pagination}>
						<Pagination
							type="table"
							currentPage={filters?.page}
							totalItems={list?.total}
							pageSize={10}
							handlePageChange={(val) => { hookSetters.setFilters({ ...filters, page: val }); }}
						/>
					</div>
				)}
		</div>

	);
}
export default CardList;
