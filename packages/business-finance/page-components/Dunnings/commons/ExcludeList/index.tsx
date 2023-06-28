import { Pagination } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import StyledTable from '../../../AccountReceivables/commons/styledTable';

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
	config?: Function,
}

function ExcludeList({ data, uncheckedRows, setUncheckedRows, loading, setFilters, config }:ExcludeListInterface) {
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
						onPageChange={(pageValue: number) => {
							setFilters((prev) => ({ ...prev, pageIndex: pageValue }));
						}}
					/>
				</div>
			) : null}
		</>
	);
}

export default ExcludeList;
