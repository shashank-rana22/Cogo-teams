import { Button, Select, RatingComponent } from '@cogoport/components';
import { IcMArrowNext } from '@cogoport/icons-react';
import React, { useState } from 'react';

import Spinner from '../../../common/Spinner';
import StyledTable from '../../../common/StyledTable';

import ModificationHistory from './ModificationHistory';
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

	const renderData = () => {
		if (loading) {
			return <div className={styles.spinner_container}><Spinner /></div>;
		}

		if (!is_rating_published) {
			return (
				<div className={styles.no_feedback_container}>
					Sit tight. The ratings have not been published for this cycle yet.
				</div>
			);
		}

		if (is_rating_published && !current_month_feedback_given) {
			return (
				<div className={styles.no_feedback_container}>
					Please submit the self rating form to view your rating for this month.
					<Button className={styles.open_form_btn} onClick={() => setOpenRatingForm(true)}>Open Form</Button>
				</div>
			);
		}

		return (
			<div className={styles.final_comment}>
				<div className={styles.flex}>
					<div className={styles.final_rating_heading}>
						Final Comment and Rating :
					</div>
					<RatingComponent
						type="star"
						value={final_rating}
						totalStars={final_rating}
						disabled
						size="xl"
					/>
				</div>

				<div className={styles.final_comment_rating}>
					{comment}
				</div>
				<div className={styles.final_reviewer}>
					-
					{' '}
					{manager_name}
				</div>
				<div className={styles.all_comments_section}>
					<Button onClick={() => setOpenHistory(true)}>View All Comments</Button>
				</div>
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

			{renderData()}

			<div className={styles.system_recommended_rating}>
				<div className={styles.heading}>
					System Recommended Rating :
				</div>
				<StyledTable columns={columns} data={kra_with_rating} loading={loading} />
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
