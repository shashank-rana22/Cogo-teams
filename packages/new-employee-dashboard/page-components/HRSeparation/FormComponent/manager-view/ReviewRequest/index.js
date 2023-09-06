import { Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { IcMArrowRight } from '@cogoport/icons-react';
import React from 'react';

import EmployeeDetail from '../../commons/EmployeeDetail';

import FeedbackForm from './FeedbackForm';
import OutstandingAmount from './OutstandingAmount';
import styles from './styles.module.css';

function ReviewRequest() {
	const { control, handleSubmit } = useForm();

	const onSubmit = (values) => {
		console.log('values :: ', values);
	};

	return (
		<div>
			<div className={styles.title}>REVIEW REQUEST</div>
			<div className={styles.sub_heading}>Separation request summary</div>

			<EmployeeDetail />

			<FeedbackForm control={control} />

			<OutstandingAmount />

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
