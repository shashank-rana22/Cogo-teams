import { Input, Select, Button } from '@cogoport/components';
import { useDebounceQuery } from '@cogoport/forms';
import { useRouter } from '@cogoport/next';
import { useState, useEffect } from 'react';

import useGetColumns from '../../common/Columns';
import PerformanceChart from '../../common/PerformanceChart';
// import TeamStats from '../../common/TeamStats';
import useListUserFeedbacks from '../../hooks/useListUserFeedbacks';
import getMonthControls from '../../utils/monthControls';

import styles from './styles.module.css';
import TeamMembersList from './TeamMembersList';

const dummyListData = [
	{
		month                 : 'March',
		year                  : 2023,
		feedbacks_given       : 36,
		below_avg_performance : 12,
		avg_performance       : 12,
		above_avg_performance : 12,
		details               : [],
		// details               : [{
		// 	user_name         : 'Hermione Granger',
		// 	employee_id       : 'COGO5666',
		// 	team_size         : 1,
		// 	feedbacks_pending : 20,
		// 	latest_kpi        : 4,
		// 	score             : 16,
		// },
		// {
		// 	user_name         : 'Neville Longbottom',
		// 	employee_id       : 'COGO5116',
		// 	team_size         : 1,
		// 	feedbacks_pending : 21,
		// 	latest_kpi        : 3,
		// 	score             : 12,
		// },
		// {
		// 	user_name         : 'Ron Weasley',
		// 	employee_id       : 'COGO5016',
		// 	team_size         : 1,
		// 	feedbacks_pending : 21,
		// 	latest_kpi        : 3,
		// 	score             : 16,
		// }],
	},
	{
		month                 : 'February',
		year                  : 2023,
		feedbacks_given       : 36,
		below_avg_performance : 12,
		avg_performance       : 12,
		above_avg_performance : 12,
		details               : [{
			user_name         : 'Nice Person',
			employee_id       : 'COGO5896',
			team_size         : 3,
			feedbacks_pending : 23,
			latest_kpi        : 4,
			score             : 16,
		},
		{
			user_name         : 'Also Person',
			employee_id       : 'COGO5116',
			team_size         : 7,
			feedbacks_pending : 21,
			latest_kpi        : 3,
			score             : 11,
		}],
	},
	{
		month                 : 'January',
		year                  : 2023,
		feedbacks_given       : 36,
		below_avg_performance : 12,
		avg_performance       : 12,
		above_avg_performance : 12,
		details               : [{
			user_name         : 'Pansy Parkinson',
			employee_id       : 'COGO3166',
			team_size         : 1,
			feedbacks_pending : 18,
			latest_kpi        : 3,
			score             : 16,
		},
		{
			user_name         : 'Crabbe Goyle',
			employee_id       : 'COGO5116',
			team_size         : 1,
			feedbacks_pending : 3,
			latest_kpi        : 2,
			score             : 15,
		}],
	},
	{
		month                 : 'December',
		year                  : 2022,
		feedbacks_given       : 36,
		below_avg_performance : 12,
		avg_performance       : 12,
		above_avg_performance : 12,
		details               : [{
			user_name         : 'Hermione Granger',
			employee_id       : 'COGO5666',
			team_size         : 1,
			feedbacks_pending : 20,
			latest_kpi        : 4,
			score             : 16,
		},
		{
			user_name         : 'Neville Longbottom',
			employee_id       : 'COGO5116',
			team_size         : 1,
			feedbacks_pending : 21,
			latest_kpi        : 3,
			score             : 12,
		},
		{
			user_name         : 'Ron Weasley',
			employee_id       : 'COGO5016',
			team_size         : 1,
			feedbacks_pending : 21,
			latest_kpi        : 3,
			score             : 16,
		}],
	},
];

function ManagerDashboard() {
	// const [selectedBucket, setSelectedBucket] = useState('');

	const [searchValue, setSearchValue] = useState('');
	const { query = '', debounceQuery } = useDebounceQuery();

	const { data, params, setParams, setPage } = useListUserFeedbacks({ searchValue: query });

	const columnsToShow = ['name', 'role', 'rating', 'feedback', 'month'];
	const feedbackColumns = useGetColumns({ source: 'manager_dashboard', columnsToShow });
	const { list: newTeamList, page_limit, total_count } = data || {};

	const monthControls = getMonthControls();

	const Router = useRouter();

	const setFilter = (val, type) => {
		setParams({ ...params, filters: { ...(params.filters || {}), [type]: val } });
	};

	const handleClick = () => {
		Router.push('/feedback-system/manager-dashboard/feedback-management');
	};

	useEffect(() => debounceQuery(searchValue), [searchValue]);

	return (
		<div>
			<p className={styles.header_text}>
				Manager Dashboard
			</p>

			<div className={styles.page_actions}>
				<div className={styles.filters}>
					<Select
						value={params.filters?.created_at_year}
						onChange={(val) => setFilter(val, 'created_at_year')}
						placeholder="Select Year"
						style={{ marginRight: '8px' }}
						options={monthControls.created_at_year.options}
					/>

					<Select
						value={params.filters?.created_at_month}
						onChange={(val) => setFilter(val, 'created_at_month')}
						disabled={!params.filters?.created_at_year}
						placeholder="Select Month"
						style={{ marginRight: '8px' }}
						options={monthControls.created_at_month.options}
					/>

					<Input value={searchValue} onChange={setSearchValue} placeholder="Search User.." />
				</div>

				<Button
					themeType="accent"
					size="lg"
					onClick={() => {
						handleClick();
					}}
				>
					Submit Feedback
				</Button>
			</div>

			<div className={styles.stats_section}>
				<PerformanceChart />
			</div>

			<div className={styles.list_section}>
				<div className={styles.list_header}>
					<p className={styles.list_header_text}>
						Team Members Feedback List
					</p>
				</div>

				<div className={styles.table_section}>
					<TeamMembersList
						list={dummyListData}
						loading={false}
						page_limit={3}
						total_count={3}
						pagination={1}
						setPagination={setPage}
					/>
				</div>
			</div>
		</div>
	);
}

export default ManagerDashboard;
