import { Toast } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import toastApiError from '@cogoport/ocean-modules/utils/toastApiError';
import { useRequest } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';

const SUCCESS_HTTP_CODE = 200;

const useUpdateShipmentPendingTask = ({
	successMessage = 'Task Updated Successfully!',
	refetch = () => {},
	task = {},
	tasksList = [],
}) => {
	const [{ loading }, trigger] = useRequest({
		url    : '/update_shipment_pending_task',
		method : 'POST',
	});

	const apiTrigger = async (val) => {
		try {
			const res = await trigger({ data: val });

			if (res.status === SUCCESS_HTTP_CODE && task.task === 'approve_compliance_documents') {
				const amendmentTask = tasksList?.filter((t) => t.task === 'amend_compliance_documents'
				&& t?.status === 'pending');

				if (!isEmpty(amendmentTask?.[GLOBAL_CONSTANTS.zeroth_index])) {
					await trigger({ data: { id: amendmentTask?.[GLOBAL_CONSTANTS.zeroth_index]?.id } });
				}
			}

			Toast.success(successMessage);
			refetch();
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
