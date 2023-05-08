import { Pagination } from '@cogoport/components';

import useBlInventory from '../../../hooks/useBlInventory';

import Filters from './Filters';
import styles from './styles.module.css';
import TableView from './TableView';

function Usage() {
	const { data, loading, setFilters, filters } = useBlInventory({
		defaultFilters : { document_type: 'house_bill_of_lading', trade_type: 'export' },
		defaultParams  : {
			additional_methods: ['pagination'],
		},
	});

	const { total = 0 } = data || {};

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<h3>Usage</h3>
			</div>
			<div>
				<Filters setFilters={setFilters} filters={filters} />
			</div>

			<div>
				<TableView loading={loading} data={data} />
				<div>
					<Pagination
						type="table"
						totalItems={total}
						pageSize={10}
						currentPage={filters.page}
						onPageChange={(val) => setFilters({ ...filters, page: val })}
					/>
				</div>
			</div>
		</div>
	);
}

export default Usage;
