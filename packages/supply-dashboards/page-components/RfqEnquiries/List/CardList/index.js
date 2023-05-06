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
	total,
	refetch,
}) {
	const loadingArray = headerRequired ? [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] : [1, 2, 3, 4, 5];
	return (
		<div className={styles.cardlist}>
			{headerRequired
			&& <Header columns={fields} />}
			{!loading && (list || []).map((item) => (
				<div>
					<List
						fields={fields}
						item={item}
						loading={loading}
						headerRequired={headerRequired}
						setSelectedRate={setSelectedRate}
						selectedRate={selectedRate}
						status={filters?.negotiation_status}
						refetch={refetch}
					/>
					{!headerRequired && <div className={styles.line} />}
				</div>
			))}
			{loading && (loadingArray).map((item) => (
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
			{!loading && total > 10 && paginationRequired
				&& (
					<div className={styles.pagination}>
						<Pagination
							type="table"
							currentPage={filters?.page}
							totalItems={total}
							pageSize={10}
							onPageChange={(val) => { hookSetters.setFilters({ ...filters, page: val }); }}
						/>
					</div>
				)}
		</div>

	);
}
export default CardList;
