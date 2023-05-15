import { Pagination, Loader } from '@cogoport/components';
import { useContext, useState } from 'react';

import EmptyState from '../../commons/EmptyState';
import { BNSalvageContext } from '../../context/BNSalvageContext';
import Card from '../Card';

import ListHeader from './ListHeader';
import styles from './styles.module.css';

export default function List() {
	const { filters, setFilters, listData, listLoading } = useContext(BNSalvageContext);
	const { list, total_count } = listData || {};

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

	if (listLoading) {
		return (
			<div className={styles.loader_container}>
				<Loader />
				<p>Loading Booking Documents...</p>
			</div>
		);
	}

	if (!listLoading && list?.length === 0) {
		return <EmptyState />;
	}

	return (
		<div className={styles.list_container}>
			{total_count > 10 ? pagination : null}

			<table>
				<ListHeader />

				<tbody>
					{(list || []).map((item) => (
						<Card
							key={item?.id}
							item={item}
							openItem={openItem}
							setOpenItem={setOpenItem}
						/>
					))}
				</tbody>
			</table>

			{pagination}
		</div>
	);
}
