import { Pagination } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';

import ScheduleItem from './ScheduleItem';
import styles from './styles.module.css';

const isAlreadyApplied = (filters, data) => {
	if (!filters.departure_after || !filters.departure_before) {
		return false;
	}
	const key = `${filters.departure_after} ${filters.departure_before}`;
	return data.find((item) => `${item.start_date} ${item.end_date}` === key);
};

function Schedules({
	weekly_data = [],
	paginationProps = {},
	filters = {},
	setFilters = () => {},
}) {
	const alreadyApplied = isAlreadyApplied(filters, weekly_data);

	const [selectedWeek, setSelectedWeek] = useState(alreadyApplied || {});

	const { page, page_limit, total_count } = paginationProps;

	return (
		<div className={styles.container}>
			<span className={styles.heading}>Available Schedules for your search</span>

			<div className={styles.schedule_items_container}>
				{(weekly_data || []).map((weekItem) => (
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
				{!isEmpty(selectedWeek) ? (
					<div className={styles.rates_count}>
						{selectedWeek?.count}
						{' '}
						Options available
						{'  '}
						<span>
							between
							{' '}
							<strong>
								{formatDate({
									date       : selectedWeek?.start_date,
									dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM'],
									formatType : 'date',
								})}
								{' '}
								&
								{' '}
								{formatDate({
									date       : selectedWeek?.end_date,
									dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM'],
									formatType : 'date',
								})}
							</strong>
						</span>
					</div>
				) : null}

				<div className={styles.pagination}>
					<Pagination
						type="table"
						currentPage={page}
						totalItems={total_count}
						pageSize={page_limit}
						onPageChange={(val) => setFilters((prev) => ({
							...prev,
							page: val,
						}))}
					/>
				</div>
			</div>
		</div>
	);
}

export default Schedules;
