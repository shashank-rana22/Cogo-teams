import React from 'react';

import HRMeeting from './hrbp-view/HRMeeting';
import ManagerClearance from './hrbp-view/ManagerClearance';
import ReviewRequest from './manager-view/ReviewRequest';
import styles from './styles.module.css';

const COMPONENT_MAPPING = {
	hrbp: {
		hr_meeting        : HRMeeting,
		manager_clearance : ManagerClearance,
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
