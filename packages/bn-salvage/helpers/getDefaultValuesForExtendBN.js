const prefillDateValues = [
	'schedule_departure',
	'schedule_arrival',
	'vgm_cutoff',
	'si_cutoff',
	'tr_cutoff',
	'document_cutoff',
	'gate_in_cutoff',
	'si_filed_at',
	'expiry',
];

export default function getDefaultValues({ controlsMapping, item }) {
	const defaultValues = {};

	Object.values(controlsMapping).forEach(((stepControls) => {
		stepControls.forEach((ctrl) => {
			if (prefillDateValues.includes(ctrl.name)) {
				const prefillDate = new Date(item?.[ctrl.name]);

				if (prefillDate.toDateString() !== 'Invalid Date') {
					defaultValues[ctrl.name] = prefillDate;
				}
			} else {
				defaultValues[ctrl.name] = item?.[ctrl.name];
			}
		});
	}));
	return defaultValues;
}
