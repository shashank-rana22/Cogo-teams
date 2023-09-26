import { getByKey } from '@cogoport/utils';

const getStatus = (data, apiKey) => {
	if (getByKey(data, apiKey) === true) {
		return 'completed';
	}

	if (getByKey(data, apiKey) === false) {
		return 'active';
	}

	return 'pending';
};

const getMainStatus = (data, apiKey1, apiKey2) => {
	if (getByKey(data, apiKey1) === true && getByKey(data, apiKey2) === true) {
		return 'completed';
	}

	if (getByKey(data, apiKey1) === true || getByKey(data, apiKey2) === true
    || getByKey(data, apiKey1) === false || getByKey(data, apiKey2) === false) {
		return 'active';
	}

	return 'pending';
};

export const getStepperMapping = (data) => {
	const apiData = {
		hr_meet      : getStatus(data, 'hr_meet.hr_meet.is_complete'),
		rm_clearance : {
			rm_clearance: getMainStatus(
				data,
				'manager_clearance.assign_hoto.is_complete',
				'manager_clearance.review_request.is_complete',
			),
			review_request : getStatus(data, 'manager_clearance.review_request.is_complete'),
			assign_hoto    : getStatus(data, 'manager_clearance.assign_hoto.is_complete'),
		},
		finance_clearance : getStatus(data, 'finance_clearance.finance_clearance.is_complete'),
		hoto_clearance    : getStatus(data, 'hoto_clearance.hoto_clearance.is_complete'),
		admin_clearance   : getStatus(data, 'admin_clearance.admin_clearance.is_complete'),
		tech_clearance    : getStatus(data, 'tech_clearance.tech_clearance.is_complete'),
		exit_interview    : {
			exit_interview: getMainStatus(
				data,
				'exit_interview.exit_interview_scheduled.is_complete',
				'exit_interview.exit_interview_completed.is_complete',
			),
			interview_scheduled : getStatus(data, 'exit_interview.exit_interview_scheduled.is_complete'),
			interview_completed : getStatus(data, 'exit_interview.exit_interview_completed.is_complete'),
		},
	};

	return apiData;
};
