import { Button, Select, RatingComponent, Modal, Toast } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcMArrowNext } from '@cogoport/icons-react';
import React, { useState } from 'react';

import StyledTable from '../../../common/StyledTable';
import useCreateFeedback from '../../../hooks/useCreateFeedback';
import useGetHistory from '../../../hooks/useGetHistory';

import { RATING_MAPPING } from './ratingMapping';
import styles from './styles.module.css';
import useGetColumns from './useGetColumns';

const FEEDBACK_OBJ_LENGTH = 3;

function EmployeePerformance({ data }) {
	const [feedbackRating, setFeedbackRating] = useState({});
	const [openHistory, setOpenHistory] = useState(false);
	const columns = useGetColumns();
	const { data : modificationHistory = [], loading } = useGetHistory();
	const { createFeedback } = useCreateFeedback();

	const { final_rating, kra_with_rating, last_reviewed_details } = data || {};

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

	return (
		<>
			<div className={styles.flex}>
				<Select />
				<div className={`${styles.rating_section} ${styles[`rating_${final_rating}`]}`}>
					{final_rating}
					{' '}
					/ 5
				</div>
			</div>
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
			{openHistory && !loading && (
				<Modal size="md" show={openHistory} onClose={handleClose} placement="top">
					<Modal.Header title="Modification History" />
					<Modal.Body>
						{ modificationHistory.map((val, index) => (
							<div className={styles.modification_history} key={index}>
								<div className={styles.history_text}>
									Modified by :
									{' '}
									{manager_name}
									{' '}
									from
									{' '}
									{val.old_rating}
									{' '}
									<IcMArrowNext />
									{' '}
									{val.new_rating}
								</div>
								<div className={styles.history_text}>
									Comment :
									{' '}
									{val.comment || '-'}
								</div>
								<div className={styles.history_text}>
									Modified on :
									{' '}
									{formatDate({
										date: val.updated_at,
										dateFormat:
													GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
										timeFormat : GLOBAL_CONSTANTS.formats.time['hh:mm aaa'],
										formatType : 'dateTime',
										// separator  : '/',
									})}
								</div>
							</div>
						))}
					</Modal.Body>
					<Modal.Footer>
						<Button onClick={handleClose}>OK</Button>
					</Modal.Footer>
				</Modal>
			) }
		</>
	);
}

export default EmployeePerformance;
