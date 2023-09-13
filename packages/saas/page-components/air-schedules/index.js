import { Button, Pagination } from '@cogoport/components';
import {
	SelectController,
} from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMPortArrow } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import Loading from './common/Loading';
import NoSchedulesCard from './components/NoSchedulesCard';
import ScheduleCard from './components/ScheduleCard';
import useCreateSchedule from './hooks/useCreateSchedule';
import useFetchSchedules from './hooks/useFetchSchedules';
import styles from './styles.module.css';

function AirSchedules() {
	const {
		handleCreateSchedule,
		errorMessage, formValues, control, fields,
	} = useCreateSchedule();

	const {
		fetchSchedules, schedules, loading,
		setCurrentPage, currentPage,
	} = useFetchSchedules();

	const { list = [], total_count = 0, page_limit = 0 } = schedules || {};

	return (
		<div className={styles.container}>
			<div className={styles.header}>Air Schedule Tracker</div>
			<div className={styles.tracker_card}>
				<div>
					Enter a airport pair to view and compare and save air schedules.
				</div>
				<form className={styles.form_container}>
					<div className={styles.select_container}>
						Origin Airport
						<SelectController {...fields[GLOBAL_CONSTANTS.zeroth_index]} control={control} />
					</div>
					<div className={styles.icon_container}>
						<IcMPortArrow
							fill="#88CAD1"
							width="2rem"
							height="2rem"
						/>
					</div>
					<div className={styles.select_container}>
						Destination Airport
						<SelectController {...fields[GLOBAL_CONSTANTS.one]} control={control} />
					</div>
					<div className={styles.button_container}>
						<Button
							onClick={handleCreateSchedule}
							disabled={
								!(formValues.origin_airport
									&& formValues.destination_airport)
							}
							type="button"
						>
							Search Schedule
						</Button>
					</div>
				</form>
				{errorMessage ? (
					<div className={styles.error_message}>
						* origin and destination could not be same
					</div>
				) : null}
			</div>
			<div className={styles.sub_heading_container}>My Schedules</div>
			<div className={styles.schedules_container}>
				{loading ? (
					<div className={styles.card}>
						<Loading home />
					</div>
				) : null}
				{!loading && !isEmpty(list) ? (
					(list || []).map((item) => (
						<ScheduleCard
							key={item.id}
							schedule={item}
							fetchSchedules={fetchSchedules}
							loading={loading}
						/>
					))
				) : (
					<NoSchedulesCard />
				)}
			</div>

			{!isEmpty(list) && (
				<div className={styles.pagination_container}>
					<Pagination
						type="number"
						currentPage={currentPage}
						totalItems={total_count}
						pageSize={page_limit}
						onPageChange={setCurrentPage}
					/>
				</div>
			)}
		</div>
	);
}

export default AirSchedules;
