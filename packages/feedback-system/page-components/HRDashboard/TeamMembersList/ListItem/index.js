import { Table, Input, Button } from '@cogoport/components';
import { IcMSearchlight } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { getByKey, isEmpty } from '@cogoport/utils';

import EmptyState from '../../../../common/EmptyState';

import styles from './styles.module.css';
import useManagerListItem from './useManagerListItem';

const LIST_COLUMNS_MAPPING = {

	user_name   : 'NAME',
	employee_id : 'EMPLOYEE ID',
	latest_kpi  : 'LATEST KPI',
	score       : 'SCORE',
	details     : 'DETAILS',
};

function ListItem({ item }) {
	const Router = useRouter();

	const { data: { list = [] } = {}, loading } = useManagerListItem({ item });

	const columns = Object.entries(LIST_COLUMNS_MAPPING).map(([key, value]) => ({
		Header   : <div key={key}>{value}</div>,
		accessor : key,
		id       : key,
	}));

	const routeToUserDetails = (id) => {
		if (id) {
			Router.push(
				'/feedback-system/hr-dashboard/feedback-management/[user_id]?path=/feedback-system/hr-dashboard',
				`/feedback-system/hr-dashboard/feedback-management/${id}?path=/feedback-system/hr-dashboard`,
			);
		}
	};

	const data = (list || []).map((listItem) => {
		const filteredData = {
			user_name: (
				<div>{getByKey(listItem, 'name', '___')}</div>
			),
			employee_id: (
				<div>{getByKey(listItem, 'cogo_id', '___')}</div>
			),
			rating: (
				<div>{getByKey(listItem, 'rating', '___')}</div>
			),
			score: (
				<div>{getByKey(listItem, 'score', '___')}</div>
			),
			details: (
				<Button
					themeType="link"
					className={styles.details}
					onClick={(e) => {
						e.stopPropogation();
						routeToUserDetails(listItem.id);
					}}
				>
					View details

				</Button>
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
					disabled={isEmpty(list)}
				>
					Download CSV
				</Button>

			</section>
			{(isEmpty(list) && !loading) ? (
				<EmptyState
					height={100}
					width={140}
					emptyText="No team members found"
					textSize="18px"
				/>
			) : <Table data={data} columns={columns} loading={loading} /> }

		</div>
	);
}

export default ListItem;
