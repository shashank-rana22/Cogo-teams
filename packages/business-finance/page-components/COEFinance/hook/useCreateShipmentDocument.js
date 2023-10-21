import { Toast } from '@cogoport/components';
import getApiStringError from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';

const useCreateShipmentDocument = ({ refetch = () => {} }) => {
	const [{ loading }, trigger] = useRequest({
		url    : '/create_shipment_document',
		method : 'POST',
	}, { manual: true });

	const apiTrigger = async (val, callback = () => {}) => {
		try {
			await trigger({ data: val });
			Toast.success('Document Created Successfully!!');
			refetch();
			callback();
		} catch (err) {
			Toast.error(getApiStringError({ messages: err?.message }));
		}
	};

	return {
		apiTrigger,
		docLoading: loading,
	};
};
export default useCreateShipmentDocument;
