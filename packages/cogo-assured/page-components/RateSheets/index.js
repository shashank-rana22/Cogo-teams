import { Table } from '@cogoport/components';

import useListRatesheet from '../../hooks/useListRatesheet';

import Filters from './Filters/index';
import getTableColumns from './getTableColumns';
import styles from './styles.module.css';
import TablePagination from './TablePagination';
import UploadRatesheet from './UploadRatesheet';

function RateSheet() {
	const {
		data = {}, loading = false, setFilters = () => {}, filters = {}, refetch = () => {},
	} = useListRatesheet({});
	const tableColumns = getTableColumns({ refetch });
	const paginationProps = { setFilters, filters, data };
	return (
		<div>
			<div className={styles.header}>
				<h1>
					Rate Sheets
				</h1>
				<div className={styles.filters_add}>
					<div className={styles.width_49}>
						<Filters filters={filters} setFilters={setFilters} />

					</div>
					<UploadRatesheet refetch={refetch} />
				</div>

			</div>

			<div className={styles.table_container}>
				<TablePagination {...paginationProps} />
				<Table columns={tableColumns} data={data?.list || []} loading={loading || false} />
				<TablePagination {...paginationProps} />
			</div>

		</div>
	);
}

export default RateSheet;
