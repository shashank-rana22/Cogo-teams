import getGeoConstants from '@cogoport/globalization/constants/geo';
import getCommodityList from '@cogoport/globalization/utils/getCommodityList';
import { addDays } from '@cogoport/utils';

const geo = getGeoConstants();

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

export default function getModifiedControls({
	currentControls,
	schedule_departure,
	container_type,
	commodity,
	setValue,
}) {
	const mutatedControls = currentControls;

	mutatedControls.forEach((ctrl, index) => {
		if (ctrl.name === 'container_type') {
			mutatedControls[index] = {
				...ctrl,
				options: geo?.options?.freight_container_types || [],
			};
		}
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
		if (ctrl.name === 'commodity') {
			const newOptions = getCommodityList('freight', container_type);
			mutatedControls[index] = {
				...ctrl,
				disabled : !container_type,
				options  : newOptions,
			};
			if (!newOptions.some((option) => option.value === commodity) && commodity) {
				setValue('commodity', undefined);
			}
		}
	});

	return mutatedControls;
}
