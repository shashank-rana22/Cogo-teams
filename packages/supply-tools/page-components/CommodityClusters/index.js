import { Input, Table } from '@cogoport/components';
import { IcMSearchlight } from '@cogoport/icons-react';

import useListFclFreightCommodityClusters from '../../hooks/useListFclFreightCommodityClusters';

import CreateCommodity from './CreateCommodity';
import getTableColumns from './getTableColumns';
import styles from './styles.module.css';

function CommodityClusters() {
	const tableColumns = getTableColumns({});

	const {
		data = {}, loading = false, q = '',
		setQ = () => {},
	} = useListFclFreightCommodityClusters({ defaultFilters: { status: 'active' } });

	return (
		<div>
			<div className={styles.header}>
				<h1>COMMODITY CLUSTERS</h1>

				<div className={styles.filters_add}>
					<div className={styles.width_49}>
						<Input
							size="sm"
							prefix={<IcMSearchlight />}
							placeholder="Search By Cluster Name"
							onChange={setQ}
							value={q}
						/>
					</div>
					<div className={styles.width_49}>
						<CreateCommodity />
					</div>
				</div>
			</div>

			<div className={styles.table_container}>
				<Table columns={tableColumns} data={data?.list || []} loading={loading} />
			</div>
		</div>
	);
}

export default CommodityClusters;
