import { Input, Table } from '@cogoport/components';
import { IcMSearchlight } from '@cogoport/icons-react';
import { useState } from 'react';

import useListFclFreightCommodityClusters from '../../hooks/useListFclFreightCommodityClusters';

import CreateCommodity from './CreateCommodity';
import getTableColumns from './getTableColumns';
import styles from './styles.module.css';
import { Delete, Update } from './TableActions';

function CommodityClusters() {
	const [showUpdate, setShowUpdate] = useState(null);
	const [showDelete, setShowDelete] = useState(null);

	const {
		data = {}, loading = false, q = '',
		setQ = () => {}, refetch = () => {},
	} = useListFclFreightCommodityClusters({ defaultFilters: { status: 'active' } });

	const tableColumns = getTableColumns({ onUpdate: setShowUpdate, onDelete: setShowDelete });

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
						<CreateCommodity refetch={refetch} />
					</div>
				</div>
			</div>

			<div className={styles.table_container}>
				<Table columns={tableColumns} data={data?.list || []} loading={loading} />
			</div>

			{showUpdate ? (
				<Update
					item={showUpdate}
					show={showUpdate}
					setShow={setShowUpdate}
					refetch={refetch}
				/>
			) : null}

			{showDelete ? (
				<Delete
					item={showDelete}
					show={showDelete}
					refetch={refetch}
					setShow={setShowDelete}
				/>
			) : null}
		</div>
	);
}

export default CommodityClusters;
