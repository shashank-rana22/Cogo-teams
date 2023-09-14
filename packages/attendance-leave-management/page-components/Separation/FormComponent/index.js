import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import React, { useState } from 'react';

import AdminClearance from './admin-view/admin-clearance';
// import HOTOClearanceConfirmation from './employee-view/HOTOClearanaceConfirmation';
import HOTOClearance from './employee-view/HOTOClearance';
import FinanceClearanceEmployeeSide from './finance-view';
import AdminClearanceHrbp from './hrbp-view/AdminClearanceHrbp';
import ExitInterview from './hrbp-view/ExitInterview';
// import ExitInterviewComplete from './hrbp-view/ExitInterviewComplete';
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
// import TechClearanceConfirm from './tech-view/TechClearanceConfirm';

const COMPONENT_MAPPING = {
	hr_meet: {
		hr_meet                     : HRMeeting,
		manager_clearance           : ManagerClearance,
		finance_clearance           : FinanceClearance,
		handover_takeover_clearance : HandoverTakeoverClearance,
		admin_clearance             : AdminClearanceHrbp,
		tech_clearance              : TechClearanceHrbp,
		exit_interview              : ExitInterview,
		exit_reasons                : ExitReasons,
	},
	manager_clearance: {
		review_request : ReviewRequest,
		assign_hoto    : HandoverTakeover,
	},
	tech_clearance: {
		// tech_clearance_confirm : TechClearanceConfirm,
		tech_clearance: TechClearance,
	},
	admin_clearance: {
		admin_clearance: AdminClearance,
	},
	hoto_clearance: {
		hoto_clearance: HOTOClearance,
	//	HOTOClearance_confirmation : HOTOClearanceConfirmation,
	},
	finance: {
		finance_clearance_employee_side: FinanceClearanceEmployeeSide,
	//	finance_clearance_confirm_modal : FinanceEmployeeConfirmModal,
	},
};

function FormComponent({
	data = {},
	loading = false,
	refetchApplicationDetails = () => {},
	view_type = 'hrbp_clearance',
}) {
	const [currentComponent, setCurrentComponent] = useState('hr_meet');
	const ONE = 1; const MINUS_ONE = -1;
	let Render = null;

	if (view_type === 'hrbp_clearance') {
		const handleNext = () => {
			const componentKeys = Object.keys(COMPONENT_MAPPING.hr_meet);
			const currentIndex = componentKeys.indexOf(currentComponent);

			if (currentIndex !== MINUS_ONE && currentIndex < componentKeys.length - ONE) {
				setCurrentComponent(componentKeys[currentIndex + ONE]);
			}
		};

		const handleBack = () => {
			const componentKeys = Object.keys(COMPONENT_MAPPING.hr_meet);
			const currentIndex = componentKeys.indexOf(currentComponent);

			if (currentIndex !== MINUS_ONE && currentIndex > GLOBAL_CONSTANTS.zeroth_index) {
				setCurrentComponent(componentKeys[currentIndex - ONE]);
			}
		};

		Render = COMPONENT_MAPPING.hr_meet?.[currentComponent];

		return (
			<div className={styles.container}>
				{Render ? (
					<Render
						data={data}
						loading={loading}
						refetch={refetchApplicationDetails}
						handleBack={handleBack}
						handleNext={handleNext}
					/>
				) : (
					<p>No component to render based on currentComponent</p>
				)}
			</div>
		);
	}

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
