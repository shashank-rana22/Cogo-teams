import { AsyncSelect } from '@cogoport/forms';

import useListOrganizationDocumentInventory from '../../../hooks/useListOrganizationDocumentInventory';

import AddStationary from './AddStationary';
import Hbl from './Hbl';
import Mbl from './Mbl';
import styles from './styles.module.css';
import TableView from './TableView';

function Stationary() {
	const { data, loading, setFilters, filters } = useListOrganizationDocumentInventory();

	const organizationParams = {
		filters    : { status: 'active', account_type: 'service_provider' },
		page_limit : 10,
	};

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<h3>Stationary</h3>
				<AddStationary />
			</div>

			<div className={styles.body}>
				<Hbl data={data} loading={loading} />

				<Mbl data={data} loading={loading} />
			</div>

			<div className={styles.select_container}>
				<AsyncSelect
					size="sm"
					asyncKey="organizations"
					params={organizationParams}
					initialCall
					onChange={(val) => setFilters({ ...filters, organization_id: val })}
					value={filters.organization_id}
					isClearable
				/>
			</div>

			<div className={styles.table_container}>
				<TableView data={data} loading={loading} />
			</div>

		</div>
	);
}

export default Stationary;
