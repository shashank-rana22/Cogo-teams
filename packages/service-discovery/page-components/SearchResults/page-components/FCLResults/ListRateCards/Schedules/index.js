import { Placeholder } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import useGetWeeklySchedules from '../../../../hooks/useGetWeeklySchedules';

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
}) {
	const { schedules = [], loading } = useGetWeeklySchedules({
		filters,
		setSelectedWeek,
	});

	return (
		<div className={styles.container}>
			<span className={styles.heading}>Available Schedules for your search</span>

			{loading && isEmpty(schedules) ? (
				<div className={styles.loading}>
					{[...Array(LOADING_ARRAY_LENGTH)].map((_) => (
						<Placeholder
							key={_}
							height="66px"
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

					<div className={styles.footer}>
						<Footer
							paginationProps={paginationProps}
							setFilters={setFilters}
							selectedWeek={selectedWeek}
						/>
					</div>
				</div>
			)}
		</div>
	);
}

export default Schedules;
