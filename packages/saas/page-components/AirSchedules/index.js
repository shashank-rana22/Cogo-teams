import React from 'react';

import ListPagination from './common/ListPagination';
import useFetchLocations from './hooks/useFetchLocations';
import ScheduleCard from './page-components/schedule-card';
import SearchCard from './page-components/search-card';
import styles from './styles.module.css';

function Schedules() {
	const { data, loading, refetchSchedule, filter, setFilters } = useFetchLocations();
	return (

		<div>
			<SearchCard refetchSchedule={refetchSchedule} />
			{!loading ? (
				<div className={styles.flex_container}>
					{data && data.list.map((schedule) => (
						<ScheduleCard schedule={schedule} key={schedule.id} refetchSchedule={refetchSchedule} />))}
				</div>
			) : null}
			<ListPagination filters={filter} setFilters={setFilters} data={data} />
		</div>
	);
}

export default (Schedules);
