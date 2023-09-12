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
	hr_meet: {
		hr_meet                     : HRMeeting,
		manager_clearance           : ManagerClearance,
		finance_clearance           : FinanceClearance,
		handover_takeover_clearance : HandoverTakeoverClearance,
		admin_clearance             : AdminClearance,
		tech_clearance              : TechClearanceHrbp,
		exit_interview              : ExitInterview,
		exit_reasons                : ExitReasons,
		exit_complete               : ExitInterviewComplete,
	},
	manager_clearance: {
		review_request : ReviewRequest,
		assign_hoto    : HandoverTakeover,
	},
	tech_clearance: {
		tech_clearance         : TechClearance,
		tech_clearance_confirm : TechClearanceConfirm,
	},
	admin_clearance: {
		admin_clearance    : AdminClearance,
		admin_confirmation : AdminConfirmed,
	},
	hoto_clearance: {
		hoto_clearance             : HOTOClearance,
		HOTOClearance_confirmation : HOTOClearanceConfirmation,
	},
};

function FormComponent({
	data = {},
	loading = false,
	refetchApplicationDetails = () => {},
	view_type = 'hoto_clearance',
}) {
	let Render = null;

	Object.keys(COMPONENT_MAPPING[view_type]).every((key) => {
		const { is_complete = false } = data?.[view_type]?.[key] || {};

		Render = COMPONENT_MAPPING?.[view_type]?.[key];

		return is_complete;
	});

	if (loading) return 'loading...';

	return (
		<div className={styles.container}>
			<Render data={data} loading={loading} refetch={refetchApplicationDetails} />
		</div>
	);
}

export default FormComponent;
