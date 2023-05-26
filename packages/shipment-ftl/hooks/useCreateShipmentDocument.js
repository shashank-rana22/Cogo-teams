import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import toastApiError from '@cogoport/surface-modules/utils/toastApiError';

const useCreateShipmentDocument = ({ refetch = () => {} }) => {
	const [{ loading }, trigger] = useRequest({
		url    : '/create_shipment_document',
		method : 'POST',
	}, { manual: true });

	const apiTrigger = async (val) => {
		try {
			const res = await trigger({ data: val });

			if (!res.hasError) {
				Toast.success('Document Created Successfully!!');

				refetch();
			}
		} catch (err) {
			toastApiError(err);
		}
	};

	return {
		apiTrigger,
		docLoading: loading,
	};
};
export default useCreateShipmentDocument;
