import { Pagination } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useContext } from 'react';

import EmptyState from '../../../common/EmptyState';
import KamDeskContext from '../../../context/KamDeskContext';
import Card from '../Card';

import styles from './styles.module.css';

function ShipmentList({ data = {}, loading }) {
	const { filters, setFilters } = useContext(KamDeskContext);

	const { list = [], page, total_count, page_limit } = data || {};

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

	return !loading && isEmpty(list)
		? <EmptyState />
		: (
			<>
				{renderPagination}

				{list?.map((item) => <Card data={item} key={item?.id} />)}

				{renderPagination}
			</>
		);
}

export default ShipmentList;
