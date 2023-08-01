const generateDefaultValues = ({ values = [] }) => {
	const DEFAULT_VALUES = {};

	(values || []).forEach((control) => {
		if (control.type === 'edit_service_charges') {
			DEFAULT_VALUES[control.name] = control.value.map((value) => {
				const FIELD_VALUES = {};

				control.controls.forEach((subControl) => {
					FIELD_VALUES[subControl.name] = value[subControl.name] || '';
				});

				return FIELD_VALUES;
			});
		}
	});

	return DEFAULT_VALUES;
};
export default generateDefaultValues;
