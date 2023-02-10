import { Table, Button, Legend, Tooltip, Pill, Pagination } from '@cogoport/components';
import { getByKey, startCase } from '@cogoport/utils';

import styles from './styles.module.css';

const STATUS_COLOR_MAPPING = {
	active   : 'green',
	inactive : 'red',
	approved : 'orange',
};

const LIST_COLUMNS_MAPPING = {
	serial_id       : 'SERIAL ID',
	organization    : 'ORGANIZATION',
	user            : 'USER',
	old_stakeholder : 'OLD STAKEHOLDER',
	new_stakeholder : 'NEW STAKEHOLDER',
	status          : 'STATUS',
	action          : 'ACTION',
};

function List({ list, loading, paginationData, getNextaPage }) {
	const { page = 0, page_limit = 0, total_count = 0 } = paginationData || {};

	const columns = Object.entries(LIST_COLUMNS_MAPPING).map(([key, value]) => ({
		Header   : <div key={key}>{value}</div>,
		accessor : key,
		id       : key,
	}));

	const data = list.map((listItem) => {
		const formattedData = {
			serial_id: (
				<Pill color="blue" size="lg">{getByKey(listItem, 'organization.serial_id', '___')}</Pill>
			),
			organization: (
				<div>
					<Tooltip
						placement="bottom"
						content={(
							<div className={styles.toottip_content}>
								{startCase(getByKey(listItem, 'organization.business_name', '___').toUpperCase())}
							</div>
						)}
					>
						<div className={styles.business_name}>
							{startCase(getByKey(listItem, 'organization.business_name', '___').toUpperCase())}
						</div>
					</Tooltip>
				</div>
			),
			user: (
				<div>
					{startCase(getByKey(listItem, 'user.name', '___').toLowerCase())}
				</div>
			),
			old_stakeholder: (
				<div>
					<div>
						{startCase(getByKey(listItem, 'old_stakeholder.name', '___').toLowerCase())}
					</div>
					<div className={styles.stakeholder_type}>
						{startCase(getByKey(listItem, 'old_stakeholder_type', '___').toLowerCase())}
					</div>
				</div>
			),
			new_stakeholder: (
				<div>
					<div>
						{startCase(getByKey(listItem, 'stakeholder.name', '___').toLowerCase())}
					</div>
					<div className={styles.stakeholder_type}>
						{startCase(getByKey(listItem, 'stakeholder_type', '___').toLowerCase())}
					</div>
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
					disabled={getByKey(listItem, 'status', undefined) === 'approved'}
				>
					Change Stakeholder
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
			<Table
				className={styles.table}
				columns={columns}
				data={data}
				loading={loading}
			/>

			<div className={styles.pagination_container}>
				<Pagination
					type="table"
					currentPage={page}
					totalItems={total_count}
					pageSize={page_limit}
					onPageChange={getNextaPage}
				/>
			</div>
		</div>
	);
}

export default List;
