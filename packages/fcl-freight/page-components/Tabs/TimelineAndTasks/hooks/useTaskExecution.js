/* eslint-disable no-eval */
/* eslint-disable max-len */
import { useState, useEffect } from 'react';
import useForm from '@cogoport/front/hooks/useFormCogo';
import { startCase } from '@cogoport/front/utils';
import global from '@cogo/commons/constants/global';
import prepareSteps from '../utils/prepareSteps';
import getShowTaskFields from '../utils/get-show-task-fields';
import injectValues from '../utils/inject-values';

const truck_number_options = [
	'upload_eway_bill_copy',
	'upload_lorry_receipt',
	'upload_trucking_incidental_charge',
	'upload_advance_payment',
	'upload_commercial_invoice',
];

const bl_documents = [
	'draft_bill_of_lading',
	'bill_of_lading',
	'draft_local_bill_of_lading',
	'local_bill_of_lading',
];

const injectUiConfigs = (config, task, primary_service) => {
	const pg = config?.task_config || {};

	const config_modified = {
		label: pg.label,
		task_type: pg.task_type,
		created_at: pg.created_at,
		task: pg.task,
		steps: prepareSteps(pg.ui_config, task, primary_service),
	};

	return config_modified;
};

const populateControls = (
	controls,
	getApisData,
	task,
	shipment_data,
	stepConfig,
) => {
	const finalControls = controls;

	if (task.task === 'upload_draft_bill_of_lading') {
		(finalControls || []).forEach((control, index) => {
			if (control.type === 'fieldArray') {
				finalControls[index].noDeleteButtonTill = shipment_data.bls_count || 1;
			}
		});
		return finalControls;
	}

	if (
		['generate_do_certificate', 'generate_do_noc_certificate'].includes(
			task.task,
		)
	) {
		(finalControls || []).forEach((control, index) => {
			if (control.name === 'mbl_numbers') {
				const mblData = (getApisData?.list_shipment_bl_details || [])?.filter(
					(blDetailObj) => bl_documents.includes(blDetailObj?.bl_document_type),
				);
				const mbl = [];
				(mblData || []).forEach((item) => {
					mbl.push(item?.bl_number);
				});

				finalControls[index].value = [...new Set(mbl)].join(', ');
			} else if (control.name === 'hbl_numbers') {
				const hblData = (getApisData?.list_shipment_bl_details || [])?.filter(
					(blDetailObj) => bl_documents.includes(blDetailObj?.bl_document_type),
				);
				const hbl = [];
				(hblData || []).forEach((item) => {
					hbl.push(item?.bl_number);
				});

				finalControls[index].value = [...new Set(hbl)].join(', ');
			} else if (
				control.type === 'fieldArray' &&
				control.name === 'container_number'
			) {
				finalControls[index].noDeleteButtonTill =
					shipment_data.containers_count || 1;

				finalControls[index].value = (
					getApisData?.list_shipment_container_details || []
				).map((item) => ({
					number: item?.container_number,
				}));
			} else if (control.name === 'destination') {
				finalControls[index].value =
					shipment_data?.destination_main_port?.name ||
					shipment_data?.destination_port?.name;
			} else if (control.name === 'shipping_line') {
				finalControls[index].value =
					shipment_data?.shipping_line?.business_name;
			}
		});
		return finalControls;
	}

	if (task.task === 'upload_bill_of_lading') {
		(finalControls || []).forEach((control, index) => {
			if (control.type === 'fieldArray') {
				finalControls[index].noDeleteButtonTill = shipment_data.bls_count || 1;
			}
		});
		return finalControls;
	}
	if (
		task.task === 'upload_airway_bill' &&
		['air_freight', 'domestic_air_freight'].includes(task.shipment_type)
	) {
		(finalControls || []).forEach((control, index) => {
			if (
				control.type === 'fieldArray' &&
				control.document_type !== 'manifest_copy'
			) {
				finalControls[index].noDeleteButtonTill = shipment_data.bls_count || 1;
				finalControls[index].value = (
					getApisData?.list_shipment_bl_details || []
				)
					?.filter(
						(blDetailObj) =>
							blDetailObj?.bl_document_type === control.document_type,
					)
					?.map((item) => ({
						description: '',
						url: '',
						containers_count: '',
						document_number: item.bl_number,
						bl_detail_id: item.id,
					}));
			}
		});

		return finalControls;
	}

	if (task?.task === 'upload_igm_document') {
		(finalControls || []).forEach((control, index) => {
			if (control.type === 'fieldArray') {
				(control.controls || []).forEach((controlObj, ind) => {
					if (controlObj.name === 'bl_number') {
						finalControls[index].controls[ind].options = (
							getApisData?.list_shipment_bl_details || []
						)?.map((obj) => {
							return {
								label: startCase(obj.bl_number),
								value: `${obj.bl_number}:${obj.id}`,
							};
						});
					}
				});
			}
		});
		return finalControls;
	}

	if (task.task === 'upload_carting_order') {
		for (let index = 0; index < finalControls.length; index += 1) {
			if (finalControls[index].name === 'schedule_arrival') {
				finalControls[index].value =
					shipment_data?.schedule_arrival ||
					shipment_data?.selected_schedule_arrival;
			}
			if (finalControls[index].name === 'schedule_departure') {
				finalControls[index].value =
					shipment_data?.schedule_departure ||
					shipment_data?.selected_schedule_departure;
			}
			if (finalControls[index].name === 'movement_details') {
				finalControls[index].value = [
					{
						from_port_id: shipment_data?.origin_port_id,
						to_port_id: shipment_data?.destination_port_id,
						schedule_arrival:
							shipment_data?.schedule_arrival ||
							shipment_data?.selected_schedule_arrival,
						schedule_departure:
							shipment_data?.schedule_departure ||
							shipment_data?.selected_schedule_departure,
						vessel: '',
						voyage: '',
						service_type: 'lcl_freight_service',
					},
				];
			}
		}
		return finalControls;
	}

	if (
		task.task === 'confirmation_on_services_taken' &&
		task.shipment_type === 'ftl_freight'
	) {
		const getData = getApisData.list_shipment_truck_details;

		finalControls.forEach((control, index) => {
			if (control.name === 'truck_details_count') {
				const truck_details_count = [];
				getData.forEach((item) => {
					const ind = truck_details_count.findIndex(
						(i) => i.truck_type === item.truck_type,
					);

					if (ind !== -1) {
						truck_details_count[ind].truck_numbers += 1;
					} else {
						truck_details_count.push({
							truck_type: item.truck_type,
							truck_numbers: 1,
						});
					}
				});
				finalControls[index].value = [...truck_details_count];
			}
		});
		return finalControls;
	}

	if (
		task.task === 'confirmation_on_services_taken' &&
		task.shipment_type === 'haulage_freight'
	) {
		const getData = getApisData.list_shipment_services;

		finalControls.forEach((control, index) => {
			if (control.name === 'trailer_details_count') {
				const trailer_details_count = [];
				(getData || []).forEach((item) => {
					const ind = trailer_details_count.findIndex(
						(i) => i.trailer_type === item.trailer_type,
					);

					if (ind !== -1) {
						trailer_details_count[ind].trailer_numbers += 1;
					} else {
						trailer_details_count.push({
							trailer_type: item.trailer_type,
							trailer_numbers: 1,
						});
					}
				});
				finalControls[index].value = [...trailer_details_count];
			}

			if (control.name === 'container_details_count') {
				const container_details_count = [];
				(getData || []).forEach((item) => {
					const ind = container_details_count.findIndex(
						(i) => i.container_type === item.container_type,
					);
					if (ind !== -1) {
						container_details_count[ind].containers_count += 1;
					} else {
						container_details_count.push({
							container_type: item.container_type,
							containers_count: 1,
						});
					}
				});
				finalControls[index].value = [...container_details_count];
			}
		});
		return finalControls;
	}

	if (
		task.task === 'confirmation_of_booking_with_service_provider' &&
		task.shipment_type === 'ftl_freight'
	) {
		const getData = getApisData.list_shipment_services;
		finalControls.forEach((control, index) => {
			if (control.name === 'display_origin_location') {
				finalControls[index].value = getData[0].pickup_address;
			}
			if (control.name === 'display_destination_location') {
				finalControls[index].value = getData[0].delivery_address;
			}
			if (control.name === 'display_booking_weight') {
				finalControls[index].value = getData[0].weight;
			}
			if (control.name === 'display_booked_trucks') {
				finalControls[index].value = getData.length;
			}
			if (control.name === 'truck_details') {
				finalControls[index].value = getData.map((item) => {
					return {
						id: item.id,
						truck_type: item.truck_type,
						estimated_arrival: '',
						estimated_departure: '',
						truck_number: '',
						payment_terms: '',
						name: '',
						contact: '',
					};
				});
			}
		});
		return finalControls;
	}

	if (
		task.task === 'confirmation_of_booking_with_service_provider' &&
		task.shipment_type === 'haulage_freight'
	) {
		const getData = getApisData.list_shipment_services;
		finalControls.forEach((control, index) => {
			if (control.name === 'display_origin_location') {
				finalControls[index].value = getData[0].pickup_address;
			}
			if (control.name === 'display_destination_location') {
				finalControls[index].value = getData[0].delivery_address;
			}
			if (control.name === 'display_booking_weight') {
				finalControls[index].value = getData[0].weight;
			}
			if (control.name === 'display_booked_trailers') {
				finalControls[index].value = getData.length;
			}
			if (control.name === 'trailer_details') {
				finalControls[index].value = getData.map((item) => {
					return {
						id: item.id,
						trailer_type: item.trailer_type,
						estimated_arrival: '',
						estimated_departure: '',
						trailer_number: '',
						payment_terms: '',
						name: '',
						contact: '',
					};
				});
			}
		});
		return finalControls;
	}

	if (
		task.task === 'cargo_picked_up_at' &&
		task.shipment_type === 'ftl_freight'
	) {
		const getData = getApisData.list_shipment_services.filter(
			(obj) => obj.service_type !== 'subsidiary_service',
		);

		finalControls.forEach((control, index) => {
			if (control.name === 'truck_details') {
				finalControls[index].value = getData.map((item) => {
					return {
						id: item.id,
						truck_number: item.truck_number,
						pickup_date: '',
					};
				});
			}
		});
		return finalControls;
	}

	if (
		task.task === 'cargo_picked_up_at' &&
		task.shipment_type === 'haulage_freight'
	) {
		const getData = getApisData.list_shipment_services.filter(
			(obj) => obj.service_type !== 'subsidiary_service',
		);

		finalControls.forEach((control, index) => {
			if (control.name === 'trailer_details') {
				finalControls[index].value = getData.map((item) => {
					return {
						id: item.id,
						trailer_number: item.trailer_number,
						pickup_date: '',
					};
				});
			}
		});
		return finalControls;
	}
	if (
		task.task === 'mark_completed' &&
		task.shipment_type === 'ftl_freight' &&
		task.state === 'cargo_dropped'
	) {
		const getData = getApisData.list_shipment_services.filter(
			(obj) => obj.service_type !== 'subsidiary_service',
		);
		finalControls.forEach((control, index) => {
			if (control.name === 'documents') {
				finalControls[index].value = getData.map((item) => {
					return {
						service_id: item.id,
						truck_number: item.truck_number,
						delivery_date: '',
					};
				});
			}
		});
		return finalControls;
	}

	if (
		task.task === 'upload_proof_of_delivery' &&
		task.shipment_type === 'ftl_freight'
	) {
		const getData = getApisData.list_shipment_services.filter(
			(obj) => obj.service_type !== 'subsidiary_service',
		);

		finalControls.forEach((control, index) => {
			if (control.name === 'documents') {
				finalControls[index].value = getData.map((item) => {
					return {
						service_id: item.id,
						truck_number: item.truck_number,
						remarks: '',
						url: '',
						delivery_date: '',
					};
				});
			}
		});
		return finalControls;
	}

	if (
		task.task === 'upload_proof_of_delivery' &&
		task.shipment_type === 'haulage_freight'
	) {
		const getData = getApisData.list_shipment_services.filter(
			(obj) => obj.service_type !== 'subsidiary_service',
		);

		finalControls.forEach((control, index) => {
			if (control.name === 'documents') {
				finalControls[index].value = getData.map((item) => {
					return {
						service_id: item.id,
						trailer_number: item.trailer_number,
						remarks: '',
						url: '',
						delivery_date: '',
					};
				});
			}
		});
		return finalControls;
	}

	if (
		task.task === 'upload_proof_of_delivery' &&
		task.shipment_type === 'ltl_freight'
	) {
		const getData = getApisData.list_shipment_services;
		const initailData = getData[0];

		finalControls.forEach((control, index) => {
			if (control.name === 'documents') {
				finalControls[index].value = [
					{
						url: '',
						lr_number: initailData.lr_number,
						incedental_cost: '',
						delivery_date: '',
					},
				];
			}
		});
		return finalControls;
	}

	if (
		truck_number_options.includes(task.task) &&
		task.shipment_type === 'ftl_freight'
	) {
		const getData = getApisData?.list_shipment_services.filter(
			(obj) => obj.service_type !== 'subsidiary_service',
		);

		(finalControls || []).forEach((control, index) => {
			if (control.type === 'fieldArray') {
				(control.controls || []).forEach((controlObj, ind) => {
					if (controlObj.name === 'service_id') {
						finalControls[index].controls[ind].options = (getData || [])?.map(
							(obj) => {
								return {
									label: obj.truck_number || 'Truck_number',
									value: obj.id,
								};
							},
						);
					}
				});
			}
		});
		return finalControls;
	}

	if (
		truck_number_options.includes(task.task) &&
		task.shipment_type === 'haulage_freight'
	) {
		const getData = getApisData?.list_shipment_services.filter(
			(obj) => obj.service_type !== 'subsidiary_service',
		);

		(finalControls || []).forEach((control, index) => {
			if (control.type === 'fieldArray') {
				(control.controls || []).forEach((controlObj, ind) => {
					if (controlObj.name === 'service_id') {
						finalControls[index].controls[ind].options = (getData || [])?.map(
							(obj) => {
								return {
									label: obj.trailer_number || 'Trailer_number',
									value: obj.id,
								};
							},
						);
					}
				});
			}
		});
		return finalControls;
	}

	if (task.task === 'tag_service_providers') {
		const getData = getApisData.list_shipment_services;

		const lastMileIndex = (getData || []).findIndex(
			(service) => service?.mile_number === 'last',
		);
		const firstMileIndex = (getData || []).findIndex(
			(service) => service?.mile_number === 'first',
		);
		(finalControls || []).forEach((control, index) => {
			const serviceProviderIndex = getData.find(
				(item) => item.mile_number === control.name,
			);

			finalControls[index].value = [
				{
					service_id: serviceProviderIndex?.id,
					service_provider_id: '',
				},
			];

			if (control.name === 'first') {
				finalControls[index].value = [
					{
						mile_number: 'first',
						origin: getData[firstMileIndex]?.origin_location_id,
						service_id: serviceProviderIndex?.id,
					},
				];
			}

			if (control.name === 'mid') {
				finalControls[index].value = [
					{
						mile_number: 'mid',
						service_id: serviceProviderIndex?.id,
						service_provider_id: '',
					},
				];
			}

			if (control.name === 'last') {
				finalControls[index].value = [
					{
						mile_number: 'last',
						destination: getData[lastMileIndex]?.destination_location_id,
						service_id: serviceProviderIndex?.id,
					},
				];
			}
		});

		return finalControls;
	}

	if (
		task.task === 'update_airway_bill_number' &&
		shipment_data?.service_provider_id === global.FREIGHT_FORCE_ORG_ID
	) {
		(finalControls || []).forEach((control, index) => {
			if (control.name === 'booking_reference_number') {
				finalControls[index].value =
					getApisData?.list_awb_inventories?.[0]?.awb_number || '';
			}
		});
		return finalControls;
	}

	if (task.task === 'confirm_cargo_details') {
		const getData = getApisData.list_shipment_services;

		const initailData = getData[0];

		(finalControls || []).forEach((control, index) => {
			if (control.type === 'fieldArray') {
				finalControls[index].value = [
					{
						unit: initailData?.packages.length,
						actual_weight: initailData?.weight,
						chargable_weight:
							initailData.weight > initailData.volume
								? initailData.weight
								: initailData.volume,
					},
				];
			}
		});
	}
	if (
		task.task === 'confirm_cargo_details' &&
		task.shipment_type === 'ltl_freight'
	) {
		const getData = getApisData.list_shipment_services;

		const initailData = getData[0];

		(finalControls || []).forEach((control, index) => {
			if (control.type === 'fieldArray') {
				finalControls[index].value = [
					{
						unit: initailData?.packages.length,
						actual_weight: initailData?.weight,
						chargable_weight:
							initailData?.chargable_weight || initailData?.weight,
					},
				];
			}
		});
	}

	if (
		[
			'confirm_booking',
			'confirmation_of_booking_with_service_provider',
		].includes(task.task) &&
		task.shipment_type === 'rail_domestic_freight'
	) {
		const getData = getApisData?.list_shipment_services;

		const arryData = [];
		getData?.forEach((item) => {
			if (item.service_type === 'rail_domestic_freight_service')
				arryData.push(item);
		});
		const initialData = getData?.[0];

		(finalControls || []).forEach((control, index) => {
			finalControls[index].value = initialData?.[control.name];
			if (control.type === 'fieldArray') {
				finalControls[index].value = arryData?.map((item) => {
					const {
						container_type,
						cargo_weight_per_container,
						container_size,
						commodity,
						containers_count,
					} = item;
					return {
						container_type: startCase(container_type),
						containers_count,
						cargo_weight_per_container,
						container_size,
						commodity: startCase(commodity),
					};
				});
			}
		});
	}

	if (task.task === 'mark_vessel_departed') {
		(finalControls || []).forEach((control, index) => {
			if (control.type === 'fieldArray') {
				finalControls[index].value = (
					getApisData?.list_shipment_container_details || []
				).map((containerObj) => {
					return {
						container_number: containerObj.container_number,
						id: containerObj.id,
					};
				});
			}
		});
		return finalControls;
	}

	// setting options to the "select" type fields
	const optionsConfig = stepConfig?.assign_options || [];
	Object.keys(optionsConfig).forEach((key) => {
		const optionsDataSource =
			getApisData[optionsConfig[key]?.key_from_apis_data];
		const options = [];
		if (Array.isArray(optionsDataSource)) {
			optionsDataSource?.forEach((listItem) => {
				const evaluated_label_value = optionsConfig[key]?.eval_label_key
					? eval(optionsConfig[key]?.label_key)
					: listItem[optionsConfig[key]?.label_key];

				const evaluated_option_value = optionsConfig[key]?.eval_value_key
					? eval(optionsConfig[key]?.value_key)
					: listItem[optionsConfig[key]?.value_key];
				options.push({
					label: evaluated_label_value,
					value: evaluated_option_value,
				});
			});
		}
		finalControls.forEach((control, index) => {
			if (control.name === key && control.type === 'select') {
				finalControls[index].options = options;
			}
		});
	});

	return controls;
};

const mutateFields = (fields, task, shipment_data, formValues) => {
	const newFields = fields;
	Object.keys(fields).forEach((key) => {
		if (
			shipment_data?.shipment_type === 'fcl_freight' &&
			key === 'shipper_contact_status'
		) {
			if (shipment_data?.shipper_contact_status === 'pending') {
				newFields[key].options = [
					{ label: 'Confirmed', value: 'confirmed' },
					{ label: 'Not Contacted', value: 'pending' },
					{ label: 'Retry', value: 'retry' },
				];
			} else if (shipment_data?.shipper_contact_status === 'retry') {
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
			newFields[key].value =
				fields[key].value || shipment_data?.shipper_contact_status;
		}
		if (
			shipment_data?.service_type === 'lcl_freight_service' &&
			key === 'booking_ref_status'
		) {
			newFields.booking_reference_delay_reasons.show = true;
			newFields.booking_reference_number.show = true;
			newFields.booking_reference_proof.show = true;
		}
		if (
			shipment_data?.service_type === 'fcl_freight_service' &&
			['booking_reference_proof', 'booking_reference_number'].includes(key)
		) {
			newFields[key].rules = {
				validate: () => {
					return !formValues.booking_reference_proof &&
						!formValues.booking_reference_number
						? 'At least one field is required'
						: undefined;
				},
			};
		}
	});

	return newFields;
};

const injectForm = (config, formProps, task, shipment_data, formValues) => {
	const showElements = getShowTaskFields(config.controls, formValues);

	const newFields = mutateFields(
		formProps.fields,
		task,
		shipment_data,
		formValues,
	);

	return {
		finalConfig: {
			...config,
			formProps: { ...formProps, fields: newFields },
		},
		controls: config.controls,
		showElements,
	};
};

export const useStepExecuton = ({
	task,
	stepConfig,
	shipment_data,
	getApisData,
	selectedMail,
}) => {
	const populatedControls = populateControls(
		stepConfig.controls,
		getApisData,
		task,
		shipment_data,
		stepConfig,
	);

	const valueInjectedControls = injectValues(
		selectedMail,
		populatedControls,
		task,
		getApisData,
		shipment_data,
		stepConfig,
	);

	const formProps = useForm(valueInjectedControls || []);

	const formValues = formProps.watch();

	const { finalConfig, controls, showElements } = injectForm(
		stepConfig,
		formProps,
		task,
		shipment_data,
		formValues,
	);

	const groupSubHeadings = {};
	if (task.task === 'mark_confirmed') {
		(controls || []).forEach((obj) => {
			if (!Array.isArray(groupSubHeadings[obj.subHeading])) {
				groupSubHeadings[obj.subHeading] = [];
				groupSubHeadings[obj.subHeading].push(obj);
			} else {
				groupSubHeadings[obj.subHeading].push(obj);
			}
		});
	}

	const [error, setError] = useState({});

	const { fields = {}, handleSubmit } = finalConfig.formProps;
	const [isLoading, setIsLoading] = useState(false);

	const onError = (err) => {
		setError(err);
	};

	return {
		finalConfig,
		controls,
		showElements,
		error,
		setError,
		fields,
		handleSubmit,
		isLoading,
		setIsLoading,
		onError,
		groupSubHeadings,
	};
};

const useTaskExecution = ({
	task = {},
	getTaskConfigApi = {},
	primary_service,
	services,
	shipment_data = {},
}) => {
	const rawTaskUiResponse = getTaskConfigApi?.data || {};

	const dataConfig = injectUiConfigs(rawTaskUiResponse, task, primary_service);

	if (shipment_data.shipment_type === 'fcl_freight_local') {
		const data =
			(shipment_data.all_services || []).find(
				(item) => item.service_type === 'fcl_freight_local_service',
			) || {};

		if (data.nomination_type === 'agent' && data.bl_category === 'mbl') {
			(dataConfig.steps || []).shift();
		}
	}

	const serviceIdMapping = {};

	const idCheck = {};
	(services || []).forEach((obj) => {
		if (!Array.isArray(serviceIdMapping[`${obj.service_type}.id`])) {
			serviceIdMapping[`${obj.service_type}.id`] = [];
		}
		if (!idCheck[obj.id]) {
			idCheck[obj.id] = true;
			serviceIdMapping[`${obj.service_type}.id`].push(obj.id);
		}
	});

	let intialStep = 0;
	if (task.tags && task.tags.length) {
		intialStep = Number(task.tags[0]) + 1;

		if (intialStep > (dataConfig.steps || []).length - 1 && intialStep !== 0) {
			intialStep = (dataConfig.steps || []).length - 1;
		}
	}

	const [currentStep, setCurrentStep] = useState(intialStep);

	useEffect(() => {
		setCurrentStep(intialStep);
	}, [intialStep]);

	return {
		steps: dataConfig.steps,
		rawTaskUiResponse,
		currentStep,
		serviceIdMapping,
		setCurrentStep,
	};
};

export default useTaskExecution;
