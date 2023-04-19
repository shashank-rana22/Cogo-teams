import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';

import toastApiError from '../utils/toastApiError';

const useCreateShipmentDocument = ({ documents, refetch = () => {} }) => {
	const [{ loading }, trigger] = useRequest({
		url    : '/create_shipment_document',
		method : 'POST',
	}, { manual: true });

	const apiTrigger = async (val) => {
		try {
			const res = await trigger({ params: { documents, ...val } });
			if (!res.hasError) {
				Toast.success('Successfully Created');
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
