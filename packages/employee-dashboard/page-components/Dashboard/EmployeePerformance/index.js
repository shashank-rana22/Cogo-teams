import { Select } from '@cogoport/components';
import { IcMArrowNext } from '@cogoport/icons-react';
import React, { useState } from 'react';

import StyledTable from '../../../common/StyledTable';

import ModificationHistory from './ModificationHistory';
import Data from './RenderData';
import SelfRatingForm from './SelfRatingForm';
import styles from './styles.module.css';
import useGetColumns from './useGetColumns';

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

	const renderLabel = (item) => {
		const { label } = item;
		const splitItem = label?.split('-');
		const [firstItem, secondItem] = splitItem || [];
		return (
			<div style={{ display: 'flex', alignItems: 'center' }}>
				{firstItem}
				<IcMArrowNext style={{ margin: '0 8px' }} />
				{secondItem}
			</div>
		);
	};

	return (
		<>
			<div className={styles.flex}>
				{!ratingLoading && (
					<Select
						className={styles.rating_cycle_select}
						options={ratingOptions}
						value={ratingCycle}
						renderLabel={(item) => renderLabel(item)}
						onChange={(e) => setRatingCycle(e)}
						size="md"
					/>
				)}
			</div>

			<Data
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
