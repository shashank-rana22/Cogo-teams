import { Pagination } from '@cogoport/components';

import StyledTable from '../../../commons/StyledTable/index.tsx';
import useGetStatus from '../../hooks/useGetStatus';
import useOutwardFileList from '../../hooks/useOutwardFileList';
import useRefreshData from '../../hooks/useRefreshData';
import useUploadAndDelete from '../../hooks/useUploadAndDelete';

import Column from './Column';
import HeaderOutward from './HeaderOutward';
import styles from './styles.module.css';

const EMPTY_STATE_IMG = 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/list_emptystate.png';
const PAGE_INDEX = 1;
const TOTAL_RECORDS = 0;
const PAGE_SIZE = 10;
function Outward({ filters, setFilters }) {
	const {
		exportTrigger,
		loading,
		listData,
		listLoading,
		page,
		setPage,
		refetch,
	} = useOutwardFileList({
		entity : filters?.entity,
		gstIn  : filters?.gstIn,
		month  : filters?.month,
		year   : filters?.year,
	});

	const { refresh, refreshLoading } = useRefreshData({ refetch });

	const { deleteId, deleteIdLoading, uploadId, uploadIdLoading } = useUploadAndDelete({ refetch });

	const { statusId, statusIdLoading } = useGetStatus({ refetch });
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
					columns={Column(refresh, deleteId, statusId, uploadId)}
					imageFind={EMPTY_STATE_IMG}
					loading={
            listLoading
            || refreshLoading
            || deleteIdLoading
            || statusIdLoading
            || uploadIdLoading
          }
				/>
			</div>

			<div className={styles.pagination_container}>
				<Pagination
					type="number"
					totalItems={totalRecord || TOTAL_RECORDS}
					currentPage={page || PAGE_INDEX}
					pageSize={PAGE_SIZE}
					onPageChange={setPage}
				/>
			</div>
		</div>
	);
}
export default Outward;
