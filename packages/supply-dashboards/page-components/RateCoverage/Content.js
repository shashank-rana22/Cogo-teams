import { Button, Input, Toggle } from '@cogoport/components';
import { IcMFilter } from '@cogoport/icons-react';
import { useSelector } from '@cogoport/store';
import { useState } from 'react';

import Filter from './components/Filter';
import ListData from './components/ListData';
import TasksOverview from './components/TasksOverview';
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

	const { statistics = {} } = data;

	const handleToggle = () => {
		setFilter((prevFilters) => ({ ...prevFilters, releventToMeValue: !prevFilters?.releventToMeValue }));
	};

	return (
		<div>
			<div className={styles.header_container}>
				<span className={styles.greeting_text}>
					Hi,
					{' '}
					{user_name}
				</span>
				{!filter?.releventToMeValue
					&& (
						<Input
							className={styles.assigned_input}
							size="sm"
							placeholder="Serach by assigned to"
							value={filter?.assigned_to}
							onChange={(val) => setFilter((prev) => ({ ...prev, assigned_to: val }))}
						/>
					)}
				<div className={styles.filter_container}>
					<Toggle
						name="a4"
						size="md"
						className={styles.relevent_toggle}
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
					filter={filter}
					setFilter={setFilter}
					setSerialId={setSerialId}
					setShowWeekData={setShowWeekData}
					setSource={setSource}
				/>
			)}
			<TasksOverview
				data={statistics}
				statsLoading={loading}
				showWeekData={showWeekData}
				setShowWeekData={setShowWeekData}
				filter={filter}
				setFilter={setFilter}
				setSource={setSource}
			/>
			<ListData
				data={data}
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
			/>
		</div>
	);
}
export default RateCoverageContent;
