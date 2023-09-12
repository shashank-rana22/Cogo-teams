import { Button } from '@cogoport/components';
import { useRouter } from '@cogoport/next';
import React from 'react';

import Layout from '../../../../common/Layout';
import useCreateSchedule from '../../hooks/useCreateSchedule';

import styles from './styles.module.css';

function SearchCard({ refetchSchedule = () => {} }) {
	const router = useRouter();
	const { handleSubmit, createSchedule, controls, control } = useCreateSchedule();
	const submitForm = async (values) => {
		const { origin, destination } = values;
		const data = await createSchedule(origin, destination);
		if (data == null) return;

		// await refetchQuota();
		await refetchSchedule();
		router.push(
			'/saas/air-schedules/[schedule_id]?isFirstVisit=true',
			`/saas/air-schedules/${data.id}?isFirstVisit=true`,
		);
	};
	return (
		<div className={styles.card}>
			<div className={styles.heading}>
				<span>Air Schedule Tracker</span>
				<p>Enter a pair to view and compare and save Air Schedules.</p>
			</div>

			<form
				style={{
					width          : '100%',
					display        : 'flex',
					justifyContent : 'space-between',
					marginTop      : 24,
				}}
			>
				<Layout control={control} controls={controls} />
				<div className={styles.styled_form_item}>
					<Button
						size="lg"
						onClick={handleSubmit(submitForm)}
						id="air_sch_search_btn"
					>
						Search Schedule
					</Button>
				</div>
			</form>

		</div>
	);
}

export default SearchCard;
