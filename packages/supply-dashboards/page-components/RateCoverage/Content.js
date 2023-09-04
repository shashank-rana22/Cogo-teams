import { Button, Toggle } from '@cogoport/components';
import { IcMFilter } from '@cogoport/icons-react';
import { useState } from 'react';

import Filter from './components/Filter';
import ListData from './components/ListData';
// import RateCoverageDetails from './components/RateCoverageDetails';
// import Stats from './components/Stats';
import TasksOverview from './components/TasksOverview';
import useGetCoverageDetails from './hooks/useGetCoverageDetails';
// import useGetStats from './hooks/useGetStats';
import useGetListCoverage from './hooks/useGetListCoverages';
import styles from './styles.module.css';

function RateCoverageContent() {
	const [showFilters, setShowFilters] = useState(false);

	const handleFilterClick = () => {
		setShowFilters((prev) => !prev);
	};

	const { data:statsData, loading:statsLoading, getCoverageDetails, filter, setFilter } = useGetCoverageDetails();
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
				<div className={styles.relevent_toggle}>
					<Toggle
						name="a4"
						size="md"
						disabled={false}
						checked={!filter?.releventToMeValue}
						onLabel="Relevent to all"
						offLabel="Relevent to me"
						onChange={handleToggle}
					/>
				</div>
				<Button
					themeType="none"
					className={styles.filter_button}
					onClick={handleFilterClick}
				>
					<IcMFilter />
					Filter
				</Button>
			</div>
			{showFilters
			&& (
				<Filter
					getCoverageDetails={getCoverageDetails}
					getListCoverage={getListCoverage}
					filter={filter}
					setFilter={setFilter}
				/>
			)}
			<TasksOverview data={statsData} statsLoading={statsLoading} />
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
			/>
			{/* <Stats data={data} /> */}
			{/* <RateCoverageDetails data={data} loading={loading} filter={filter} /> */}
		</div>
	);
}
export default RateCoverageContent;
