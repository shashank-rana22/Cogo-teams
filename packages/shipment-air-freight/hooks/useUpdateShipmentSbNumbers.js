import toastApiError from '@cogoport/air-modules/utils/toastApiError';
import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';

const useUpdateShipmentSbNumbers = ({
	successMessage = 'Task Updated Successfully!',
	refetch = () => {},
	onCancel = () => {},
}) => {
	const [{ loading }, trigger] = useRequest({
		url    : '/update_shipment_sb_numbers',
		method : 'POST',
	});

	const apiTrigger = async ({ payload = {} }) => {
		try {
			await trigger({ data: payload });
			Toast.success(successMessage);
			refetch();
			onCancel();
		} catch (err) {
			toastApiError(err);
		}
	};

	return {
		loading,
		apiTrigger,
	};
};

export default useUpdateShipmentSbNumbers;
