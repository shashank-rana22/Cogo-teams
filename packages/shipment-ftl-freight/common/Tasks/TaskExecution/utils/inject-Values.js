import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { isEmpty } from '@cogoport/utils';

import injectCustomFormValidations from './inject-custom-form-validations';

const TRUCK_NUM_TASKS = [
	'upload_lorry_receipt',
	'upload_trucking_incidental_charge',
	'upload_advance_payment',
	'upload_commercial_invoice',
	'upload_ftl_commercial_invoice',
	'upload_weight_note',
	'upload_fleet_authorization_letter',
	'upload_load_truck_image',
	'upload_broker_slip',
	'upload_invoice_submission_acknowledgement',
];

const TRUCK_DOCS_PREFILL_KEYS_MAPPING = {
	upload_weight_note                        : 'weight_note_image',
	upload_fleet_authorization_letter         : 'fleet_owner_letter',
	upload_invoice_submission_acknowledgement : 'invoice_submission',
	upload_load_truck_image                   : 'selfie_with_loaded_truck',
	upload_ftl_commercial_invoice             : 'commercial_invoice_images',
	upload_lorry_receipt                      : 'lr_images',
};

const TRUCK_EXCEED_NUMBER = -1;

const injectValues = ({
	selectedMail = [],
	populatedControls = [],
	task = {},
	getApisData = {},
	servicesList = [],
}) => {
	const controls = populatedControls || [];
	const ftlServices = (servicesList || []).filter(
		(obj) => obj.service_type !== 'subsidiary_service',
	);

	if (task?.task_type === 'upload_document') {
		(controls || []).forEach((control, index) => {
			if (control.type === 'fieldArray') {
				controls[index].value = controls[index]?.value?.length
					? controls[index]?.value : [{ url: selectedMail?.formatted?.[GLOBAL_CONSTANTS.zeroth_index]?.url }];
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
				const TRUCK_DETAILS_COUNT = [];
				const updatedServicesList = (servicesList || []).filter(
					(item) => item?.service_type !== 'subsidiary_service',
				);
				(updatedServicesList || []).forEach((item) => {
					const ind = TRUCK_DETAILS_COUNT.findIndex(
						(i) => i.truck_type === item.truck_type,
					);

					if (ind !== TRUCK_EXCEED_NUMBER) {
						TRUCK_DETAILS_COUNT[ind].truck_numbers += 1;
					} else {
						TRUCK_DETAILS_COUNT.push({
							truck_type    : item.truck_type,
							truck_numbers : 1,
						});
					}
				});
				controls[index].value = [...TRUCK_DETAILS_COUNT];
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
		const getData = getApisData?.list_shipment_services?.filter(
			(obj) => obj.service_type !== 'subsidiary_service',
		);

		const documentObjectControl = controls?.find(
			(control) => control?.name === 'documents' && control?.type === 'fieldArray',
		) || {};

		const isMultipleUrlAllowed = documentObjectControl?.controls?.some(
			(control) => control?.name === 'url' && control?.multiple,
		);

		const filteredData = getData?.reduce((acc, item) => {
			const requiredTruck = getApisData?.list_shipment_field_service_ops_details?.find(
				(singleItem) => (singleItem?.truck_number)?.toLowerCase() === (item?.truck_number)?.toLowerCase(),
			) || {};
			acc[item?.id] = isEmpty(requiredTruck) ? {} : requiredTruck;
			return acc;
		}, {});

		let customValues = [];
		if (task.task in TRUCK_DOCS_PREFILL_KEYS_MAPPING) {
			customValues = Object.entries(filteredData || {}).reduce(
				(acc, [service_id, docData]) => {
					if (isMultipleUrlAllowed) {
						const customValueUrls = docData[
							TRUCK_DOCS_PREFILL_KEYS_MAPPING[task.task]
						] || [];

						acc.push({ service_id, url: customValueUrls });
					} else {
						docData[TRUCK_DOCS_PREFILL_KEYS_MAPPING[task.task]]?.forEach(
							(url) => {
								acc.push({ service_id, url });
							},
						);
					}
					return acc;
				},
				[],
			);
		}

		(controls || []).forEach((control, index) => {
			const tempControl = control;
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
				tempControl.value = customValues;
			}
		});
	}
	if (
		task?.task === 'upload_high_advance_payment_proof'
	) {
		(controls || []).forEach((control) => {
			const tempControl = control;
			if (control.type === 'fieldArray') {
				tempControl.value = [{ invoice_number: task?.remarks?.[GLOBAL_CONSTANTS.zeroth_index] }];
			}
		});
	}

	if (['pod_sent_to_shipper', 'upload_service_provider_proof_of_delivery'].includes(task?.task)) {
		controls.forEach((control) => {
			if (control?.type === 'fieldArray') {
				const tempControl = control;
				tempControl.value = servicesList?.reduce((acc, item) => {
					if (item.service_type !== 'subsidiary_service') {
						acc.push({ service_id: item?.id, truck_number: item?.truck_number });
					}
					return acc;
				}, []);
			}
		});
	}
	const validationAddedControls = injectCustomFormValidations(controls);

	return validationAddedControls;
};

export default injectValues;
