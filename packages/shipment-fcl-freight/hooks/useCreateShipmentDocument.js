import { Toast } from '@cogoport/components';
import toastApiError from '@cogoport/ocean-modules/utils/toastApiError';
import { useRequest } from '@cogoport/request';

const useCreateShipmentDocument = ({
	refetch = () => {},
	successMessage = 'Successfully Created',
}) => {
	const [{ loading }, trigger] = useRequest({
		url    : 'create_shipment_document',
		method : 'POST',
	}, { manual: true });

	const apiTrigger = async (val) => {
		try {
			await trigger({ data: { ...val } });
			Toast.success(successMessage);
			refetch();
		} catch (err) {
			toastApiError(err);
		}
	};

	return {
		loading,
		apiTrigger,
	};
};

export default useCreateShipmentDocument;
