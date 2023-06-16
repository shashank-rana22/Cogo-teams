import { Pagination } from '@cogoport/components';

import StyledTable from '../../../commons/StyledTable/index.tsx';
import useOutwardFileList from '../../hooks/useOutwardFileList';
import useRefreshData from '../../hooks/useRefreshData';

import Column from './Column';
import HeaderOutward from './HeaderOutward';
import styles from './styles.module.css';

const EMPTY_STATE = 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/list_emptystate.png';
const PAGE = 1;
const TOTAL_RECORDS = 0;
const PAGE_SIZE = 10;
function Outward({	filters, setFilters }) {
	const { exportTrigger, loading, listData, listLoading, page, setPage } = useOutwardFileList({
		entity : filters?.entity,
		gstIn  : filters?.gstIn,
		month  : filters?.month,
		year   : filters?.year,
	});

	const { refresh, refreshLoading } = useRefreshData();

	const { list, totalRecord } = listData || {};

	return (
		<div>
			<HeaderOutward
				filters={filters}
				setFilters={setFilters}
				exportTrigger={exportTrigger}
				loading={loading}
			/>

			<div>
				<StyledTable
					data={list}
					columns={Column(refresh)}
					imageFind={EMPTY_STATE}
					loading={listLoading || refreshLoading}
				/>
			</div>

			<div className={styles.pagination_container}>
				<Pagination
					type="number"
					totalItems={totalRecord || TOTAL_RECORDS}
					currentPage={page || PAGE}
					pageSize={PAGE_SIZE}
					onPageChange={setPage}
				/>
			</div>

		</div>
	);
}
export default Outward;
