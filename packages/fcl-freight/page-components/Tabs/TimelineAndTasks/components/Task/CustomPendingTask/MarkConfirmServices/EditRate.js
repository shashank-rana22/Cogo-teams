import { useFormCogo } from '@cogoport/front/hooks';
import { useState } from 'react';
import { useRequest } from '@cogo/commons/hooks';
import { toast } from '@cogoport/front/components/admin';
import { isEmpty } from '@cogoport/front/utils';
import useEditQuote from '../BookingNote/useEditQuote.js';
import UpdateQuotation from '../BookingNote/UpdateQuotation/index.js';
import FormLayout from '../../../../../commons/Layout';
import getControls from './helper/getControls.js';
import getLocalControls from './helper/getLocalControls.js';
import {
	Container,
	ServiceProvider,
	Heading,
	SkeletonWrapper,
	CustomSkeleton,
} from './styles.js';

const updateShipmentTriggerFunc = async (payload, trigger) => {
	return trigger({ data: payload });
};

const EditRate = ({
	task = {},
	services = [],
	onCancel = () => {},
	shipment_data = {},
	timeLineRefetch = () => {},
	refetch = () => {},
	localService = '',
	formattedRate = {},
}) => {
	const editQuote = useEditQuote({
		shipmentData: shipment_data,
		task,
		services,
		refetch,
		onCancel,
		timeLineRefetch,
		formattedRate,
	});

	const mainAirFreight = (shipment_data?.all_services || []).filter(
		(service) => service.service_type === 'air_freight_service',
	);
	const mainLocalAirFreight = (shipment_data?.all_services || []).filter(
		(service) => service.service_type === 'air_freight_local_service',
	);
	const subsidiaryService = (shipment_data?.all_services || []).find(
		(service) =>
			service.service_type === 'subsidiary_service' &&
			service.service_name === task?.subsidiary_service_name,
	);

	const requiredRawControls = getControls({
		service_type: task?.service_type,
		shipment_data,
		formattedRate,
		subsidiaryService,
	});

	let airlineName;
	let localAirlineName;
	let serviceProviderName;
	let localServiceProviderName;

	const formattedRateVal = formattedRate?.[formattedRate?.primary_service?.id];

	if (!isEmpty(formattedRateVal)) {
		airlineName = formattedRateVal?.airline_id;
		serviceProviderName = formattedRateVal?.service_provider_id;
		localAirlineName = formattedRateVal?.airline_id;
		localServiceProviderName = formattedRateVal?.service_provider_id;
	} else if (!isEmpty(services)) {
		(services || []).forEach((service) => {
			if (service?.service_type === 'air_freight_service') {
				airlineName = service?.airline?.id;
				serviceProviderName = service?.service_provider?.id;
			}

			if (service?.service_type === 'subsidiary_service') {
				serviceProviderName = service?.service_provider?.id;
			}

			if (service?.service_type === 'air_freight_local_service') {
				localAirlineName = service?.airline?.id;
				localServiceProviderName = service?.service_provider?.id;
			}
		});
	} else {
		airlineName = mainAirFreight?.[0]?.airline_id;
		serviceProviderName = mainAirFreight?.[0]?.service_provider_id;
		localAirlineName = mainLocalAirFreight?.[0]?.airline_id;
		localServiceProviderName = mainLocalAirFreight?.[0]?.service_provider_id;
	}

	const [airInput, setAirInput] = useState({
		airline_id: airlineName,
		service_provider_id: serviceProviderName,
	});

	const [localAirInput, setLocalAirInput] = useState({
		airline_id: localAirlineName,
		service_provider_id: localServiceProviderName,
	});

	const handleAirChange = (obj, name) => {
		setAirInput((prev) => ({
			...prev,
			[name]: obj?.id,
		}));
	};

	const handleAirLocalChange = (obj, name) => {
		setLocalAirInput((prev) => ({
			...prev,
			[name]: obj?.id,
		}));
	};

	const requiredControls = requiredRawControls.map((ctrl) => {
		const { name = '' } = ctrl;
		if (name === 'airline_id' || name === 'service_provider_id') {
			return {
				...ctrl,
				value:
					formattedRate?.[formattedRate?.primary_service?.id]?.[ctrl.name] ||
					ctrl.value,
				handleChange: handleAirChange,
			};
		}
		return {
			...ctrl,
			value:
				formattedRate?.[formattedRate?.primary_service?.id]?.[ctrl.name] ||
				ctrl.value,
		};
	});

	const localRawControls = getLocalControls(
		task?.service_type,
		shipment_data,
		formattedRate,
	);

	const localControls = localRawControls.map((ctrl) => {
		const { name = '' } = ctrl;

		if (name === 'airline_id' || name === 'service_provider_id') {
			return {
				...ctrl,
				value:
					formattedRate?.[formattedRate?.primary_service?.id]?.[ctrl.name] ||
					ctrl.value,
				handleChange: handleAirLocalChange,
			};
		}
		return {
			...ctrl,
			value:
				formattedRate?.[formattedRate?.origin_local?.id]?.[ctrl.name] ||
				ctrl.value,
		};
	});

	const { fields, handleSubmit, watch } = useFormCogo(requiredControls);

	const {
		fields: fieldsForLocal,
		handleSubmit: handleSubmitLocal,
		watch: watchForLocal,
	} = useFormCogo(localControls);

	const [errors, setError] = useState({});

	const onError = (err) => {
		setError(err);
	};

	const watchServiceProvider = {
		normal_service_provider: watch('service_provider_id'),
		local_service_provider: watchForLocal('service_provider_id'),
		normal_airline: watch('airline_id'),
		local_airline: watchForLocal('airline_id'),
	};

	const { trigger: updateShipmentTrigger } = useRequest(
		'post',
		false,
		'partner',
		{ autoCancel: false },
	)('/update_shipment_service');

	const reallocationFunc = async () => {
		let formData = {};

		await handleSubmit(
			(val) => {
				formData = val;
			},
			(err) => {
				onError(err);
			},
		)();

		let formDataLocal = {};

		await handleSubmitLocal(
			(val) => {
				formDataLocal = val;
			},
			(err) => {
				onError({ ...errors, ...err });
			},
		)();

		const promisesArr = [];
		const checkUniq = {};
		if (formData || formDataLocal) {
			services.forEach((serviceObj) => {
				const payloadForUpdateShipment = {
					data:
						serviceObj.service_type === `${localService}_local_service`
							? {
									...(formDataLocal || {}),
							  }
							: { ...(formData || {}) },
					ids: [serviceObj?.id],
					service_type:
						serviceObj.service_type === `${localService}_local_service`
							? `${localService}_local_service`
							: serviceObj?.service_type,
					shipment_id: task?.shipment_id,
					performed_by_org_id: task?.organization_id,
				};
				if (!checkUniq[serviceObj.id]) {
					checkUniq[serviceObj.id] = true;
					promisesArr.push(
						updateShipmentTriggerFunc(
							payloadForUpdateShipment,
							updateShipmentTrigger,
						),
					);
				}
			});
			try {
				const resArr = await Promise.all(promisesArr);

				let check = false;
				let error = '';
				(resArr || []).forEach((res) => {
					if (res?.hasError) {
						check = true;
						error += `${res?.data}, `;
					}
				});
				if (check) {
					toast.error(error);
				} else {
					toast.success('Services Successfully Allocated !');
				}
			} catch (err) {
				toast.error(JSON.stringify(err?.data));
			}
		}
	};

	return (
		<Container>
			<Heading>Quotation Update and Reallocation</Heading>
			<ServiceProvider>
				<FormLayout
					fields={fields}
					controls={requiredControls}
					errors={errors}
				/>
			</ServiceProvider>
			<ServiceProvider>
				<FormLayout
					fields={fieldsForLocal}
					controls={localControls}
					errors={errors}
				/>
			</ServiceProvider>
			{editQuote.loading ? (
				<SkeletonWrapper>
					{Array(4)
						.fill(0)
						.map(() => (
							<CustomSkeleton />
						))}
				</SkeletonWrapper>
			) : (
				<UpdateQuotation
					editQuote={editQuote}
					onCancel={onCancel}
					timeLineRefetch={timeLineRefetch}
					reallocationFunc={reallocationFunc}
					airInput={airInput}
					fieldsForLocal={fieldsForLocal}
					localAirInput={localAirInput}
					shipmentData={shipment_data}
					formattedRate={formattedRate}
					watchServiceProvider={watchServiceProvider}
				/>
			)}
		</Container>
	);
};

export default EditRate;
