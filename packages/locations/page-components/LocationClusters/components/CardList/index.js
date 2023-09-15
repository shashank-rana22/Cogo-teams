import { Pagination, Table, Placeholder } from '@cogoport/components';
import { startCase } from '@cogoport/utils';

import CardButtons from './CardButtons';
import styles from './styles.module.css';

const PAGE_LIMIT = 10;
const LOADING_ROW = 1;

function CardList({
	data = {}, loading = false, setGlobalFilters = () => {}, getLocationData = () => {},
	showPagination = true,
}) {
	const { list = [], page = 1, total_count = 0, page_limit = 10 } = data || {};
	const columns = [
		{ Header: 'Cluster Name', accessor: (item) => (item.cluster_name || '--') },
		{ Header: 'Cluster Type', accessor: (item) => (startCase(item?.cluster_type) || '--') },
		{ Header: 'Location Type', accessor: (item) => (startCase(item?.location_type) || '--') },
		{ Header: 'Organization', accessor: (item) => (startCase(item?.organization_id) || '--') },
		{ Header: 'Partner', accessor: (item) => (startCase(item?.partner_id) || '--') },
		{
			Header   : ' ',
			accessor : (item) => (
				<CardButtons item={item} getLocationData={getLocationData} />
			),
		},
	];
	const loadingColumn = [
		{
			Header   : 'LOADING...',
			accessor : (item) => (
				<Placeholder key={item.id} />
			),
		},
	];
	if (loading) {
		return (
			<div className={styles.table_container}>
				<Table
					columns={loadingColumn}
					data={[LOADING_ROW]}
				/>

			</div>
		);
	}
	return (
		<div className={styles.container}>
			<div className={styles.table_container}>
				<Table columns={columns} data={list} />
			</div>
			{showPagination ? (
				<div className={styles.pagination_container}>
					<Pagination
						type="table"
						currentPage={page}
						totalItems={total_count}
						pageSize={page_limit || PAGE_LIMIT}
						onPageChange={(val) => {
							setGlobalFilters({ page: val });
						}}
					/>
				</div>
			) : null}
		</div>
	);
}
export default CardList;
