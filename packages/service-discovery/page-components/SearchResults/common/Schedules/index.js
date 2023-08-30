import { Placeholder } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import useGetWeeklySchedules from '../../hooks/useGetWeeklySchedules';

import Footer from './Footer';
import ScheduleItem from './ScheduleItem';
import styles from './styles.module.css';

const LOADING_ARRAY_LENGTH = 5;

function Schedules({
	paginationProps = {},
	filters = {},
	selectedWeek = {},
	setSelectedWeek = () => {},
	setFilters = () => {},
	setComparisonRates = () => {},
	loading = false,
}) {
	const { schedules = [], loading: weeklySchedulesLoading } = useGetWeeklySchedules({
		filters,
		setSelectedWeek,
	});

	if (!loading && isEmpty(schedules)) {
		return null;
	}

	return (
		<div className={styles.container}>
			<span className={styles.heading}>Available Schedules for your search</span>

			{weeklySchedulesLoading && isEmpty(schedules) ? (
				<div className={styles.loading}>
					{[...Array(LOADING_ARRAY_LENGTH).keys()].map((item) => (
						<Placeholder
							key={item}
							height="64px"
							width="136px"
							margin="0px 20px 0px 0px"
							style={{ borderRadius: 8 }}
						/>
					))}
				</div>
			) : (
				<div className={styles.wrapper}>
					<div className={styles.schedule_items_container}>
						{(schedules || []).map((weekItem) => (
							<ScheduleItem
								key={`${weekItem.start_date}_${weekItem.end_date}`}
								data={weekItem}
								selectedWeek={selectedWeek}
								setSelectedWeek={setSelectedWeek}
								setFilters={setFilters}
								setComparisonRates={setComparisonRates}
							/>
						))}
					</div>

					<Footer
						paginationProps={paginationProps}
						selectedWeek={selectedWeek}
						loading={loading}
						schedules={schedules}
					/>
				</div>
			)}
		</div>
	);
}

export default Schedules;
