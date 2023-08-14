import { Toast } from '@cogoport/components';
import toastApiError from '@cogoport/ocean-modules/utils/toastApiError';
import { useRequest } from '@cogoport/request';

const useCreateShipmentDocument = ({ refetch = () => {} }) => {
	const [{ loading }, trigger] = useRequest({
		url    : 'create_shipment_document',
		method : 'POST',
	}, { manual: true });

	const apiTrigger = async (val) => {
		try {
			await trigger({ data: val });

			Toast.success('Document Created Successfully!!');
			refetch();
			return Promise.resolve();
		} catch (err) {
			toastApiError(err);
			return Promise.reject();
		}
	};

	return {
		apiTrigger,
		docLoading: loading,
	};
};

export default useCreateShipmentDocument;
