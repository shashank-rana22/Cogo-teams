import { Pagination } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import StyledTable from '../../../AccountReceivables/commons/styledTable';

import styles from './styles.module.css';

function ExcludeList({ data, uncheckedRows, setUncheckedRows, loading, setFilters, config }) {
	const { list = [], pageNo = 0, totalRecords } = data || {};
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
			{!isEmpty(list) ? (
				<div style={{ display: 'flex', justifyContent: 'flex-end' }}>
					<Pagination
						type="table"
						currentPage={pageNo}
						totalItems={totalRecords}
						pageSize={10}
						onPageChange={(pageValue) => {
							setFilters((prev) => ({ ...prev, pageIndex: pageValue }));
						}}
					/>
				</div>
			) : null}
		</>
	);
}

export default ExcludeList;
