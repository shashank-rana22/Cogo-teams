import { Button, Toggle } from '@cogoport/components';
import { IcMFilter } from '@cogoport/icons-react';
import { useSelector } from '@cogoport/store';
import { useState } from 'react';

import Filter from './components/Filter';
import ListData from './components/ListData';
import TasksOverview from './components/TasksOverview';
import useGetCoverageDetails from './hooks/useGetCoverageDetails';
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
		data:statsData,
		loading:statsLoading,
		getCoverageDetails,
		filter,
		setFilter,
	} = useGetCoverageDetails();
	const {
		data:listData,
		loading:listLoading,
		getListCoverage,
		source,
		setSource,
		page,
		setPage,
	} = useGetListCoverage(filter);
	const finalList = listData?.list;
	const statsList = listData?.stats;

	const handleToggle = () => {
		setFilter((prevFilters) => ({ ...prevFilters, releventToMeValue: !prevFilters?.releventToMeValue }));
	};

	return (
		<div>
			<div className={styles.header_container}>
				<span className={styles.greeting_text}>
					Hi
					{' '}
					{user_name}
				</span>
				<div className={styles.filter_container}>
					<Toggle
						name="a4"
						size="md"
						disabled={false}
						checked={!filter?.releventToMeValue}
						onLabel="Relevant to all"
						offLabel="Relevant to me"
						onChange={handleToggle}
					/>
					<Button
						themeType="none"
						className={styles.filter_button}
						onClick={() => { setShowFilters((prev) => !prev); }}
					>
						<IcMFilter />
						Filter
					</Button>
				</div>
			</div>
			{showFilters
			&& (
				<Filter
					getCoverageDetails={getCoverageDetails}
					getListCoverage={getListCoverage}
					filter={filter}
					setFilter={setFilter}
					setSerialId={setSerialId}
					setShowWeekData={setShowWeekData}
				/>
			)}
			<TasksOverview
				data={statsData}
				statsLoading={statsLoading}
				showWeekData={showWeekData}
				setShowWeekData={setShowWeekData}
			/>
			<ListData
				data={statsList}
				list={finalList}
				getListCoverage={getListCoverage}
				filter={filter}
				listLoading={listLoading}
				source={source}
				setSource={setSource}
				page={page}
				setPage={setPage}
				setFilter={setFilter}
				serialId={serialId}
				setSerialId={setSerialId}
			/>
		</div>
	);
}
export default RateCoverageContent;
