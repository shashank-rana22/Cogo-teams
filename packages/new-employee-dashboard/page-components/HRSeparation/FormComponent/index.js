import React from 'react';

import AdminClearance from './admin-view/admin-clearance';
import AdminConfirmed from './admin-view/admin-confirmation';
import HOTOClearanceConfirmation from './employee-view/HOTOClearanaceConfirmation';
import HOTOClearance from './employee-view/HOTOClearance';
import ExitInterview from './hrbp-view/ExitInterview';
import FinanceClearance from './hrbp-view/FinanceClearance';
import HandoverTakeoverClearance from './hrbp-view/HandoverTakeoverClearance';
import HRMeeting from './hrbp-view/HRMeeting';
import ManagerClearance from './hrbp-view/ManagerClearance';
import TechClearanceHrbp from './hrbp-view/TechClearanceHrbp';
import HandoverTakeover from './manager-view/HandoverTakeover';
import ReviewRequest from './manager-view/ReviewRequest';
import styles from './styles.module.css';
import TechClearance from './tech-view/TechClearance';
import TechClearanceConfirm from './tech-view/TechClearanceConfirm';

const COMPONENT_MAPPING = {
	hrbp: {
		hr_meeting                  : HRMeeting,
		manager_clearance           : ManagerClearance,
		finance_clearance           : FinanceClearance,
		handover_takeover_clearance : HandoverTakeoverClearance,
		admin_clearance             : AdminClearance,
		tech_clearance              : TechClearanceHrbp,
		exit_interview              : ExitInterview,
	},
	manager: {
		review_request    : ReviewRequest,
		handover_takeover : HandoverTakeover,
	},
	tech: {
		tech_clearance         : TechClearance,
		tech_clearance_confirm : TechClearanceConfirm,
	},
	admin: {
		admin_clearance    : AdminClearance,
		admin_confirmation : AdminConfirmed,
	},
	employee: {
		HOTOClearance,
		HOTOClearance_confirmation: HOTOClearanceConfirmation,
	},

};

function FormComponent() {
	const Render = COMPONENT_MAPPING.hrbp.exit_interview;

	return (
		<div className={styles.container}>
			<Render />
		</div>
	);
}

export default FormComponent;
