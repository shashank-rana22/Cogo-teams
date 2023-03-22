import { Pagination, Table, TabPanel, Tabs } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { format, startCase } from '@cogoport/utils';
import { useState } from 'react';

import Filters from '../../commons/Filters';

import styles from './styles.module.css';

function StudentsComponent({ test_id }) {
	const [activeTab, setActiveTab] = useState();

	const [params, setParams] = useState({});

	const [{ data, loading }] = useRequest({
		method : 'GET',
		url    : 'list_admin_student_wise_test_result',
		params : {
			test_id: '56c13524-54d0-4bf0-bdce-abb9ce43a86a',
		},
	}, { manual: false });

	const { page_limit = 0, total_count = 0, list } = data || {};

	console.log(list, 'data');

	const columns = [
		{
			Header   : 'NAME',
			id       : 'a',
			accessor : ({ user = '' }) => (
				<section>{user}</section>
			),
		},

		{
			Header   : 'PASSED / FAILED',
			id       : 'ss',
			accessor : ({ result = 0 }) => (
				<section>{startCase(result) || '-'}</section>
			),
		},
		{
			Header   : 'SCORE',
			id       : 'e',
			accessor : ({ score_achieved = '', total_score }) => (
				<section>
					{score_achieved || '0'}
					/
					{total_score}
				</section>
			),
		},
		// {
		// 	Header   : 'TOPIC WISE SCORE',
		// 	id       : 'ik',
		// 	accessor : ({ audience_ids = [] }) => (
		// 		<section>{audience_ids.length}</section>
		// 	),
		// },

		{
			Header   : 'PERCENTILE',
			id       : 'results',
			accessor : ({ percentile = '' }) => (
				<div>
					{percentile}
				</div>
			),
		},
		// {
		// 	Header   : 'TIME TAKEN',
		// 	id       : 'updatedAt',
		// 	accessor : ({ updated_at = '' }) => (
		// 		<section>
		// 			{format(updated_at, 'dd MMM yyyy')}
		// 		</section>
		// 	),
		// },
		{
			Header   : 'ATTEMPTED ON',
			id       : 'updatedAt',
			accessor : ({ attempted_on = '' }) => (
				<section>
					{format(attempted_on, 'dd MMM yyyy hh:mm a')}
				</section>
			),
		},
	];

	return (
		<div>
			<div className={styles.tabs_container}>
				<Tabs
					activeTab={activeTab}
					themeType="tertiary"
					onChange={setActiveTab}
				>
					<TabPanel name="local_rates" title="Appeared" badge={3} />

					<TabPanel name="suggested_rates" title="Not Appeared" badge={5} />
				</Tabs>
			</div>

			<Filters />

			<div className={styles.table_container}>
				<Table
					className={styles.table_container}
					data={list || []}
					columns={columns}
					loading={loading}
				/>

				{total_count > 10 ? (
					<div className={styles.pagination_container}>
						<Pagination
							type="table"
							currentPage={params?.page}
							totalItems={total_count}
							pageSize={page_limit}
							// onPageChange={(val) => setParams((prev) => ({ ...prev, page: val }))}
						/>
					</div>
				) : null}

			</div>
		</div>
	);
}

export default StudentsComponent;
