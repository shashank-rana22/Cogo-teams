/* eslint-disable no-mixed-spaces-and-tabs */
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
		{ manual: true },
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
				const payloadForUpdateShipment = {
					data:
            serviceObj.service_type === `${localService}_local_service` ? { ...(formDataLocal || {}) }
            	: { ...(formData || {}), ...(otherFormData || {}) },
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
			try {
				const resArr = await Promise.all(PROMISES_ARRAY);

				let check = false;
				let error = '';
				(resArr || []).forEach((res) => {
					if (res?.hasError) {
						check = true;
						error += `${res?.data}, `;
					}
				});
				if (check) {
					Toast.error(error);
				} else {
					Toast.success('Services Successfully Allocated !');
				}
			} catch (err) {
				Toast.error(JSON.stringify(err?.data));
			}
		}
	};
	return {
		reallocationFunc,
		loading,
	};
};
export default useUpdateServiceProvider;
