import { Pagination } from '@cogoport/components';

import StyledTable from '../../../../AccountReceivables/commons/styledTable';

import { config } from './config';
import styles from './styles.module.css';

export interface ListDataProps {
	list: object[];
	pageNo?: number;
	totalRecords?: number;
}
interface ExcludeListInterface {
	data?: ListDataProps;
	uncheckedRows?: string[];
	setUncheckedRows?: React.Dispatch<React.SetStateAction<string[]>>;
	loading?: boolean;
	setFilters?: React.Dispatch<React.SetStateAction<object>>;
}

function ExcludeList({ data, uncheckedRows, setUncheckedRows, loading, setFilters }:ExcludeListInterface) {
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
			<div style={{ display: 'flex', justifyContent: 'flex-end' }}>
				<Pagination
					type="table"
					currentPage={pageNo}
					totalItems={totalRecords}
					pageSize={10}
					onPageChange={(pageValue: number) => {
						setFilters((p) => ({ ...p, pageIndex: pageValue }));
					}}
				/>
			</div>
		</>
	);
}

export default ExcludeList;
