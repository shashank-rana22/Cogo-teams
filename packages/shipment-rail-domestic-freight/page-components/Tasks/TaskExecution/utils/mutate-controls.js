const TIME_BASED_TASK = ['mark_containers_departed',
	'mark_containers_arrived',
	'upload_proof_of_delivery',
	'mark_containers_handed_over'];

const mutateControls = (
	controls,
	setValue,
	task,
	shipment_data,
	formValues,
) => {
	let finalControls = [];

	(controls || []).forEach((control) => {
		const newControl = control;

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
		if (task.task === 'confirmation_of_booking_with_service_provider') {
			newControl.dateFormate = 'MM/dd/yyyy HH:mm';
			newControl.showTimeSelect = true;
		}
		if ([...TIME_BASED_TASK, 'mark_rail_cargo_picked_up'].includes(task.task)) {
			if (control.type === 'datepicker') {
				newControl.isPreviousDaysAllowed = true;
				newControl.showTimeSelect = true;
				newControl.dateFormat = 'MM/dd/yyyy HH:mm';
			}
		}

		if (TIME_BASED_TASK.includes(task.task)
			&& control.type === 'datepicker') {
			newControl.value = '';
		}
		if (task.task === 'confirm_booking_with_customer') {
			if (!(control.name || '').includes('consignee') && !(control.name || '').includes('consignor')) {
				if (control.type === 'pills') {
					newControl.options = (control?.options || []).map((option) => ({
						...option,
						disabled: true,
					}));
				} else if (control.type === 'datepicker') {
					newControl.disabled = true;
					newControl.dateFormat = 'MM/dd/yyyy HH:mm';
				} else {
					newControl.disabled = true;
				}
			}
		}

		finalControls = [...finalControls, newControl];
	});

	return finalControls;
};

export default mutateControls;
