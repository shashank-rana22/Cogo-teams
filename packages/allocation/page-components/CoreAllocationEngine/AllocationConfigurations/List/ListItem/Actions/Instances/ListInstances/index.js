import {
	Button,
	Popover,
	ButtonIcon, DateRangepicker, Legend, Pill, Table, Pagination,
} from '@cogoport/components';
import { IcMDelete } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { format, getByKey, startCase } from '@cogoport/utils';

import useDeleteAllocationInstance from '../../../../../../../../hooks/useDeleteAllocationInstance';
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
		getNextaPage,
		dateRange,
		setDateRange,
		listInstancesRefetch,
	} =	 useListAllocationInstances({ item });

	const {
		onInstanceDelete,
		loadingInstanceDelete,
		instanceId,
		setInstanceId,
	} = useDeleteAllocationInstance({ listInstancesRefetch });

	const { push } = useRouter();

	const onRowClick = (val) => {
		const status = getByKey(val, 'status.props.items[0].key', undefined);
		const selectedInstanceId = getByKey(val, 'serial_id.props.id', undefined);

		if (['pending_approval', 'completed'].includes(status)) {
			push(
				'/allocation/details/[instance_id]',
				`/allocation/details/${selectedInstanceId}`,
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
				<Popover
					interactive
					placement="left"
					visible={instanceId === listItem.id}
					onClickOutside={() => setInstanceId(false)}
					render={(
						<div className={styles.popover_container}>
							<div className={styles.popover_heading}>
								Are you sure you want to stop this instance?
							</div>
							<div className={styles.popover_button_container}>
								<Button
									size="md"
									themeType="tertiary"
									style={{ marginRight: '8px' }}
									disabled={loadingInstanceDelete}
									onClick={() => setInstanceId(null)}
								>
									No
								</Button>
								<Button
									size="md"
									themeType="accent"
									onClick={(event) => onInstanceDelete(event, listItem.id)}
									disabled={loadingInstanceDelete}
								>
									Stop
								</Button>
							</div>
						</div>
					)}
				>
					<ButtonIcon
						size="lg"
						icon={<IcMDelete />}
						themeType="primary"
						onClick={() => setInstanceId(listItem.id)}
						disabled={listItem.status !== 'active'}
					/>
				</Popover>
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

			<Table
				className={styles.table}
				columns={columns}
				data={data}
				loading={listLoading}
				onRowClick={onRowClick}
			/>

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
