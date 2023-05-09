import { Pagination } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useContext } from 'react';

import EmptyState from '../../../common/EmptyState';
import KamDeskContext from '../../../context/KamDeskContext';
import Card from '../Card';

import styles from './styles.module.css';

function ShipmentList({ data = {}, loading }) {
	const { filters, setFilters } = useContext(KamDeskContext);

	const { data: apiData, error } = data;
	const { list = [], page, total_count, page_limit } = apiData;

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
			{!loading && (isEmpty(list) || !isEmpty(error)) ? <EmptyState /> : (
				<div>
					{renderPagination}
					{ list?.map((item) => <Card data={item} />)}
					{renderPagination}
				</div>
			)}
		</div>
	);
}

export default ShipmentList;
