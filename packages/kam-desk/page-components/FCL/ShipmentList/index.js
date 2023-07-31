import { Pagination } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useContext } from 'react';

import EmptyState from '../../../common/EmptyState';
import KamDeskContext from '../../../context/KamDeskContext';
import Card from '../Card';

import styles from './styles.module.css';

const PAGE_LIMIT = 10;

function RenderPagination({ filters = {}, page = 1, total_count = 10, page_limit = 10, setFilters = () => {} }) {
	return (
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
}

function ShipmentList({ data = {}, loading }) {
	const { filters, setFilters } = useContext(KamDeskContext);

	const { list = [], page, total_count, page_limit } = data || {};

	return !loading && isEmpty(list)
		? <EmptyState />
		: (
			<>
				{total_count > PAGE_LIMIT
					? (
						<RenderPagination
							filters={filters}
							page={page}
							total_count={total_count}
							setFilters={setFilters}
							page_limit={page_limit}
						/>
					) : null}

				{list?.map((item) => <Card data={item} key={item?.id} />)}

				{total_count > PAGE_LIMIT
					? (
						<RenderPagination
							filters={filters}
							page={page}
							total_count={total_count}
							setFilters={setFilters}
							page_limit={page_limit}
						/>
					) : null }

			</>
		);
}
export default ShipmentList;
