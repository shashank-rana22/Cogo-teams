import { Pagination } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import EmptyState from '../../../common/EmptyState';
import Card from '../Card';

import styles from './styles.module.css';

export default function ShipmentList({
	data = {}, loading = false, activeTab = '',
	filters = {}, setFilters = () => {},
}) {
	const { list = [], page, total_count, page_limit } = data || {};

	return !loading && isEmpty(list)
		? <EmptyState />
		: (
			<>

				{list?.map((item) => (
					<Card
						data={item}
						key={item?.id}
						activeTab={activeTab}
						isSelectable
					/>
				))}
				<div className={styles.pagination_container}>
					<Pagination
						type="table"
						currentPage={page}
						totalItems={total_count}
						pageSize={page_limit}
						onPageChange={(val) => setFilters({ ...filters, page: val })}
					/>
				</div>
			</>
		);
}
