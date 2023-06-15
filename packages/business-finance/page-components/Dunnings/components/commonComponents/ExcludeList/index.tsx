import { Pagination } from '@cogoport/components';

import StyledTable from '../../../../AccountReceivables/commons/styledTable';

import { config } from './config';
import styles from './styles.module.css';

function ExcludeList({ data, uncheckedRows, setUncheckedRows, loading, setFilters }) {
	const { list = [], pageNo = 0, totalPages = 0, totalRecords } = data || {};
	return (
		<>
			<div className={styles.table}>
				<StyledTable
					data={list}
					columns={config({
						uncheckedRows,
						setUncheckedRows,
					})}
					loading={loading}
				/>
			</div>
			<div style={{ display: 'flex', justifyContent: 'flex-end' }}>
				<Pagination
					type="table"
					currentPage={pageNo}
					totalItems={totalRecords}
					pageSize={totalPages}
					onPageChange={(pageValue: number) => {
						setFilters((p) => ({ ...p, pageIndex: pageValue }));
					}}
				/>
			</div>
		</>
	);
}

export default ExcludeList;
