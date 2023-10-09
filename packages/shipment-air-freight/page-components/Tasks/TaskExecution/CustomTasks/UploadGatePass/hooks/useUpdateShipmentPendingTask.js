import toastApiError from '@cogoport/air-modules/utils/toastApiError';
import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';

const useUpdateShipmentPendingTask = ({
	routeBack = () => {},
}) => {
	const [{ loading }, trigger] = useRequest({
		url    : '/update_shipment_pending_task',
		method : 'POST',
	}, { manual: true });

	const apiTrigger = async ({ payload = {} }) => {
		try {
			await trigger({ data: payload });
			Toast.success('Task Completed Successfully');
			routeBack();
		} catch (err) {
			toastApiError(err);
		}
	};

	return {
		loading,
		apiTrigger,
	};
};

export default useUpdateShipmentPendingTask;
