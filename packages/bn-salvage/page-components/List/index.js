import { Pagination, Loader } from '@cogoport/components';
import { useState } from 'react';

import EmptyState from '../../commons/EmptyState';
import Card from '../Card';

import ListHeader from './ListHeader';
import styles from './styles.module.css';

export default function List({ filters, setFilters, data, loading, refetchList }) {
	const { list, total_count } = data || {};

	const [openItem, setOpenItem] = useState(null);

	const pagination = (
		<Pagination
			size="sm"
			type="number"
			totalItems={total_count}
			pageSize={10}
			currentPage={filters.page}
			onPageChange={(val) => setFilters({ ...filters, page: val })}
		/>
	);

	if (loading) {
		return (
			<div className={styles.loader_container}>
				<Loader />
				<p>Loading Booking Documents...</p>
			</div>
		);
	}

	if (!loading && list.length === 0) {
		return <EmptyState />;
	}

	return (
		<div className={styles.list_container}>
			{pagination}

			<table>
				<ListHeader />

				<tbody>
					{list.map((item) => (
						<Card
							key={item?.id}
							item={item}
							openItem={openItem}
							setOpenItem={setOpenItem}
							refetchList={refetchList}
						/>
					))}
				</tbody>
			</table>

			{pagination}
		</div>
	);
}
