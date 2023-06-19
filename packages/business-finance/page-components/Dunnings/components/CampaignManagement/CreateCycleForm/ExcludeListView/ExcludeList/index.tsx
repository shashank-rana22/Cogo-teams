import { Pagination } from '@cogoport/components';

import StyledTable from '../../../../../../AccountReceivables/commons/styledTable';

import { config } from './config';
import styles from './styles.module.css';

interface Props {
	list?:object[],
	page?:number,
	setPage?:Function,
	totalRecords?:number,
	uncheckedRows?:string[],
	setUncheckedRows?:Function,
	loading?:boolean,
}

function ExcludeList({ list, page, setPage, totalRecords, uncheckedRows, setUncheckedRows, loading }:Props) {
	return (
		<>
			<StyledTable
				data={list}
				columns={config({
					uncheckedRows,
					setUncheckedRows,
				})}
				loading={loading}
			/>
			<div className={styles.pagination}>
				{list?.length > 0 && (
					<Pagination
						type="number"
						currentPage={page}
						totalItems={totalRecords}
						pageSize={10}
						onPageChange={(pageIndex) => setPage(pageIndex)}
					/>
				)}
			</div>
		</>
	);
}

export default ExcludeList;
