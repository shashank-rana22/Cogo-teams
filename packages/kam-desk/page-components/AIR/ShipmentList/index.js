import { Pagination } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useContext } from 'react';

import EmptyState from '../../../common/EmptyState';
import KamDeskContext from '../../../context/KamDeskContext';
import Card from '../Card';

import styles from './styles.module.css';

export default function ShipmentList({ data = {}, loading = false }) {
	const { filters, setFilters } = useContext(KamDeskContext);
	const { list = [], page, total_count, page_limit } = data;

	const renderPagination = (
		<div className={styles.pagination_container}>
			<Pagination
				type="table"
				currentPage={page}
				totalItems={total_count}
				pageSize={page_limit}
				onPageChange={(val) => setFilters({ ...filters, page: val })}
			/>
		</div>
	);

	return (
		<div>
			{!loading && isEmpty(list) ? <EmptyState /> : (
				<div>
					{renderPagination}
					{ list?.map((item) => <Card data={item} />)}
				</div>
			)}
		</div>
	);
}
