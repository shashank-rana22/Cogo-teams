import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import toastApiError from '@cogoport/ocean-modules/utils/toastApiError';
import { useRequest } from '@cogoport/request';
import { useState } from 'react';

import { mainControls } from './getStep2Controls';

const numberKeys = [
	'free_days_detention_origin',
	'free_days_detention_destination',
	'free_days_demurrage_origin',
	'free_days_demurrage_destination',
];

const useGetStep2Data = ({
	primary_service = {},
	task = {},
	step0_data = {},
	fileUrl = [],
	formattedRate = {},
	servicesList,
	setStep = () => {},
	shipment_data = {},
}) => {
	const THREE = 3;
	const ONE = 1;
	const [bookingNote, setBookingNote] = useState(GLOBAL_CONSTANTS.zeroth_index);

	const [, updateServiceTrigger] = useRequest({
		url    : '/update_shipment_service',
		method : 'POST',
	});
	const [, createDocmentTrigger] = useRequest({
		url    : 'create_shipment_document',
		method : 'POST',
	}, { manual: true });

	const [, updateTaskTrigger] = useRequest({
		url    : '/update_shipment_pending_task',
		method : 'POST',
	});

	const LOCAL_SERVICE_IDS = [];
	const FCL_FREIGHT = [];

	(servicesList || []).forEach((serviceObj) => {
		if (serviceObj?.service_type?.includes('fcl_freight_local')) {
			LOCAL_SERVICE_IDS.push(serviceObj?.id);
		} else if (serviceObj?.service_type?.includes('fcl_freight_service')) {
			FCL_FREIGHT.push(serviceObj);
		}
	});

	const formProps = useForm({
		defaultValues: {
			movement_details: [
				{
					from_port_id     : primary_service?.origin_port?.id,
					to_port_id       : primary_service?.destination_port?.id,
					schedule_arrival : primary_service?.schedule_arrival
						? new Date(primary_service?.schedule_arrival) : '',
					schedule_departure: primary_service?.schedule_departure
						? new Date(primary_service?.schedule_departure) : '',
					vessel : '',
					voyage : '',

				},
			],
			free_days_demurrage_destination:
			primary_service?.free_days_demurrage_destination || GLOBAL_CONSTANTS.zeroth_index,
			free_days_demurrage_origin:
			primary_service?.free_days_demurrage_origin || GLOBAL_CONSTANTS.zeroth_index,
			free_days_detention_destination:
			primary_service?.free_days_detention_destination || GLOBAL_CONSTANTS.zeroth_index,
			free_days_detention_origin: primary_service?.free_days_detention_origin || GLOBAL_CONSTANTS.zeroth_index,
		},
	});

	const { watch } = formProps || {};

	const movementDetails = watch('movement_details');
	const departureDate = movementDetails?.[GLOBAL_CONSTANTS.zeroth_index]?.schedule_departure;

	const handleFinalSubmit = async (values) => {
		const payloadCreateShipmentDocument = {
			document_type : 'booking_note',
			documents     : (fileUrl || []).map((obj) => ({
				data         : { document_number: values?.document_number },
				document_url : obj?.finalUrl || obj,
				file_name    : obj?.fileName || '',
			})),
			service_id         : task?.service_id,
			service_type       : task?.service_type,
			shipment_id        : task?.shipment_id,
			uploaded_by_org_id : task.organization_id,
		};

		const DATA_OBJ = {};

		(mainControls({ departureDate }) || []).forEach((obj) => {
			if (numberKeys.includes(obj.name)) {
				DATA_OBJ[obj.name] = Number(values[obj.name] || GLOBAL_CONSTANTS.zeroth_index);
			} else {
				DATA_OBJ[obj.name] = values[obj.name];
			}
		});

		const mv_details = values?.movement_details || [];

		const FORM_VALUES_FOR_FCL = {};
		const FORM_VALUES_FOR_LOCALS = {};

		Object.keys(step0_data?.formValues).forEach((key) => {
			if (key.includes('fcl_main')) {
				FORM_VALUES_FOR_FCL[key.split('_fcl_main')[GLOBAL_CONSTANTS.zeroth_index]] = step0_data
					?.formValues[key];
			}
			if (key.includes('fcl_local')) {
				FORM_VALUES_FOR_LOCALS[key.split('_fcl_local')[GLOBAL_CONSTANTS.zeroth_index]] = step0_data
					?.formValues[key];
			}
		});

		const importLocalService = shipment_data?.all_services?.filter(
			(service) => service?.service_type === 'fcl_freight_local_service',
		)?.[GLOBAL_CONSTANTS.zeroth_index];

		if (formattedRate?.[GLOBAL_CONSTANTS.zeroth_index]?.[primary_service.id]) {
			FORM_VALUES_FOR_FCL.service_provider_id = 	formattedRate?.[GLOBAL_CONSTANTS.zeroth_index]?.
				[primary_service.id]?.service_provider_id;

			FORM_VALUES_FOR_FCL.shipping_line_id =	formattedRate?.[GLOBAL_CONSTANTS.zeroth_index]?.
				[primary_service.id]?.shipping_line_id;

			FORM_VALUES_FOR_LOCALS.service_provider_id = shipment_data?.main_service_trade_type === 'import'
				? importLocalService?.service_provider_id
				: formattedRate?.[GLOBAL_CONSTANTS.zeroth_index]?.[primary_service.id]?.service_provider_id;

			FORM_VALUES_FOR_LOCALS.shipping_line_id = shipment_data?.main_service_trade_type === 'import'
				? importLocalService?.shipping_line_id
				: formattedRate?.[GLOBAL_CONSTANTS.zeroth_index][primary_service.id]?.shipping_line_id;
		}

		const payloadForUpdateShipment = {
			data: {
				movement_details: mv_details.map((obj) => ({
					...(obj || {}),
					service_type: 'fcl_freight_service',
				})),
				...(DATA_OBJ || {}),
				...(FORM_VALUES_FOR_FCL || {}),
				schedule_departure : mv_details[GLOBAL_CONSTANTS.zeroth_index]?.schedule_departure,
				schedule_arrival   : mv_details[mv_details.length - ONE]?.schedule_arrival,
			},
			ids                 : task?.task_field_ids,
			service_type        : task?.service_type,
			shipment_id         : task?.shipment_id,
			performed_by_org_id : task?.organization_id,
		};
		try {
			const res1 = await updateServiceTrigger({
				data: payloadForUpdateShipment,
			});

			const res2 = LOCAL_SERVICE_IDS.length > GLOBAL_CONSTANTS.zeroth_index
				? await updateServiceTrigger({
					data: {
						data                : { ...FORM_VALUES_FOR_LOCALS },
						ids                 : LOCAL_SERVICE_IDS,
						service_type        : 'fcl_freight_local_service',
						shipment_id         : task?.shipment_id,
						performed_by_org_id : task.organization_id,
					},
				})
				: {};

			if (!res1?.hasError && !res2?.hasError) {
				const finalRes = await createDocmentTrigger({
					data: payloadCreateShipmentDocument,
				});

				if (!finalRes?.hasError) {
					const finalResponse = await updateTaskTrigger({
						data: {
							id     : task.id,
							status : 'pending',
							tags   : ['2'],
						},
					});
					if (!finalResponse.hasError) {
						Toast.success('Step Completed Successfully');
					}
					setStep(THREE);
				} else {
					Toast.error('Something went wrong !');
				}
			} else {
				Toast.error(JSON.stringify(res1?.data?.base || res2?.data?.base));
			}
		} catch (err) {
			toastApiError(err);
		}
	};

	return { bookingNote, setBookingNote, formProps, handleFinalSubmit, departureDate };
};
export default useGetStep2Data;
