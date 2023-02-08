import {
	ButtonIcon, DateRangepicker, Legend, Pill, Table, Pagination,
} from '@cogoport/components';
import { IcMDelete } from '@cogoport/icons-react';
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
	active           : 'green',
	inactive         : 'red',
};

function ListInstances({ item }) {
	const {
		list,
		listLoading,
		paginationData,
		getNextaPage,
		dateRange,
		setDateRange,
	} =	 useListAllocationInstances({ item });

	const { page = 0, page_limit = 0, total_count = 0 } = paginationData || {};

	const columns = Object.entries(LIST_COLUMNS_MAPPING).map(([key, value]) => ({
		Header   : <div key={key}>{value}</div>,
		accessor : key,
		id       : key,
	}));

	const data = list.map((listItem) => {
		const formattedData = {
			serial_id    : <Pill color="blue" size="lg">{getByKey(listItem, 'serial_id', '___')}</Pill>,
			created_at   : <div>{format(getByKey(listItem, 'created_at', '___'), 'dd MMM yyyy')}</div>,
			updated_at   : <div>{format(getByKey(listItem, 'updated_at', '___'), 'dd MMM yyyy')}</div>,
			execution_at : <div>{format(getByKey(listItem, 'execution_at', '___'), 'dd MMM yyyy')}</div>,
			status       : (
				<Legend
					className={styles.legend}
					hasBackground={false}
					direction="horizontal"
					size="md"
					items={[
						{
							label : startCase(getByKey(listItem, 'status', '___')),
							color : STATUS_COLOR_MAPPING[getByKey(listItem, 'status', '___')],
							key   : getByKey(listItem, 'id', '___'),
						},
					]}
				/>
			),
			action: (
				<ButtonIcon
					size="lg"
					icon={<IcMDelete />}
					themeType="primary"
				/>
			),
		};

		const dataToPush = {};

		Object.keys(LIST_COLUMNS_MAPPING).forEach((dataKey) => {
			dataToPush[dataKey] = formattedData[dataKey] || item[dataKey] || '-';
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

			<Table className={styles.table} columns={columns} data={data} loading={listLoading} />

			<div className={styles.pagination_container}>
				<Pagination
					type="compact"
					currentPage={page}
					totalItems={total_count}
					pageSize={page_limit}
					onPageChange={getNextaPage}
				/>
			</div>
		</div>
	);
}

export default ListInstances;
