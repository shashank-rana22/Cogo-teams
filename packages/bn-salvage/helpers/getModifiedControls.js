import { addDays } from '@cogoport/utils';

const defaultDatePickerProperties = {
	placeholder           : 'Select Date',
	isPreviousDaysAllowed : true,
	showTimeSelect        : true,
	dateFormat            : 'MMM dd, yyyy, hh:mm:ss aaa',
};
const cut_offs = [
	'vgm_cutoff',
	'si_cutoff',
	'tr_cutoff',
	'document_cutoff',
	'gate_in_cutoff',
	'si_filed_at',
	'expiry',
];

export default function getMutatedControls(currentControls, schedule_departure) {
	const mutatedControls = currentControls;

	mutatedControls.forEach((ctrl, index) => {
		if (ctrl.type === 'datepicker') {
			mutatedControls[index] = {
				...ctrl,
				...defaultDatePickerProperties,
			};
		}
		if (ctrl.name === 'schedule_arrival') {
			mutatedControls[index].minDate = schedule_departure ? addDays(schedule_departure, 1) : undefined;
			mutatedControls[index].disable = !schedule_departure;
		}
		if (cut_offs.includes(ctrl.name)) {
			mutatedControls[index].maxDate = schedule_departure;
			mutatedControls[index].disable = !schedule_departure;
		}
	});

	return mutatedControls;
}
