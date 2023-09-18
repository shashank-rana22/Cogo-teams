import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import React from 'react';

import AdminClearance from './admin-view/admin-clearance';
import HOTOClearance from './employee-view/HOTOClearance';
import FinanceClearanceEmployeeSide from './finance-view';
import AdminClearanceHrbp from './hrbp-view/AdminClearanceHrbp';
import ExitInterview from './hrbp-view/ExitInterview';
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

const INVALID_INDEX = -1;

const COMPONENT_MAPPING = {
	hr_meet: {
		hr_meet           : HRMeeting,
		manager_clearance : ManagerClearance,
		finance_clearance : FinanceClearance,
		hoto_clearance    : HandoverTakeoverClearance,
		admin_clearance   : AdminClearanceHrbp,
		tech_clearance    : TechClearanceHrbp,
		exit_interview    : ExitInterview,
		exit_reasons      : ExitReasons,
	},
	manager_clearance: {
		review_request : ReviewRequest,
		assign_hoto    : HandoverTakeover,
	},
	tech_clearance: {
		tech_clearance: TechClearance,
	},
	admin_clearance: {
		admin_clearance: AdminClearance,
	},
	hoto_clearance: {
		hoto_clearance: HOTOClearance,
	},
	finance_clearance: {
		finance_clearance_employee_side: FinanceClearanceEmployeeSide,
	},
};

function FormComponent({
	data = {},
	loading = false,
	refetchApplicationDetails = () => {},
	view_type = '',
	// currentComponent = 'hr_meet',
	currentComponent = 'finance_clearance',
	setCurrentComponent = () => {},
}) {
	let Render = null;

	if (view_type === 'hrbp_clearance') {
		const handleNext = () => {
			const componentKeys = Object.keys(COMPONENT_MAPPING.hr_meet);
			const currentIndex = componentKeys.indexOf(currentComponent);

			if (currentIndex !== INVALID_INDEX && currentIndex < componentKeys.length - GLOBAL_CONSTANTS.one) {
				setCurrentComponent(componentKeys[currentIndex + GLOBAL_CONSTANTS.one]);
			}
		};

		const handleBack = () => {
			const componentKeys = Object.keys(COMPONENT_MAPPING.hr_meet);
			const currentIndex = componentKeys.indexOf(currentComponent);

			if (currentIndex !== INVALID_INDEX && currentIndex > GLOBAL_CONSTANTS.zeroth_index) {
				setCurrentComponent(componentKeys[currentIndex - GLOBAL_CONSTANTS.one]);
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

	// Object.keys(COMPONENT_MAPPING[view_type]).every((key) => {
	// 	const { is_complete = false } = data?.[view_type]?.[key] || {};

	// 	Render = COMPONENT_MAPPING?.[view_type]?.[key];

	// 	return is_complete;
	// });

	return (
		<div className={styles.container}>
			<FinanceClearanceEmployeeSide data={data} loading={loading} refetch={refetchApplicationDetails} />
		</div>
	);
}

export default FormComponent;
