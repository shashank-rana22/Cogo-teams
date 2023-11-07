import { Placeholder } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import useGetWeeklySchedules from '../../hooks/useGetWeeklySchedules';

import Footer from './Footer';
import ScheduleItem from './ScheduleItem';
import styles from './styles.module.css';

function Schedules({
	paginationProps = {},
	filters = {},
	setComparisonRates = () => {},
	loading = false,
	setScheduleLoading = () => {},
	setSelectedSchedule = () => {},
	selectedSchedule = {},
	isMobile = false,
}) {
	const { schedules = [], loading: weeklySchedulesLoading } = useGetWeeklySchedules({ filters });

	const LOADING_ARRAY_LENGTH = isMobile ? 2 : 5;

	if (!loading && isEmpty(schedules)) {
		return null;
	}

	const selectedWeek = schedules.find(
		(item) => item.start_date === selectedSchedule.departure_after
			&& item.end_date === selectedSchedule.departure_before,
	) || {};

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
								setComparisonRates={setComparisonRates}
								setScheduleLoading={setScheduleLoading}
								setSelectedSchedule={setSelectedSchedule}
							/>
						))}
					</div>

					<Footer
						paginationProps={paginationProps}
						selectedWeek={selectedWeek}
						schedules={schedules}
					/>
				</div>
			)}
		</div>
	);
}

export default Schedules;
