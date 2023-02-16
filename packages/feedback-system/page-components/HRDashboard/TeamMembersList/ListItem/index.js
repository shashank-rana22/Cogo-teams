import { Table, Input, Button } from '@cogoport/components';
import { IcMSearchlight } from '@cogoport/icons-react';
import { getByKey } from '@cogoport/utils';

import styles from './styles.module.css';

const LIST_COLUMNS_MAPPING = {

	user_name   : 'NAME',
	employee_id : 'EMPLOYEE ID',
	latest_kpi  : 'LATEST KPI',
	score       : 'SCORE',
	details     : 'DETAILS',
};

function ListItem({ item }) {
	const columns = Object.entries(LIST_COLUMNS_MAPPING).map(([key, value]) => ({
		Header   : <div key={key}>{value}</div>,
		accessor : key,
		id       : key,
	}));

	const data = item.details.map((listItem) => {
		const filteredData = {
			user_name: (
				<div>{getByKey(listItem, 'user_name', '___')}</div>
			),
			employee_id: (
				<div>{getByKey(listItem, 'employee_id', '___')}</div>
			),
			latest_kpi: (
				<div>{getByKey(listItem, 'latest_kpi', '___')}</div>
			),
			score: (
				<div>{getByKey(listItem, 'score', '___')}</div>
			),
			details: (
				<span>View Details</span>
			),

		};

		const dataToPush = {};

		Object.keys(LIST_COLUMNS_MAPPING).forEach((dataKey) => {
			dataToPush[dataKey] = filteredData[dataKey] || listItem[dataKey] || '___';
		});
		return dataToPush;
	});

	return (
		<div className={styles.overall_baselist}>
			<section className={styles.inner_list}>
				<Input size="sm" suffix={<IcMSearchlight />} placeholder="Search" className={styles.search} />
				<Button
					size="md"
					themeType="secondary"
					onClick={() => {}}
				>
					Download CSV
				</Button>
				{' '}

			</section>
			<Table data={data} columns={columns} />
		</div>
	);
}

export default ListItem;
