import { Input, Table, Pagination, Loader } from '@cogoport/components';
import { IcMSearchlight } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';

import useListFclFreightRateExtensions from '../../hooks/useListFclFreightRateExtensions';

import EmptyState from './common/EmptyState';
import CreateFclExtension from './components/CreateFclExtension';
import DeleteModal from './components/DeleteModal';
import UpdateModal from './components/UpdateModal';
import getTableColumns from './getTableColumns';
import styles from './styles.module.css';

function RenderPagination({ data = {}, filters = {}, setFilters = () => {} }) {
	const { page, ...restFilters } = filters || {};

	const { page_limit = 10, total_count = 1 } = data || {};

	const onClick = (currentPage) => {
		setFilters({ ...restFilters, page: currentPage });
	};

	return (
		<div className={styles.pagination}>
			<Pagination
				type="table"
				pageSize={page_limit}
				totalItems={total_count}
				currentPage={page}
				onPageChange={onClick}
			/>
		</div>
	);
}

function FclRateExtensions() {
	const [showUpdate, setShowUpdate] = useState(null);
	const [showDelete, setShowDelete] = useState(null);

	const {
		data = {},
		loading = false,
		q = '',
		setQ = () => {},
		refetch = () => {},
		filters = {},
		setFilters = () => {},
	} = useListFclFreightRateExtensions({ defaultFilters: { status: 'active' } });

	const tableColumns = getTableColumns({ onUpdate: setShowUpdate, onDelete: setShowDelete });

	if (loading) {
		return <div className={styles.loader}><Loader /></div>;
	}

	return (
		<div className={styles.container}>

			<header className={styles.header}>
				<h1 className={styles.heading}>FCL FREIGHT RATE EXTENSION RULE SETS</h1>
			</header>

			<div className={styles.search_section}>
				<Input
					size="sm"
					className={styles.search}
					prefix={<IcMSearchlight />}
					value={q}
					onChange={setQ}
					placeholder="Search by Extension Name"
				/>

				<CreateFclExtension refetch={refetch} />
			</div>

			{
				isEmpty(data?.list) ? (
					<EmptyState />
				) : (
					<div className={styles.table_container}>
						<RenderPagination data={data} filters={filters} setFilters={setFilters} />

						<Table columns={tableColumns} data={data?.list || []} loading={loading} />

						<RenderPagination data={data} filters={filters} setFilters={setFilters} />
					</div>
				)
			}

			{showUpdate ? (
				<UpdateModal
					item={showUpdate}
					show={showUpdate}
					setShow={setShowUpdate}
					refetch={refetch}
				/>
			) : null}

			{showDelete ? (
				<DeleteModal
					item={showDelete}
					show={showDelete}
					refetch={refetch}
					setShow={setShowDelete}
				/>
			) : null}
		</div>
	);
}

export default FclRateExtensions;
