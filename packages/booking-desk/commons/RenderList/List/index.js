import { Pagination } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useContext } from 'react';

import BookingDeskContext from '../../../context/BookingDeskContext';
import EmptyState from '../../EmptyState';

import styles from './styles.module.css';

export default function List({ data, Card, couldBeCardsCritical = false }) {
	const { filters, setFilters, tabState: { activeTab } = {} } = useContext(BookingDeskContext) || {};
	const { list = [], total } = data || {};

	const renderPagination = (
		<Pagination
			type="table"
			totalItems={total}
			pageSize={10}
			currentPage={filters.page}
			onPageChange={(val) => setFilters({ ...filters, page: val })}
		/>
	);

	return (
		isEmpty(list) ? <EmptyState /> : (
			<>
				{renderPagination}

				<div className={styles.list_container}>
					{list.map((item) => (
						Card ? (
							<Card
								key={item?.id}
								item={item}
								couldBeCardsCritical={couldBeCardsCritical}
								activeTab={activeTab}
							/>
						) : null
					))}

				</div>

				{renderPagination}
			</>
		)
	);
}
