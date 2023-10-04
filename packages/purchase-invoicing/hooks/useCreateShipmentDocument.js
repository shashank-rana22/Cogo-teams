import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';

import toastApiError from '../utils/toastApiError';

const useCreateShipmentDocument = () => {
	const [{ loading }, trigger] = useRequest({
		method : 'POST',
		url    : '/create_shipment_document',
	}, {
		manual: true,
	});

	const createShipmentDocument = async (val, callback = () => {}) => {
		try {
			await trigger({ data: val });
			Toast.success('Document Created Successfully!!');
			callback();
		} catch (err) {
			toastApiError(err);
		}
	};

	return {
		createShipmentDocument,
		docLoading: loading,
	};
};

export default useCreateShipmentDocument;
