import toastApiError from '@cogoport/air-modules/utils/toastApiError';
import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';

const useUpdateShipmentPendingTask = () => {
	const [{ loading }, trigger] = useRequest({
		url    : '/update_shipment_pending_task',
		method : 'POST',
	});

	const apiTrigger = async (payload) => {
		try {
			const res = await trigger({ data: payload });
			Toast.success('Done hahahaah');
			return res;
		} catch (err) {
			toastApiError(err);
			return err;
		}
	};

	return {
		loading,
		apiTrigger,
	};
};

export default useUpdateShipmentPendingTask;
