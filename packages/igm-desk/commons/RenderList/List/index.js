import { Pagination } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useContext } from 'react';

import IGMDeskContext from '../../../context/IGMDeskContext';
import EmptyState from '../../EmptyState';

import styles from './styles.module.css';

function RenderPagination({ total = 0, filters = {}, setFilters = () => {} }) {
	return (
		<Pagination
			type="table"
			totalItems={total}
			pageSize={10}
			currentPage={filters?.page}
			onPageChange={(val) => setFilters({ ...filters, page: val })}
		/>
	);
}

export default function List({ data = {}, Card = null }) {
	const { filters, setFilters, tabState = {} } = useContext(IGMDeskContext) || {};
	const { list = [], total } = data || {};

	return (
		isEmpty(list) ? <EmptyState /> : (
			<>
				<RenderPagination total={total} filters={filters} setFilters={setFilters} />

				<div className={styles.list_container}>
					{list.map((item) => (
						Card ? (
							<Card
								key={item?.id}
								item={item}
								activeTab={tabState?.activeTab}
							/>
						) : null
					))}

				</div>

				<RenderPagination total={total} filters={filters} setFilters={setFilters} />
			</>
		)
	);
}
