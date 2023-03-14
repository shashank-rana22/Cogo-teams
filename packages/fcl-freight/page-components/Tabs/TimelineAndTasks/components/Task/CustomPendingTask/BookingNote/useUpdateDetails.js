import { useRequest } from '@cogo/commons/hooks';
import { useState } from 'react';
import { toast } from '@cogoport/front/components';
import incoTermMapping from '@cogo/bookings/configurations/common/inco_term_mapping.json';
import useLens from '@cogo/business-modules/hooks/useLens';
import OCR from '@cogo/commons/constants/OCR_LINES';
import useCreateShipmentMapping from '@cogo/business-modules/rpa/hooks/useCreateShipmentMapping';

const numberKeys = [
	'free_days_detention_origin',
	'free_days_detention_destination',
	'free_days_demurrage_destination',
];

const defaultKeyMappings = {
	yard_details: 'empty_container-depot_cogo_id',
	movement_details: {
		from_port_id: 'from_cogo_id',
		to_port_id: 'to_cogo_id',
		schedule_departure: 'ETD',
		schedule_arrival: 'ETA',
		vessel: 'Vessel',
		voyage: 'Voy No',
	},
	vgm_cutoff: 'vgm_cutoff',
	gate_in_cutoff: 'gate_cutoff',
	document_cutoff: 'doc_cutoff',
	si_cutoff: 'si_cutoff',
	bn_expiry: 'bn_expiry',
	tr_cutoff: 'tr_cutoff',
};

const getInitialValues = (summary) => {
	const value = [
		{
			from_port_id: summary?.origin_port?.id,
			to_port_id: summary?.destination_port?.id,
			schedule_departure: summary?.schedule_departure,
			schedule_arrival: summary?.schedule_arrival,
			vessel: '',
			voyage: '',
		},
	];
	return value;
};

const docNumber = [
	{
		name: 'document_number',
		label: 'Booking Note Number',
		type: 'text',
		span: 12,
		className: 'primary sm',
		placeholder: 'Type here...',
		rules: { required: 'Booking Note Number is required' },
	},
];

const movementDetailsControls = () => [
	{
		heading: 'Movement Details',
		name: 'movement_details',
		type: 'fieldArray',
		isMovementDetails: true,
		isMovementPort: true,
		initialCount: 1,
		showDeleteButton: true,
		noDeleteButtonTill: 1,
		value: [
			{
				from_port_id: '',
				to_port_id: '',
				schedule_arrival: '',
				schedule_departure: '',
				vessel: '',
				voyage: '',
				service_type: '',
			},
		],
		controls: [
			{
				type: 'location-select',
				optionsListKey: 'locations',
				params: { filters: { type: ['seaport'] } },
				caret: true,
				defaultOptions: true,
				name: 'from_port_id',
				label: 'Select origin port',
				placeholder: 'Search origin...',
				span: 6,
				rules: { required: { value: true, message: 'Origin is required' } },
			},
			{
				type: 'location-select',
				optionsListKey: 'locations',
				params: { filters: { type: ['seaport'] } },
				caret: true,
				defaultOptions: true,
				name: 'to_port_id',
				label: 'Select destination port',
				placeholder: 'Search destination...',
				span: 6,
				rules: {
					required: { value: true, message: 'Destination is required' },
				},
			},
			{
				label: 'Schedule Departure',
				name: 'schedule_departure',
				type: 'datepicker',
				withTimePicker: true,
				usePortal: true,
				span: 6,
				rules: {
					required: { value: true, message: 'Schedule departure is required' },
				},
			},
			{
				label: 'Schedule Arrival',
				name: 'schedule_arrival',
				type: 'datepicker',
				withTimePicker: true,
				usePortal: true,
				span: 6,
				rules: {
					required: { value: true, message: 'Schedule arrival is required' },
				},
			},
			{
				name: 'vessel',
				label: 'Vessel',
				type: 'text',
				span: 6,
				placeholder: 'Vessel Name',
			},
			{
				name: 'voyage',
				label: 'Voyage',
				type: 'text',
				span: 6,
				placeholder: 'Type voyage',
			},
		],
	},
];

const mainControls = () => [
	{
		label: 'VGM Cut-off',
		name: 'vgm_cutoff',
		type: 'datepicker',
		withTimePicker: true,
		usePortal: true,
		span: 6,
		rules: {
			required: { value: true, message: 'VGM Cut-off is required' },
		},
	},
	{
		label: 'S/I Cut-off',
		name: 'si_cutoff',
		type: 'datepicker',
		withTimePicker: true,
		usePortal: true,
		span: 6,
		rules: {
			required: { value: true, message: 'S/I Cut-off is required' },
		},
	},
	{
		label: 'Document Cut-off',
		name: 'document_cutoff',
		type: 'datepicker',
		withTimePicker: true,
		usePortal: true,
		span: 6,
		rules: {
			required: { value: true, message: 'Document Cut-off is required' },
		},
	},
	{
		label: 'Gate-in Cut-off',
		name: 'gate_in_cutoff',
		type: 'datepicker',
		withTimePicker: true,
		usePortal: true,
		span: 6,
		rules: {
			required: { value: true, message: 'Gate-in Cut-off is required' },
		},
	},
	{
		label: 'Booking Note Expiry',
		name: 'bn_expiry',
		type: 'datepicker',
		withTimePicker: true,
		usePortal: true,
		span: 6,
		rules: {
			required: { value: true, message: 'Booking Note Expiry is required' },
		},
	},
	{
		label: 'TR Cut-off',
		name: 'tr_cutoff',
		type: 'datepicker',
		withTimePicker: true,
		usePortal: true,
		span: 6,
		rules: {
			required: { value: true, message: 'TR Cut-off is required' },
		},
	},
	{
		label: 'Detention days at origin',
		name: 'free_days_detention_origin',
		type: 'number',
		span: 12,
		min: 0,
		optionLabel: 'Day',
		max: 100,
		rules: {
			required: { value: true, message: 'Detention at origin is required' },
		},
	},
	{
		label: 'Detention days at destination',
		name: 'free_days_detention_destination',
		type: 'number',
		span: 12,
		min: 0,
		optionLabel: 'Day',
		max: 100,
		rules: {
			required: {
				value: true,
				message: 'Detention at destination is required',
			},
		},
	},
	{
		label: 'Demurrage days at destination',
		name: 'free_days_demurrage_destination',
		type: 'number',
		span: 12,
		optionLabel: 'Day',
		rules: {
			required: {
				value: true,
				message: 'Demurrage at destination is required',
			},
		},
	},
];

const DATES = [
	'vgm_cutoff',
	'si_cutoff',
	'document_cutoff',
	'gate_in_cutoff',
	'bn_expiry',
	'tr_cutoff',
	'carting_cutoff',
];

const useUpdateDetails = ({
	primary_service,
	fileUrl,
	task,
	step1HookData,
	setStep,
	item,
	// shipment_data,
	services,
	formattedRate,
}) => {
	const [bookingNote, setBookingNote] = useState(0);

	const { submitShipmentMapping } = useCreateShipmentMapping();

	const mataDataDefault = {
		trade_type: primary_service?.trade_type,
		free_days_demurrage_destination:
			primary_service?.free_days_demurrage_destination || 0,
		free_days_detention_destination:
			primary_service?.free_days_detention_destination || 0,
		free_days_detention_origin:
			primary_service?.free_days_detention_origin || 0,
		shipment_id: primary_service?.shipment_serial_id,
		movement_details: getInitialValues(primary_service),
		schedule_arrival: primary_service?.schedule_arrival,
		schedule_departure: primary_service?.schedule_departure,
	};

	const mainControl = mainControls(primary_service);
	const movementDetailsControl = movementDetailsControls();

	const createShipmentDocument = useRequest(
		'post',
		false,
		'partner',
	)('/create_shipment_document');

	const updateShipmentService = useRequest(
		'post',
		false,
		'partner',
	)('/update_shipment_service');

	const updateShipmentPendingTask = useRequest(
		'post',
		false,
		'partner',
	)('/update_shipment_pending_task');

	const localServiceIds = [];
	const fclFreight = [];

	(services || []).forEach((serviceObj) => {
		if (serviceObj?.service_type?.includes('fcl_freight_local')) {
			localServiceIds.push(serviceObj?.id);
		} else if (serviceObj?.service_type?.includes('fcl_freight_service')) {
			fclFreight.push(serviceObj);
		}
	});

	const handleFinalSubmit = async (values) => {
		const payloadCreateShipmentDocument = {
			document_type: 'booking_note',
			documents: (fileUrl || []).map((obj) => ({
				data: { document_number: values.document_number },
				document_url: obj?.url,
				file_name: obj?.name,
			})),
			service_id: task?.service_id,
			service_type: task?.service_type,
			shipment_id: task?.shipment_id,
			uploaded_by_org_id: task.organization_id,
		};

		const dataObj = {};
		(mainControl || []).forEach((obj) => {
			if (numberKeys.includes(obj.name)) {
				dataObj[obj.name] = Number(values[obj.name] || 0);
			} else {
				dataObj[obj.name] = values[obj.name];
			}
		});

		const mv_details = values?.movement_details || [];

		const formValuesForFcl = {};
		const formValuesForLocal = {};

		Object.keys(step1HookData?.formValues).forEach((key) => {
			if (key.includes('fcl_main')) {
				formValuesForFcl[key.split('_fcl_main')[0]] =
					step1HookData?.formValues[key];
			}
			if (key.includes('fcl_local')) {
				formValuesForLocal[key.split('_fcl_local')[0]] =
					step1HookData?.formValues[key];
			}
		});

		if (formattedRate?.primary_service) {
			formValuesForFcl.service_provider_id =
				formattedRate[primary_service.id]?.service_provider_id;
			formValuesForFcl.shipping_line_id =
				formattedRate[primary_service.id]?.shipping_line_id;
			formValuesForLocal.service_provider_id =
				formattedRate[primary_service.id]?.service_provider_id;
			formValuesForLocal.shipping_line_id =
				formattedRate[primary_service.id]?.shipping_line_id;
		}

		const tradeType = incoTermMapping[fclFreight?.[0]?.inco_term];

		const payloadForUpdateShipment = {
			data: {
				movement_details: mv_details.map((obj) => {
					return {
						...(obj || {}),
						service_type: 'fcl_freight_service',
					};
				}),
				...(dataObj || {}),
				...(formValuesForFcl || {}),
				schedule_departure: mv_details[0]?.schedule_departure,
				schedule_arrival: mv_details[mv_details.length - 1]?.schedule_arrival,
			},
			ids: task.task_field_ids,
			service_type: task?.service_type,
			shipment_id: task?.shipment_id,
			performed_by_org_id: task?.organization_id,
		};

		if (fclFreight.length && tradeType === 'import') {
			payloadForUpdateShipment.data.service_provider_id =
				fclFreight?.[0]?.service_provider_id;
			payloadForUpdateShipment.data.shipping_line_id =
				fclFreight?.[0]?.shipping_line_id;

			if (localServiceIds.length > 0) {
				formValuesForLocal.service_provider_id =
					fclFreight?.[0]?.service_provider_id;
				formValuesForLocal.shipping_line_id = fclFreight?.[0]?.shipping_line_id;
			}
		}

		try {
			const res1 = await updateShipmentService.trigger({
				data: payloadForUpdateShipment,
			});

			const res2 =
				localServiceIds.length > 0
					? await updateShipmentService.trigger({
							data: {
								data: { ...formValuesForLocal },
								ids: localServiceIds,
								service_type: 'fcl_freight_local_service',
								shipment_id: task?.shipment_id,
								performed_by_org_id: task.organization_id,
							},
					  })
					: {};
			// feedbacks to cogolens starts
			try {
				const rpaMappings = {
					cogo_shipment_id: task.shipment_id,
					cogo_shipment_serial_no: primary_service?.shipment_serial_id,
					booking_note: values.document_number,
				};
				await submitShipmentMapping(rpaMappings);
			} catch (err) {
				console.log(err);
			}
			// feedbacks to cogolens ends
			if (!res1?.hasError && !res2?.hasError) {
				const finalRes = await createShipmentDocument.trigger({
					data: payloadCreateShipmentDocument,
				});

				if (!finalRes?.hasError) {
					const finalResponse = await updateShipmentPendingTask.trigger({
						data: {
							id: task.id,
							status: 'pending',
							tags: ['2'],
						},
					});
					if (!finalResponse.hasError) {
						toast.success('Step Completed Successfully');
					}
					setStep(3);
				} else {
					toast.error('Something went wrong !');
				}
			} else {
				toast.error(JSON.stringify(res1?.data?.base || res2?.data?.base));
			}
		} catch (err) {
			toast.error(JSON.stringify(err?.data?.base));
		}
	};

	const shipping_line_id =
		step1HookData.formValues?.shipping_line_id ||
		primary_service?.shipping_line_id;

	const entity_name = OCR.name_mappings[shipping_line_id] || 'default';

	const allControls = [...docNumber, ...mainControl, ...movementDetailsControl];
	(allControls || []).forEach((controlObj, index) => {
		if (item?.data?.[0]?.[controlObj?.name] && newControls) {
			newControls[index].value = item?.data?.[0]?.[controlObj?.name];
		}
	});

	const {
		newControls,
		detectApi,
		handleAutoFeedback,
		feedBackFields,
		feedBackHandleSubmit,
		errors,
		onError,
	} = useLens({
		controls: allControls,
		detectParams: {
			file_url: fileUrl?.[bookingNote]?.url,
			entity_name,
			entity_type: 'booking_note',
		},
		canDetect: fileUrl?.[bookingNote]?.url && !!entity_name,
		onSubmit: handleFinalSubmit,
		keyMappings: defaultKeyMappings,
		metaData: mataDataDefault || {},
	});

	const onErrorHandle = onError;

	const finalFields = feedBackFields;

	Object.keys(finalFields || {}).forEach((key) => {
		if (DATES.includes(key)) {
			finalFields[key].minDate = new Date();
		}
	});

	// const submitShipmentMapping = useCreateShipmentMapping({
	// 	shipmentId: shipment_data.id,
	// 	serialId: shipment_data.serial_id,
	// });

	return {
		setBookingNote,
		bookingNote,
		fields: finalFields,
		errors,
		mainControl: [
			...(newControls.filter(
				(obj) =>
					!['movement_details', 'documents', 'document_number'].includes(
						obj.name,
					),
			) || []),
		],
		movementDetailsControl: [
			newControls.find((obj) => obj.name === 'movement_details'),
		],
		docNumber,
		handleSubmit: feedBackHandleSubmit,
		onError: onErrorHandle,
		createShipmentDocument,
		updateShipmentService,
		handleFinalSubmit: handleAutoFeedback,
		loading:
			createShipmentDocument.loading ||
			updateShipmentService.loading ||
			detectApi.loading,
	};
};

export default useUpdateDetails;
