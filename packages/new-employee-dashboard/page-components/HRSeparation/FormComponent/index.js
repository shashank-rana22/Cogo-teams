import React from 'react';

import AdminClearance from './admin-view/admin-clearance';
import AdminConfirmed from './admin-view/admin-confirmation';
import HOTOClearanceConfirmation from './employee-view/HOTOClearanaceConfirmation';
import HOTOClearance from './employee-view/HOTOClearance';
import ExitInterview from './hrbp-view/ExitInterview';
import ExitInterviewComplete from './hrbp-view/ExitInterviewComplete';
import ExitReasons from './hrbp-view/ExitReasons';
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
		exit_reasons                : ExitReasons,
		exit_complete               : ExitInterviewComplete,
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

function FormComponent({ data = {}, loading = false, refetchApplicationDetails = () => {} }) {
	const Render = COMPONENT_MAPPING.hrbp.hr_meeting;

	return (
		<div className={styles.container}>
			<Render data={data} loading={loading} refetch={refetchApplicationDetails} />
		</div>
	);
}

export default FormComponent;
