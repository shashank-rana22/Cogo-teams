import { Pagination } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useContext } from 'react';

import EmptyState from '../../../common/EmptyState';
import KamDeskContext from '../../../context/KamDeskContext';
import Card from '../Card';

import styles from './styles.module.css';

const PAGE_LIMIT = 10;

function ShipmentList({ data = {}, loading }) {
	const { filters, setFilters } = useContext(KamDeskContext);

	const { list = [], page, total_count, page_limit } = data || {};

	return !loading && isEmpty(list)
		? <EmptyState />
		: (
			<>
				{total_count > PAGE_LIMIT
					? (
						<div className={styles.pagination_container}>
							<Pagination
								type="table"
								currentPage={page}
								totalItems={total_count}
								pageSize={page_limit}
								onPageChange={(val) => setFilters({ ...filters, page: val })}
							/>
						</div>
					) : null}

				<ul className={styles.list}>
					{list?.map((item) => <li key={item?.id}><Card data={item} /></li>)}
				</ul>

				{total_count > PAGE_LIMIT
					? (
						<div className={styles.pagination_container}>
							<Pagination
								type="table"
								currentPage={page}
								totalItems={total_count}
								pageSize={page_limit}
								onPageChange={(val) => setFilters({ ...filters, page: val })}
							/>
						</div>
					) : null}
			</>
		);
}
export default ShipmentList;
