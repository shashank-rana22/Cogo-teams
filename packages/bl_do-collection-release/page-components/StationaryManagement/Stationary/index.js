import { Pagination, Loader } from '@cogoport/components';
import { AsyncSelect } from '@cogoport/forms';
import { isEmpty } from '@cogoport/utils';

import EmptyState from '../../../commons/EmptyState';
import useListOrganizationDocumentInventory from '../../../hooks/useListOrganizationDocumentInventory';

import AddStationary from './AddStationary';
import Hbl from './Hbl';
import Mbl from './Mbl';
import styles from './styles.module.css';
import TableView from './TableView';

function Stationary() {
	const { data, loading, setFilters, filters, apiTrigger = () => {} } = useListOrganizationDocumentInventory();
	const { list = [], total } = data || {};
	const organizationParams = {
		filters    : { status: 'active', account_type: 'service_provider' },
		page_limit : 10,
	};

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<h3>Stationary</h3>
				<AddStationary
					listOrgDocTrigger={apiTrigger}
				/>
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
				<div className={styles.table_container}>
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

export default Stationary;
