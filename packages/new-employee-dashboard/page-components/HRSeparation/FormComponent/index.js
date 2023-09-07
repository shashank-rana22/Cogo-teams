import React from 'react';

import AdminClearance from './admin-view/admin-clearance';
import AdminConfirmed from './admin-view/admin-confirmation';
import HRMeeting from './hrbp-view/HRMeeting';
import ManagerClearance from './hrbp-view/ManagerClearance';
import ReviewRequest from './manager-view/ReviewRequest';
import styles from './styles.module.css';
import TechClearance from './tech-view/TechClearance';
import TechClearanceConfirm from './tech-view/TechClearanceConfirm';

const COMPONENT_MAPPING = {
	hrbp: {
		hr_meeting        : HRMeeting,
		manager_clearance : ManagerClearance,
	},
	manager: {
		review_request: ReviewRequest,
	},
	tech: {
		tech_clearance         : TechClearance,
		tech_clearance_confirm : TechClearanceConfirm,
	},
	admin: {
		admin_clearance    : AdminClearance,
		admin_confirmation : AdminConfirmed,
	},
};

function FormComponent() {
	const Render = COMPONENT_MAPPING.admin.admin_clearance;

	return (
		<div className={styles.container}>
			<Render />
		</div>
	);
}

export default FormComponent;
