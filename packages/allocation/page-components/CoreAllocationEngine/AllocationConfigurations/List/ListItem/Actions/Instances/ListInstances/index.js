import { Button, Table, Loader, Pagination } from '@cogoport/components';
import { format, startCase } from '@cogoport/utils';

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

function ListInstances({ item }) {
	const { list, listLoading, paginationData, getNextaPage } = useListAllocationInstances({ item });

	const { page = 0, page_limit = 0, total_count = 0 } = paginationData || {};

	if (listLoading) {
		return <Loader themeType="primary" />;
	}

	const columns = Object.entries(LIST_COLUMNS_MAPPING).map(([key, value]) => ({
		Header   : <div key={key}>{value}</div>,
		accessor : key,
		id       : key,
	}));

	const data = list.map((listItem) => {
		const formattedData = {
			serial_id    : <div>{listItem.serial_id}</div>,
			created_at   : <div>{format(listItem.created_at, 'dd MMM yyyy')}</div>,
			updated_at   : <div>{format(listItem.updated_at, 'dd MMM yyyy')}</div>,
			execution_at : <div>{format(listItem.execution_at, 'dd MMM yyyy')}</div>,
			status       : <div>{startCase(listItem.status)}</div>,
			action       : (
				<Button
					size="sm"
					themeType="primary"
					// onClick={() => onClickChangeStakeholder(item)}
					disabled={listItem.status === 'approved'}
				>
					Change Stakeholder
				</Button>
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
