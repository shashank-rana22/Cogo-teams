const DEFAULT_VALUES = {};
const FIELD_VALUE = {};

const generateDefaultValues = ({ values = [] }) => {
	values.forEach((control) => {
		if (control.type === 'edit_service_charges') {
			DEFAULT_VALUES[control.name] = control.value.map((value) => {
				control.controls.forEach((subControl) => {
					FIELD_VALUE[subControl.name] = value[subControl.name] || '';
				});

				return FIELD_VALUE;
			});
		}
	});

	return DEFAULT_VALUES;
};
export default generateDefaultValues;
