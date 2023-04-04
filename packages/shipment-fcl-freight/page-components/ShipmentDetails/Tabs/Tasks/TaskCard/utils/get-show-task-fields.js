const getFunction = {
	condition              : (field, formValues) => (formValues.condition || []).includes(field.condition.condition),
	shipper_contact_status : (field, formValues) => field.show_conditions.shipper_contact_status.includes(
		formValues.shipper_contact_status,
	),
};

const getShowElement = (field, formValues) => {
	let flag = true;

	if (field.type === 'fieldArray') {
		const showElements = [];
		for (let i = 0; i < formValues[field.name]?.length; i += 1) {
			showElements.push({});
		}
		(field.controls || []).forEach((controlObj) => {
			if ('show' in controlObj) {
				for (let j = 0; j < showElements.length; j += 1) {
					if (
						formValues?.destination_cargo_handling_type
						&& [
							'dpd_without_cfs',
							'dpd_cfs_dock_destuffing',
							'dpd_cfs_factory_destuffing',
						].includes(formValues?.destination_cargo_handling_type)
					) {
						showElements[j][controlObj.name] = true;
					} else {
						showElements[j][controlObj.name] = controlObj.show;
					}
				}
			}
		});
		return showElements;
	}

	if (formValues.booking_ref_status === 'not_placed') {
		if (
			[
				'booking_reference_delay_reasons',
				'booking_reference_delay_remarks',
			].includes(field.name)
		) {
			return true;
		}
		return false;
	}
	if (formValues.booking_ref_status === 'placed') {
		if (
			field.name === 'booking_reference_number'
			|| field.name === 'booking_reference_proof'
		) {
			return true;
		}
		return false;
	}

	if (
		formValues?.destination_cargo_handling_type
		&& [
			'dpd_without_cfs',
			'dpd_cfs_dock_destuffing',
			'dpd_cfs_factory_destuffing',
		].includes(formValues?.destination_cargo_handling_type)
	) {
		if (field.name === 'authorize_letter_and_dpd_code') {
			return true;
		}
	}

	if ('show' in field) {
		return field.show;
	}

	const { show_conditions: condition } = field;
	Object.keys(condition || {}).forEach((conditionName) => {
		flag =			flag && (getFunction[conditionName] || (() => true))(field, formValues);
	});

	return flag;
};

const getShowTaskFields = (formValues, controls = []) => {
	const showElements = {};
	controls.forEach((ctrl) => {
		showElements[ctrl.name] = getShowElement(ctrl, formValues);
	});
	return showElements;
};

export default getShowTaskFields;
