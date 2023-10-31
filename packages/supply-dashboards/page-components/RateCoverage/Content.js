import { Select, Toggle } from '@cogoport/components';
import { asyncFieldsPartnerUsers, useGetAsyncOptions } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useSelector } from '@cogoport/store';
import { merge } from '@cogoport/utils';
import { useState } from 'react';

import ListData from './components/ListData';
import TasksOverview from './components/TasksOverview';
import { USER_SERVICES } from './configurations/helpers/constants';
import useGetCoverageStats from './hooks/useGetCoverageStats';
import useGetListCoverage from './hooks/useGetListCoverages';
import styles from './styles.module.css';

function RateCoverageContent() {
	const { user_data } = useSelector(({ profile }) => ({
		user_data: profile || {},
	}));

	const { user: { name: user_name = '', id: user_id } = {} } = user_data;

	const userService = USER_SERVICES[user_id] || ['fcl_freight'];

	const [showWeekData, setShowWeekData] = useState(false);

	const {
		data = {},
		loading = false,
		getListCoverage = () => {},
		source = null,
		setSource = () => {},
		page = 1,
		setPage = () => {},
		filter = {},
		setFilter = () => {},
	} = useGetListCoverage({ userService });

	const { loading:statsLoading, data:statsData, getStats } = useGetCoverageStats(filter);

	const handleToggle = () => {
		setFilter((prevFilters) => (
			{
				...prevFilters,
				releventToMeValue : !prevFilters?.releventToMeValue,
				assign_to_id      : '',
			}
		));
		setShowWeekData(false);
	};

	const assignToUsers = useGetAsyncOptions(merge(asyncFieldsPartnerUsers(), {
		params: {
			filters: {
				status   : 'active',
				role_ids : GLOBAL_CONSTANTS.uuid.smt_allotted_users_role_ids,
			},
		},
	}));

	const getUserId = (id) => {
		const { options = [] } = assignToUsers;
		const user = options.find((item) => item?.id === id);
		if (user) { return user?.user_id; }
		return undefined;
	};

	return (
		<div>
			<div className={styles.header_container}>
				<span className={styles.greeting_text}>
					Hi,
					{' '}
					{user_name}
				</span>
				<div className={styles.filter_container}>
					{!filter?.releventToMeValue
					&& (
						<Select
							size="sm"
							placeholder="Select"
							value={filter?.assign_to_id}
							{...assignToUsers}
							onChange={(val) => setFilter((prev) => ({
								...prev, assign_to_id: val, user_id: getUserId(val),
							}))}
							style={{ width: '200px' }}
							isClearable
						/>
					)}
					<Toggle
						size="md"
						checked={!filter?.releventToMeValue}
						onLabel="Relevant to all"
						offLabel="Relevant to me"
						onChange={handleToggle}
					/>
				</div>
			</div>

			<TasksOverview
				data={statsData}
				statsLoading={statsLoading}
				showWeekData={showWeekData}
				setShowWeekData={setShowWeekData}
				filter={filter}
				setFilter={setFilter}
			/>
			<ListData
				data={data}
				statsData={statsData}
				getListCoverage={getListCoverage}
				filter={filter}
				listLoading={loading}
				source={source}
				setSource={setSource}
				page={page}
				setPage={setPage}
				setFilter={setFilter}
				getStats={getStats}
				setShowWeekData={setShowWeekData}
				userService={userService}
			/>
		</div>
	);
}
export default RateCoverageContent;
