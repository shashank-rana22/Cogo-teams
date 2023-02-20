import {
	Button,
	DateRangepicker, Legend, Pill, Table, Pagination,
} from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import { format, getByKey, startCase } from '@cogoport/utils';

import useListAllocationInstances from '../../../../../../../../hooks/useListAllocationInstances';

import styles from './styles.module.css';

const LIST_COLUMNS_MAPPING = {
	serial_id    : 'SERIAL ID',
	created_at   : 'CREATED AT',
	updated_at   : 'UPDATED AT',
	execution_at : 'EXECUTION AT',
	status       : 'STATUS',
	action       : 'ACTION',
};

const STATUS_COLOR_MAPPING = {
	pending_approval : 'orange',
	active           : 'grey',
	stopped          : 'red',
	completed        : 'green',
};

function ListInstances({ item }) {
	const {
		list,
		listLoading,
		paginationData,
		getNextPage,
		dateRange,
		setDateRange,
	} =	 useListAllocationInstances({ item });

	const { push } = useRouter();

	const onRowClick = (listItem) => {
		const { status, id } = listItem;

		if (['pending_approval', 'completed'].includes(status)) {
			push(
				'/allocation/core-engine/details/[instance_id]',
				`/allocation/core-engine/details/${id}`,
			);
		}
	};

	const { page = 0, page_limit = 0, total_count = 0 } = paginationData || {};

	const columns = Object.entries(LIST_COLUMNS_MAPPING).map(([key, value]) => ({
		Header   : <div key={key}>{value}</div>,
		accessor : key,
		id       : key,
	}));

	const data = list.map((listItem) => {
		const formattedData = {
			serial_id: (
				<Pill id={listItem.id} color="blue" size="lg">{getByKey(listItem, 'serial_id', '___')}</Pill>
			),
			created_at: (
				<div>
					{getByKey(listItem, 'created_at', '___')
						? format(getByKey(listItem, 'created_at', '___'), 'dd MMM yyyy')
						: '___'}
				</div>
			),
			updated_at: (
				<div>
					{getByKey(listItem, 'updated_at', '___')
						? format(getByKey(listItem, 'updated_at', '___'), 'dd MMM yyyy')
						: '___'}
				</div>
			),
			execution_at: (
				<div>
					{getByKey(listItem, 'execution_at', '___')
						? format(getByKey(listItem, 'execution_at', '___'), 'dd MMM yyyy')
						: '___'}
				</div>
			),
			status: (
				<Legend
					className={styles.legend}
					hasBackground={false}
					direction="horizontal"
					size="md"
					items={[
						{
							label : startCase(getByKey(listItem, 'status', '___')),
							color : STATUS_COLOR_MAPPING[getByKey(listItem, 'status', '___')],
							key   : getByKey(listItem, 'status', '___'),
						},
					]}
				/>
			),
			action: (
				<Button
					size="sm"
					themeType="primary"
					onClick={() => onRowClick(listItem)}
					disabled={!['pending_approval', 'completed'].includes(listItem.status)}
				>
					View Details
				</Button>
			),
		};

		const dataToPush = {};

		Object.keys(LIST_COLUMNS_MAPPING).forEach((dataKey) => {
			dataToPush[dataKey] = formattedData[dataKey] || listItem[dataKey] || '___';
		});

		return dataToPush;
	});

	return (
		<div>
			<div className={styles.daterange_container}>
				<DateRangepicker
					value={dateRange}
					onChange={setDateRange}
					isPreviousDaysAllowed
					maxDate={new Date()}
				/>
			</div>

			<Table
				className={styles.table}
				columns={columns}
				data={data}
				loading={listLoading}
				// onRowClick={onRowClick}
			/>

			<div className={styles.pagination_container}>
				<Pagination
					type="compact"
					currentPage={page}
					totalItems={total_count}
					pageSize={page_limit}
					onPageChange={getNextPage}
				/>
			</div>
		</div>
	);
}

export default ListInstances;
