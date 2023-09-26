import { Button, Select, Toggle } from '@cogoport/components';
import { asyncFieldsPartnerUsers, useGetAsyncOptions } from '@cogoport/forms';
import { IcMFilter } from '@cogoport/icons-react';
import { useSelector } from '@cogoport/store';
import { merge } from '@cogoport/utils';
import { useState } from 'react';

import Filter from './components/Filter';
import ListData from './components/ListData';
import TasksOverview from './components/TasksOverview';
import useGetCoverageStats from './hooks/useGetCoverageStats';
import useGetListCoverage from './hooks/useGetListCoverages';
import styles from './styles.module.css';

function RateCoverageContent() {
	const { user_data } = useSelector(({ profile }) => ({
		user_data: profile || {},
	}));
	const { user: { name: user_name = '' } = {} } = user_data;

	const [showFilters, setShowFilters] = useState(false);
	const [serialId, setSerialId] = useState('');
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
	} = useGetListCoverage();

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
				status: 'active',
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
					<Button
						themeType="secondary"
						onClick={() => { setShowFilters((prev) => !prev); }}
						style={{ width: '100px' }}
					>
						<IcMFilter style={{ marginRight: '6px', width: 'auto', height: '16px' }} />
						<span className={styles.filter_text}> Filter </span>
					</Button>
				</div>
			</div>
			{showFilters
			&& (
				<Filter
					filter={filter}
					setFilter={setFilter}
					setSerialId={setSerialId}
					setShowWeekData={setShowWeekData}
					setSource={setSource}
				/>
			)}
			<TasksOverview
				data={statsData}
				statsLoading={statsLoading}
				showWeekData={showWeekData}
				setShowWeekData={setShowWeekData}
				filter={filter}
				setFilter={setFilter}
				setSource={setSource}
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
				serialId={serialId}
				setSerialId={setSerialId}
				getStats={getStats}
			/>
		</div>
	);
}
export default RateCoverageContent;
