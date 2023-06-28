/* eslint-disable no-mixed-spaces-and-tabs */
import toastApiError from '@cogoport/air-modules/utils/toastApiError';
import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';

const useUpdateServiceProvider = ({
	handleSubmit = () => {},
	handleSubmitLocal = () => {},
	otherHandleSubmit = () => {},
	setError = () => {},
	errors,
	servicesList = [],
	localService = '',
	task,
}) => {
	const onError = (err) => {
		setError(err);
	};
	const [{ loading }, updateShipmentTrigger] = useRequest(
		{
			url    : '/update_shipment_service',
			method : 'POST',
		},
		{ manual: true, autoCancel: false },
	);

	const updateShipmentTriggerFunc = async (payload, trigger) => trigger({ data: payload });

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

		let otherFormData = {};

		await otherHandleSubmit(
			(val) => {
				otherFormData = val;
			},
			(err) => {
				onError({ ...errors, ...err });
			},
		)();

		const PROMISES_ARRAY = [];
		const CHECK_UNIQ = {};
		if (formData || formDataLocal) {
			servicesList.forEach((serviceObj) => {
				let data = {};
				if (serviceObj?.service_type === 'air_freight_local') {
					if (serviceObj?.trade_type === 'export') {
						data = {
							service_provider_id : formDataLocal?.origin_service_provider_id,
							airline_id          : formDataLocal?.origin_airline_id,
						};
					} else {
						data = {
							service_provider_id : formDataLocal?.destination_service_provider_id,
							airline_id          : formDataLocal?.destination_airline_id,
						};
					}
				} else {
					data = {
						...(formData || {}), ...(otherFormData || {}),
					};
				}
				const payloadForUpdateShipment = {
					data,
					ids: [serviceObj?.id],
					service_type:
            serviceObj.service_type === `${localService}_local_service`
            	? `${localService}_local_service` : serviceObj?.service_type,
					shipment_id         : task?.shipment_id,
					performed_by_org_id : task?.organization_id,
				};
				if (!CHECK_UNIQ[serviceObj.id]) {
					CHECK_UNIQ[serviceObj.id] = true;

					PROMISES_ARRAY.push(
						updateShipmentTriggerFunc(
							payloadForUpdateShipment,
							updateShipmentTrigger,
						),
					);
				}
			});

			await Promise.all(PROMISES_ARRAY).then(
				() => {
					Toast.success('Services Successfully Allocated !');
				},
			).catch((err) => {
				toastApiError(err);
			});
		}
	};
	return {
		reallocationFunc,
		loading,
	};
};
export default useUpdateServiceProvider;
