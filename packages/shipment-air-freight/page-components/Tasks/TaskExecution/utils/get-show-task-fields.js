const getFunction = {
	condition              : (field, formValues) => (formValues?.condition || []).includes(field?.condition?.condition),
	shipper_contact_status : (field, formValues) => field?.show_conditions?.shipper_contact_status?.includes(
		formValues?.shipper_contact_status,
	),
};
const FOR_LOOP_INCREMENT_VALUE = 1;
const getShowElement = (field, formValues) => {
	let flag = true;

	if (field?.type === 'fieldArray') {
		const SHOW_ELEMENTS = [];

		for (let i = 0; i < formValues?.[field?.name]?.length; i += FOR_LOOP_INCREMENT_VALUE) {
			SHOW_ELEMENTS.push({});
		}

		(field?.controls || []).forEach((controlObj) => {
			if ('show' in controlObj) {
				for (let j = 0; j < SHOW_ELEMENTS.length; j += FOR_LOOP_INCREMENT_VALUE) {
					if (formValues?.destination_cargo_handling_type
						&& ['dpd_without_cfs', 'dpd_cfs_dock_destuffing', 'dpd_cfs_factory_destuffing']
							.includes(formValues?.destination_cargo_handling_type)
					) {
						SHOW_ELEMENTS[j][controlObj?.name] = true;
					} else {
						SHOW_ELEMENTS[j][controlObj?.name] = controlObj?.show;
					}
				}
			}
		});

		return SHOW_ELEMENTS;
	}

	if (formValues.booking_ref_status === 'not_placed') {
		if (['booking_reference_delay_reasons', 'booking_reference_delay_remarks'].includes(field?.name)
		) {
			return true;
		}

		return false;
	}
	if (formValues?.booking_ref_status === 'placed') {
		if (['booking_reference_number', 'booking_reference_proof'].includes(field?.name)) {
			return true;
		}

		return false;
	}

	if (
		formValues?.destination_cargo_handling_type
		&& ['dpd_without_cfs', 'dpd_cfs_dock_destuffing', 'dpd_cfs_factory_destuffing']
			.includes(formValues?.destination_cargo_handling_type)
		&& field?.name === 'authorize_letter_and_dpd_code'
	) {
		return true;
	}

	if ('show' in field) return field.show;

	const { show_conditions: condition } = field;

	Object.keys(condition || {}).forEach((conditionName) => {
		flag = flag && (getFunction?.[conditionName] || (() => true))(field, formValues);
	});

	return flag;
};

const getShowTaskFields = (formValues, controls = []) => {
	const SHOW_ELEMENTS = {};

	controls.forEach((ctrl) => { SHOW_ELEMENTS[ctrl?.name] = getShowElement(ctrl, formValues); });

	return SHOW_ELEMENTS;
};

export default getShowTaskFields;
