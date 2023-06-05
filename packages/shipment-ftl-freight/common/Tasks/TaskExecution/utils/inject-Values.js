import injectCustomFormValidations from './inject-custom-form-validations';

const TRUCK_NUM_TASKS = [
	'upload_lorry_receipt',
	'upload_ftl_commercial_invoice',
	'upload_commercial_invoice',
];

const injectValues = (
	selectedMail,
	populatedControls,
	task,
	servicesList,
) => {
	const controls = populatedControls || [];
	const ftlServices = (servicesList || []).filter(
		(obj) => obj.service_type !== 'subsidiary_service',
	);

	if (task?.task_type === 'upload_document') {
		(controls || []).forEach((control, index) => {
			if (control.type === 'fieldArray') {
				controls[index].value = controls[index]?.value?.length
					? controls[index]?.value : [{ url: selectedMail?.formatted?.[0]?.url }];
			}
		});
	}
	if (task.task === 'confirmation_on_services_taken') {
		controls.forEach((control, index) => {
			let total_volume = 0;
			let total_weight = 0;
			let pkg_count = 0;

			(servicesList || []).forEach((item) => {
				total_volume += item.volume;
				total_weight += item.weight;
				pkg_count += item.packages_count;
			});

			if (control.name === 'volume') {
				controls[index].value = total_volume;
			}
			if (control.name === 'weight') {
				controls[index].value = total_weight;
			}
			if (control.name === 'packages_count') {
				controls[index].value = pkg_count;
			}

			if (control.name === 'truck_details_count') {
				const truck_details_count = [];
				(servicesList || []).forEach((item) => {
					const ind = truck_details_count.findIndex(
						(i) => i.truck_type === item.truck_type,
					);

					if (ind !== -1) {
						truck_details_count[ind].truck_numbers += 1;
					} else {
						truck_details_count.push({
							truck_type    : item.truck_type,
							truck_numbers : 1,
						});
					}
				});
				controls[index].value = [...truck_details_count];
			}
		});
	}

	if (task.task === 'confirmation_of_booking_with_service_provider') {
		const ftlService = (servicesList || []).find((item) => item.service_type === 'ftl_freight_service') || {};
		controls.forEach((control, index) => {
			if (control.name === 'display_origin_location') {
				controls[index].value = ftlService.pickup_address;
			}
			if (control.name === 'display_destination_location') {
				controls[index].value = ftlService.delivery_address;
			}
			if (control.name === 'display_booking_weight') {
				controls[index].value = ftlService.weight;
			}
			if (control.name === 'display_booked_trucks') {
				controls[index].value = ftlService.length;
			}
			if (control.name === 'truck_details') {
				controls[index].value = (servicesList || []).map((item) => ({
					id                  : item.id,
					truck_type          : item.truck_type,
					estimated_arrival   : '',
					estimated_departure : '',
					truck_number        : '',
					payment_terms       : '',
					name                : '',
					contact             : '',
				}));
			}
		});
	}

	if (task.task === 'cargo_picked_up_at') {
		controls.forEach((control, index) => {
			if (control.name === 'truck_details') {
				controls[index].value = (ftlServices || []).map((item) => ({
					id           : item.id,
					truck_number : item.truck_number,
					pickup_date  : '',
				}));
			}
		});
	}

	if (task.task === 'mark_completed' && task.state === 'cargo_dropped') {
		controls.forEach((control, index) => {
			if (control.name === 'documents') {
				controls[index].value = (ftlServices || []).map((item) => ({
					service_id    : item.id,
					truck_number  : item.truck_number,
					delivery_date : '',
				}));
			}
		});
	}

	if (task.task === 'upload_proof_of_delivery') {
		controls.forEach((control, index) => {
			if (control.name === 'documents') {
				controls[index].value = (ftlServices || []).map((item) => ({
					service_id    : item.id,
					truck_number  : item.truck_number,
					remarks       : '',
					url           : '',
					delivery_date : '',
				}));
			}
		});
	}

	if (TRUCK_NUM_TASKS.includes(task.task)) {
		(controls || []).forEach((control, index) => {
			if (control.type === 'fieldArray') {
				(control.controls || []).forEach((controlObj, ind) => {
					if (controlObj.name === 'service_id') {
						controls[index].controls[ind].options = (ftlServices || [])?.map(
							(obj) => ({
								label : obj.truck_number || 'Truck_number',
								value : obj.id,
							}),
						);
					}
				});
			}
		});
	}

	if (task.task === 'upload_ftl_eway_bill_copy') {
		(controls || []).forEach((control) => {
			if (control?.type === 'fieldArray') {
				control?.controls?.forEach((singleItem) => {
					const newFieldItem = singleItem;
					if (singleItem?.name === 'truck_number') {
						const truckNumberOptions =	(servicesList || []).reduce((acc, item) => {
							if (item?.truck_number) {
								acc.push({ label: item?.truck_number, value: item?.id });
							}
							return acc;
						}, []);

						newFieldItem.options = truckNumberOptions;
					}
				});
			}
		});
	}
	const validationAddedControls = injectCustomFormValidations(controls);

	return validationAddedControls;
};

export default injectValues;
