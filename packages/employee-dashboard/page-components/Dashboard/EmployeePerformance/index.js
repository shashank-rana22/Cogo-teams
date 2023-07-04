import { Button, Select, RatingComponent, Toast } from '@cogoport/components';
import { IcMArrowNext } from '@cogoport/icons-react';
import React, { useState } from 'react';

import Spinner from '../../../common/Spinner';
import StyledTable from '../../../common/StyledTable';
import useCreateFeedback from '../../../hooks/useCreateFeedback';

import ModificationHistory from './ModificationHistory';
import { RATING_MAPPING } from './ratingMapping';
import styles from './styles.module.css';
import useGetColumns from './useGetColumns';

const FEEDBACK_OBJ_LENGTH = 3;

function EmployeePerformance({
	data,
	ratingCycle,
	setRatingCycle,
	ratingOptions,
	loading,
}) {
	const [feedbackRating, setFeedbackRating] = useState({});
	const [openHistory, setOpenHistory] = useState(false);
	const columns = useGetColumns();

	const { createFeedback } = useCreateFeedback(ratingCycle);

	const {
		final_rating, kra_with_rating, last_reviewed_details,
		current_month_feedback_given, previous_feedback = true,
	} = data || {};

	const { comment, manager_name } = last_reviewed_details || {};

	const handleRating = (val, key) => {
		setFeedbackRating((prev) => ({
			...prev,
			[key]: val,
		}));
	};

	const handleClose = () => {
		setOpenHistory(false);
	};

	const submitFeedback = () => {
		const feedbackLength = Object.keys(feedbackRating).length;

		if (feedbackLength === FEEDBACK_OBJ_LENGTH) {
			const objValues = {
				...feedbackRating,
			};

			return createFeedback(objValues);
		}

		return Toast.error('All feedbacks are mandatory');
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

		if (previous_feedback && !final_rating) {
			return (
				<div className={styles.no_feedback_container}>
					Sit tight. The ratings have not been published for this cycle yet.
				</div>
			);
		}

		if (previous_feedback) {
			return (
				<>
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
					<div className={styles.system_recommended_rating}>
						<div className={styles.heading}>
							System Recommended Rating :
						</div>
						<StyledTable columns={columns} data={kra_with_rating} />
					</div>
				</>
			);
		}

		return (
			<div className={styles.no_feedback_container}>
				Rating Feedback for the previous
				cycle is still pending. Please submit the feedback to see the ratings.
			</div>
		);
	};

	return (
		<>
			<div className={styles.flex}>
				<Select
					className={styles.rating_cycle_select}
					options={ratingOptions}
					value={ratingCycle}
					renderLabel={(item) => renderLabel(item)}
					onChange={(e) => setRatingCycle(e)}
					size="md"
				/>
			</div>

			{renderData()}

			{!loading && final_rating && !current_month_feedback_given && (
				<div className={styles.system_recommended_rating}>
					<div className={styles.heading}>
						Feedback :
					</div>
					{RATING_MAPPING.map((val) => (
						<div className={styles.rating_flex} key={val.key}>
							<div className={styles.rating_text}>
								{val.label}
							</div>
							<RatingComponent
								type="star"
								value={feedbackRating[val.key]}
								totalStars={5}
								onChange={(e) => handleRating(e, val.key)}
								size="lg"
							/>
						</div>
					))}
					<div className={styles.btn_container}>
						<Button onClick={submitFeedback}>Submit Feedback</Button>
					</div>
				</div>
			)}

			{openHistory && (
				<ModificationHistory
					openHistory={openHistory}
					handleClose={handleClose}
					ratingCycle={ratingCycle}
				/>
			)}
		</>
	);
}

export default EmployeePerformance;
