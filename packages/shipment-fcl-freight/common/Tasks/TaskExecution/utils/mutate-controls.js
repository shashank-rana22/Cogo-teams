const mutateControls = (
	controls,
	setValue,
	task,
	shipment_data,
	formValues,
	options,
	subCommodityOptions,
) => {
	let finalControls = [];

	(controls || []).forEach((control) => {
		const newControl = control;

		if (control?.name === 'commodity_category') {
			newControl.options = options;
			newControl.value = shipment_data?.commodity_category;
		}

		if (control?.name === 'commodity_subtype') {
			newControl.options = subCommodityOptions;
		}

		if (control?.name === 'shipper_contact_status') {
			if (shipment_data?.shipper_contact_status === 'pending') {
				newControl.options = [
					{ label: 'Confirmed', value: 'confirmed' },
					{ label: 'Not Contacted', value: 'pending' },
					{ label: 'Retry', value: 'retry' },
				];
			} else if (shipment_data?.shipper_contact_status === 'retry') {
				newControl.options = [
					{ label: 'Confirmed', value: 'confirmed' },
					{ label: 'Retry', value: 'retry' },
				];
			} else {
				newControl.options = [
					{ label: 'Confirmed', value: 'confirmed' },
					{ label: 'Not Contacted', value: 'pending' },
				];
			}

			newControl.value = newControl?.value || shipment_data?.shipper_contact_status;
		}

		if (
			task?.task === 'mark_confirmed'
			&& formValues?.payment_term === 'collect'
			&& control?.name === 'bl_category'
		) {
			newControl.options = [
				{
					label       : 'HBL',
					value       : 'hbl',
					description : 'House Bill of Lading',
				},
			];

			if (formValues.bl_category !== 'hbl') {
				setValue('bl_category', 'hbl');
			}
		}

		if (
			task?.task === 'mark_confirmed'
			&& formValues?.payment_term === 'prepaid'
			&& control?.name === 'bl_category'
		) {
			newControl.options = [
				{
					label       : 'HBL',
					value       : 'hbl',
					description : 'House Bill of Lading',
				},
				{
					label       : 'Mbl',
					value       : 'mbl',
					description : 'House Bill of Lading',
				},
			];
		}

		if (['booking_reference_proof', 'booking_reference_number'].includes(control?.name)) {
			newControl.rules = {
				validate: () => (!formValues.booking_reference_proof
						&& !formValues.booking_reference_number
					? 'At least one field is required'
					: undefined),
			};
		}

		finalControls = [...finalControls, newControl];
	});

	return finalControls;
};

export default mutateControls;
