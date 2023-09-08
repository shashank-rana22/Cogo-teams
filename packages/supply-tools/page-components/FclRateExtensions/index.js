import { Input, Table, Pagination } from '@cogoport/components';
import { IcMSearchlight } from '@cogoport/icons-react';
import React, { useState } from 'react';

import useListFclFreightRateExtensions from '../../hooks/useListFclFreightRateExtensions';

import CreateFclExtension from './components/CreateFclExtension';
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
	const [show, setShow] = useState(null);
	const [searchQuery, setSearchQuery] = useState('');

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

	return (
		<div className={styles.container}>

			<header className={styles.header}>
				<h1 className={styles.heading}>FCL FREIGHT RATE EXTENSION RULE SETS</h1>
			</header>

			<div className={styles.search_section}>
				<Input
					className={styles.search}
					prefix={<IcMSearchlight />}
					value={q}
					onChange={setQ}
					placeholder="Search by Extension Name"
				/>

				<CreateFclExtension refetch={refetch} />
			</div>

			<div className={styles.table_container}>
				<RenderPagination data={data} filters={filters} setFilters={setFilters} />

				<Table columns={tableColumns} data={data?.list || []} loading={loading} />

				<RenderPagination data={data} filters={filters} setFilters={setFilters} />
			</div>
		</div>
	);
}

export default FclRateExtensions;
