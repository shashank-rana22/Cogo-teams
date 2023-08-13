import { Button, RatingComponent } from '@cogoport/components';
import React from 'react';

import Spinner from '../../../../common/Spinner';

import styles from './styles.module.css';

function RenderData({
	loading, is_rating_published, current_month_feedback_given,
	setOpenRatingForm, final_rating, comment, manager_name, setOpenHistory,
}) {
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

				<div style={{ paddingLeft: 14 }}>
					<RatingComponent
						type="star"
						value={final_rating}
						totalStars={5}
						disabled
						size="xl"
					/>
				</div>
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
}

export default RenderData;
