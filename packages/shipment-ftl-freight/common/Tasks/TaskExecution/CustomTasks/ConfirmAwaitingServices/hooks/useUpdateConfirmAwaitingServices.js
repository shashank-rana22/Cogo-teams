import { useRequest } from '@cogoport/request';
import toastApiError from '@cogoport/surface-modules/utils/toastApiError';

const useUpdateConfirmAwaitingServices = ({ task = {}, callback = () => {} }) => {
	const [{ loading, data }, trigger] = useRequest({
		url    : '/update_shipment_pending_task',
		method : 'POST',
	});

	const updateConfirmAwaitingServices = async () => {
		try {
			await trigger({
				data: {
					id                  : task?.id,
					ftl_freight_service : {},
				},
			});
			callback();
		} catch (error) {
			toastApiError(error);
		}
	};

	return {
		loading,
		data,
		updateConfirmAwaitingServices,
	};
};

export default useUpdateConfirmAwaitingServices;
