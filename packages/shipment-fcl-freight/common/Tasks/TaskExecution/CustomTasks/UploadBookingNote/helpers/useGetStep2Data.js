import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
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
	fileUrl = {},
	formattedRate = {},
	servicesList = {},
	setStep = () => {},
}) => {
	const [bookingNote, setBookingNote] = useState(0);

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

	const localServiceIds = [];
	const fclFreight = [];

	(servicesList || []).forEach((serviceObj) => {
		if (serviceObj?.service_type?.includes('fcl_freight_local')) {
			localServiceIds.push(serviceObj?.id);
		} else if (serviceObj?.service_type?.includes('fcl_freight_service')) {
			fclFreight.push(serviceObj);
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
			free_days_demurrage_destination : primary_service?.free_days_demurrage_destination || 0,
			free_days_demurrage_origin      : primary_service?.free_days_demurrage_origin || 0,
			free_days_detention_destination : primary_service?.free_days_detention_destination || 0,
			free_days_detention_origin      : primary_service?.free_days_detention_origin || 0,
		},
	});

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

		const dataObj = {};
		(mainControls || []).forEach((obj) => {
			if (numberKeys.includes(obj.name)) {
				dataObj[obj.name] = Number(values[obj.name] || 0);
			} else {
				dataObj[obj.name] = values[obj.name];
			}
		});

		const mv_details = values?.movement_details || [];

		const formValuesForFcl = {};
		const formValuesForLocal = {};

		Object.keys(step0_data?.formValues).forEach((key) => {
			if (key.includes('fcl_main')) {
				formValuesForFcl[key.split('_fcl_main')[0]] = step0_data?.formValues[key];
			}
			if (key.includes('fcl_local')) {
				formValuesForLocal[key.split('_fcl_local')[0]] = step0_data?.formValues[key];
			}
		});

		if (formattedRate?.primary_service) {
			formValuesForFcl.service_provider_id = formattedRate[primary_service.id]?.service_provider_id;
			formValuesForFcl.shipping_line_id =	formattedRate[primary_service.id]?.shipping_line_id;
			formValuesForLocal.service_provider_id = formattedRate[primary_service.id]?.service_provider_id;
			formValuesForLocal.shipping_line_id = formattedRate[primary_service.id]?.shipping_line_id;
		}

		const payloadForUpdateShipment = {
			data: {
				movement_details: mv_details.map((obj) => ({
					...(obj || {}),
					service_type: 'fcl_freight_service',
				})),
				...(dataObj || {}),
				...(formValuesForFcl || {}),
				schedule_departure : mv_details[0]?.schedule_departure,
				schedule_arrival   : mv_details[mv_details.length - 1]?.schedule_arrival,
			},
			ids                 : task.task_field_ids,
			service_type        : task?.service_type,
			shipment_id         : task?.shipment_id,
			performed_by_org_id : task?.organization_id,
		};
		try {
			const res1 = await updateServiceTrigger({
				data: payloadForUpdateShipment,
			});

			const res2 =				localServiceIds.length > 0
				? await updateServiceTrigger({
					data: {
						data                : { ...formValuesForLocal },
						ids                 : localServiceIds,
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
					setStep(3);
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

	return { bookingNote, setBookingNote, formProps, handleFinalSubmit };
};
export default useGetStep2Data;
