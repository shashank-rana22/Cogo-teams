import { Pagination, Loader } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import EmptyState from '../../../commons/EmptyState';
import useBlInventory from '../../../hooks/useBlInventory';

import Filters from './Filters';
import styles from './styles.module.css';
import TableView from './TableView';

function Usage() {
	const { data = {}, loading, setFilters, filters } = useBlInventory({
		defaultFilters : { document_attributes: [{ document_type: 'house_bill_of_lading' }], trade_type: 'export' },
		defaultParams  : {
			additional_methods: ['pagination'],
		},
	});

	const { total = 0, list = [] } = data || {};

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<h3>Usage</h3>
			</div>

			<div>
				<Filters setFilters={setFilters} filters={filters} />
			</div>

			{loading
				? (
					<div className={styles.loading}>
						<Loader />

					</div>
				) : null}

			{!loading && isEmpty(list) ? (
				<EmptyState
					heading="No Data Found !!"
				/>
			) : null}

			{!loading && list.length ? (
				<div>
					<TableView loading={loading} data={data} />

					<div className={styles.pagination}>
						<Pagination
							type="table"
							totalItems={total}
							pageSize={10}
							currentPage={filters.page}
							onPageChange={(val) => setFilters({ ...filters, page: val })}
						/>
					</div>
				</div>
			) : null}
		</div>
	);
}

export default Usage;
