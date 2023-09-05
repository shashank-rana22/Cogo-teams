import React from 'react';

import HRMeeting from './HRMeeting';
import ReviewRequest from './manager-view/ReviewRequest';
import styles from './styles.module.css';

const COMPONENT_MAPPING = {
	hrbp: {
		hr_meeting: HRMeeting,
	},
	manager: {
		review_request: ReviewRequest,
	},
};

function FormComponent() {
	const Render = COMPONENT_MAPPING.hrbp.hr_meeting;

	return (
		<div className={styles.container}>
			<Render />
		</div>
	);
}

export default FormComponent;
