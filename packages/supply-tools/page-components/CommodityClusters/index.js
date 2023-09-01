import { Input, Table, Toggle } from '@cogoport/components';
import { IcMSearchlight } from '@cogoport/icons-react';
import { useRouter } from 'next/router';
import { useState, useCallback } from 'react';

import useListFclFreightCommodityClusters from '../../hooks/useListFclFreightCommodityClusters';

import CreateCommodity from './CreateCommodity';
import getTableColumns from './getTableColumns';
import styles from './styles.module.css';
import { Delete, Update } from './TableActions';
import TablePagination from './TablePagination';

function CommodityClusters() {
	const router = useRouter();

	const [showUpdate, setShowUpdate] = useState(null);
	const [showDelete, setShowDelete] = useState(null);

	const {
		data = {}, loading = false, q = '',
		setQ = () => {}, refetch = () => {}, filters = {}, setFilters = () => {},
	} = useListFclFreightCommodityClusters({ defaultFilters: { status: 'active' } });

	const tableColumns = getTableColumns({ onUpdate: setShowUpdate, onDelete: setShowDelete });

	const paginationProps = { setFilters, filters, data };

	const handleVersionChange = useCallback(() => {
		const newPathname = `${router.asPath}`;
		window.location.replace(newPathname);
	}, [router.asPath]);

	return (
		<div>
			<div className={styles.header}>
				<h1>COMMODITY CLUSTERS</h1>

				<div className={styles.filters_add}>
					<div>
						<Toggle
							size="md"
							onLabel="Old"
							offLabel="New"
							onChange={handleVersionChange}
						/>
					</div>

					<div className={styles.width_44}>
						<Input
							size="sm"
							prefix={<IcMSearchlight />}
							placeholder="Search By Cluster Name"
							onChange={setQ}
							value={q}
						/>
					</div>
					<CreateCommodity refetch={refetch} />
				</div>
			</div>

			<div className={styles.table_container}>
				<TablePagination {...paginationProps} />
				<Table columns={tableColumns} data={data?.list || []} loading={loading} />
				<TablePagination {...paginationProps} />
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
