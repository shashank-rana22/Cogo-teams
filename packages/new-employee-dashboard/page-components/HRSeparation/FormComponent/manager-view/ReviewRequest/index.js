import { Button } from '@cogoport/components';
import { IcMArrowRight } from '@cogoport/icons-react';
import React from 'react';

import EmployeeDetail from '../../commons/EmployeeDetail';

import FeedbackForm from './FeedbackForm';
import OutstandingAmount from './OutstandingAmount';
import styles from './styles.module.css';
import useReviewRequest from './useReviewRequest';

function ReviewRequest({ data = {}, refetch = () => {} }) {
	const {
		handleSubmit, onSubmit, control, errors, notes_shared_with_you,
		outstanding_amount_details, is_complete,
	} = useReviewRequest({ data, refetch });

	return (
		<div>
			<div className={styles.title}>REVIEW REQUEST</div>
			<div className={styles.sub_heading}>Separation request summary</div>

			<EmployeeDetail data={data} />

			<FeedbackForm
				control={control}
				errors={errors}
				notes_shared_with_you={notes_shared_with_you}
				is_complete={is_complete}
			/>

			<OutstandingAmount outstanding_amount_details={outstanding_amount_details} />

			<div className={styles.button_container}>
				<Button onClick={handleSubmit(onSubmit)}>
					Accept & Proceed
					<IcMArrowRight height="18px" width="18px" />
				</Button>
			</div>
		</div>
	);
}

export default ReviewRequest;
