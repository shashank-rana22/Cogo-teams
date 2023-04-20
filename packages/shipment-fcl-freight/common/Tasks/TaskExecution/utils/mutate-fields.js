const mutateFields = (fields, primaryService, formValues) => {
	const newFields = fields;
	Object.keys(fields).forEach((key) => {
		if (key === 'shipper_contact_status') {
			if (primaryService?.shipper_contact_status === 'pending') {
				newFields[key].options = [
					{ label: 'Confirmed', value: 'confirmed' },
					{ label: 'Not Contacted', value: 'pending' },
					{ label: 'Retry', value: 'retry' },
				];
			} else if (primaryService?.shipper_contact_status === 'retry') {
				newFields[key].options = [
					{ label: 'Confirmed', value: 'confirmed' },
					{ label: 'Retry', value: 'retry' },
				];
			} else {
				newFields[key].options = [
					{ label: 'Confirmed', value: 'confirmed' },
					{ label: 'Not Contacted', value: 'pending' },
				];
			}
			newFields[key].value = fields[key].value || primaryService?.shipper_contact_status;
		}

		if (['booking_reference_proof', 'booking_reference_number'].includes(key)) {
			newFields[key].rules = {
				validate: () => (!formValues.booking_reference_proof
						&& !formValues.booking_reference_number
					? 'At least one field is required'
					: undefined),
			};
		}
	});

	return newFields;
};

export default mutateFields;
