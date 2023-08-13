import { Select } from '@cogoport/components';
import React, { useState } from 'react';

import StyledTable from '../../../common/StyledTable';

import ModificationHistory from './ModificationHistory';
import RenderData from './RenderData';
import SelfRatingForm from './SelfRatingForm';
import styles from './styles.module.css';
import useGetColumns from './useGetColumns';

const YEARLY_RATING_CYCLE_OPTIONS = [{
	label: '2023', value: '2023',
}];

function EmployeePerformance({
	data,
	ratingCycle,
	setRatingCycle,
	ratingOptions,
	loading,
	ratingLoading,
	refetch,
	openRatingForm,
	setOpenRatingForm,
	yearlyRatingCycle,
	setYearlyRatingCycle,
}) {
	const [openHistory, setOpenHistory] = useState(false);
	const columns = useGetColumns();

	const {
		final_rating, kra_with_rating, last_reviewed_details,
		current_month_feedback_given,
		is_rating_published,
	} = data || {};

	const { comment, manager_name } = last_reviewed_details || {};

	const handleClose = () => {
		setOpenHistory(false);
	};

	return (
		<>
			<div className={styles.flex}>
				{!ratingLoading && (
					<Select
						className={styles.yearly_rating_cycle_select}
						options={YEARLY_RATING_CYCLE_OPTIONS}
						value={yearlyRatingCycle}
						onChange={(e) => setYearlyRatingCycle(e)}
						size="md"
					/>
				)}

				{!ratingLoading && (
					<Select
						className={styles.rating_cycle_select}
						options={ratingOptions}
						value={ratingCycle}
						onChange={(e) => setRatingCycle(e)}
						size="md"
					/>
				)}
			</div>

			<RenderData
				loading={loading || ratingLoading}
				is_rating_published={is_rating_published}
				current_month_feedback_given={current_month_feedback_given}
				setOpenRatingForm={setOpenRatingForm}
				final_rating={final_rating}
				comment={comment}
				manager_name={manager_name}
				setOpenHistory={setOpenHistory}
			/>

			<div className={styles.system_recommended_rating}>
				<div className={styles.heading}>
					System Recommended Rating :
				</div>
				<StyledTable columns={columns} data={kra_with_rating} loading={loading || ratingLoading} />
			</div>

			{openHistory && (
				<ModificationHistory
					openHistory={openHistory}
					handleClose={handleClose}
					ratingCycle={ratingCycle}
				/>
			)}

			{openRatingForm && (
				<SelfRatingForm
					open={openRatingForm}
					onHide={() => setOpenRatingForm(false)}
					ratingCycle={ratingCycle}
					refetch={refetch}
				/>
			)}
		</>
	);
}

export default EmployeePerformance;
