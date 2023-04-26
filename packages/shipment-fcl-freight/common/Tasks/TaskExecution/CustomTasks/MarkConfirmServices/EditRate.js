import { Loader } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
// import { useRequest } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';

// import { useState } from 'react';
import FormLayout from '../../helpers/Layout';
import getDefaultValues from '../../utils/get-default-values';
import Step3 from '../UploadBookingNote/components/Step3';
import useGetStep3Data from '../UploadBookingNote/helpers/useGetStep3Data';

import getControls from './helper/getControls';
// import UpdateQuotation from '../BookingNote/UpdateQuotation/index.js';
// import useEditQuote from '../BookingNote/useEditQuote.js';
// import getLocalControls from './helper/getLocalControls.js';
import styles from './styles.module.css';

// const updateShipmentTriggerFunc = async (payload, trigger) => trigger({ data: payload });

function EditRate({
	task = {},
	servicesList = [],
	// primaryService = {},
	onCancel = () => {},
	shipment_data = {},
	// timeLineRefetch = () => {},
	refetch = () => {},
	// localService = '',
	formattedRate = {},
}) {
	const editQuote = useGetStep3Data({
		servicesList    : servicesList.filter((item) => item.service_type === task.service_type),
		shipment_data,
		onCancel,
		task,
		taskListRefetch : refetch,
	});

	const subsidiaryService = (servicesList || []).find(
		(service) => service.service_type === 'subsidiary_service'
			&& service.id === task?.service_id,
	);

	const requiredRawControls = getControls({
		service_type: task?.service_type,
		servicesList,
		subsidiaryService,
	});

	// let serviceProviderName;
	// let localServiceProviderName;

	const formattedRateVal = formattedRate?.[formattedRate?.primary_service?.id];

	if (!isEmpty(formattedRateVal)) {
		// serviceProviderName = formattedRateVal?.service_provider_id;
		// localServiceProviderName = formattedRateVal?.service_provider_id;
	} else if (!isEmpty(servicesList)) {
		(servicesList || []).forEach((service) => {
			if (service?.service_type === 'subsidiary_service') {
				// serviceProviderName = service?.service_provider?.id;
			}
		});
	}

	const requiredControls = requiredRawControls.map((ctrl) => ({
		...ctrl,
		value:
				formattedRate?.[formattedRate?.primary_service?.id]?.[ctrl.name]
				|| ctrl.value,
	}));

	const defaultValues = getDefaultValues(requiredControls);

	const formProps = useForm({ defaultValues });

	const { control, formState: { errors } } = formProps || {};

	// const localRawControls = getLocalControls(
	// 	task?.service_type,
	// 	shipment_data,
	// 	formattedRate,
	// );

	// const localControls = localRawControls.map((ctrl) => {
	// 	const { name = '' } = ctrl;

	// 	if (name === 'airline_id' || name === 'service_provider_id') {
	// 		return {
	// 			...ctrl,
	// 			value:
	// 				formattedRate?.[formattedRate?.primary_service?.id]?.[ctrl.name]
	// 				|| ctrl.value,
	// 			handleChange: handleAirLocalChange,
	// 		};
	// 	}
	// 	return {
	// 		...ctrl,
	// 		value:
	// 			formattedRate?.[formattedRate?.origin_local?.id]?.[ctrl.name]
	// 			|| ctrl.value,
	// 	};
	// });

	// const {
	// 	fields: fieldsForLocal,
	// 	handleSubmit: handleSubmitLocal,
	// 	watch: watchForLocal,
	// } = useFormCogo(localControls);

	// const watchServiceProvider = {
	// 	normal_service_provider : watch('service_provider_id'),
	// 	local_service_provider  : watchForLocal('service_provider_id'),
	// 	normal_airline          : watch('airline_id'),
	// 	local_airline           : watchForLocal('airline_id'),
	// };

	// const { trigger: updateShipmentTrigger } = useRequest(
	// 	'post',
	// 	false,
	// 	'partner',
	// 	{ autoCancel: false },
	// )('/update_shipment_service');

	// const reallocationFunc = async () => {
	// 	let formData = {};

	// 	await handleSubmit(
	// 		(val) => {
	// 			formData = val;
	// 		},
	// 		(err) => {
	// 			onError(err);
	// 		},
	// 	)();

	// 	let formDataLocal = {};

	// 	await handleSubmitLocal(
	// 		(val) => {
	// 			formDataLocal = val;
	// 		},
	// 		(err) => {
	// 			onError({ ...errors, ...err });
	// 		},
	// 	)();

	// 	const promisesArr = [];
	// 	const checkUniq = {};
	// 	if (formData || formDataLocal) {
	// 		services.forEach((serviceObj) => {
	// 			const payloadForUpdateShipment = {
	// 				data:
	// 					serviceObj.service_type === `${localService}_local_service`
	// 						? {
	// 							...(formDataLocal || {}),
	// 						  }
	// 						: { ...(formData || {}) },
	// 				ids: [serviceObj?.id],
	// 				service_type:
	// 					serviceObj.service_type === `${localService}_local_service`
	// 						? `${localService}_local_service`
	// 						: serviceObj?.service_type,
	// 				shipment_id         : task?.shipment_id,
	// 				performed_by_org_id : task?.organization_id,
	// 			};
	// 			if (!checkUniq[serviceObj.id]) {
	// 				checkUniq[serviceObj.id] = true;
	// 				promisesArr.push(
	// 					updateShipmentTriggerFunc(
	// 						payloadForUpdateShipment,
	// 						updateShipmentTrigger,
	// 					),
	// 				);
	// 			}
	// 		});
	// 		try {
	// 			const resArr = await Promise.all(promisesArr);

	// 			let check = false;
	// 			let error = '';
	// 			(resArr || []).forEach((res) => {
	// 				if (res?.hasError) {
	// 					check = true;
	// 					error += `${res?.data}, `;
	// 				}
	// 			});
	// 			if (check) {
	// 				Toast.error(error);
	// 			} else {
	// 				Toast.success('Services Successfully Allocated !');
	// 			}
	// 		} catch (err) {
	// 			Toast.error(JSON.stringify(err?.data));
	// 		}
	// 	}
	// };

	return (
		<div className={styles.container}>
			<div className={styles.heading}>Quotation Update and Reallocation</div>
			<div className={styles.service_provider}>
				<FormLayout
					fields={requiredControls}
					control={control}
					errors={errors}
				/>
			</div>
			<div className={styles.service_provider}>
				{/* <FormLayout
					fields={fieldsForLocal}
					controls={localControls}
					errors={errors}
				/> */}
			</div>
			{editQuote.serviceQuotationLoading ? (
				<div className={styles.loading_container}>
					Loading Task....
					<Loader themeType="primary" className={styles.loader_icon} />
				</div>
			) : (
				<Step3 data={editQuote} />
			)}
		</div>
	);
}

export default EditRate;
