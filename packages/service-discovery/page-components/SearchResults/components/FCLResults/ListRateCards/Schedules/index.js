import { Placeholder } from '@cogoport/components';
import React, { useState, useEffect } from 'react';

import useGetWeeklySchedules from '../../../../hooks/useGetWeeklySchedules';

import Footer from './Footer';
import ScheduleItem from './ScheduleItem';
import styles from './styles.module.css';

const LOADING_ARRAY_LENGTH = 5;

const isAlreadyApplied = (filters, data) => {
	if (!filters.departure_after || !filters.departure_before) {
		return false;
	}
	const key = `${filters.departure_after} ${filters.departure_before}`;
	return data.find((item) => `${item.start_date} ${item.end_date}` === key);
};

function Schedules({
	paginationProps = {},
	filters = {},
	setFilters = () => {},
}) {
	const { schedules = [], loading } = useGetWeeklySchedules();

	const [selectedWeek, setSelectedWeek] = useState({});

	useEffect(() => {
		const alreadyApplied = isAlreadyApplied(filters, schedules);

		setSelectedWeek(alreadyApplied || {});
	}, [filters, schedules]);

	return (
		<div className={styles.container}>
			<span className={styles.heading}>Available Schedules for your search</span>

			{loading ? (
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
