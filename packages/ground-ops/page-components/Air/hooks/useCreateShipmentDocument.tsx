import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';

const useCreateShipmentDocument = () => {
	const [{ loading }, trigger] = useRequest({
		url    : 'create_shipment_document',
		method : 'POST',
	});

	const createDocument = async (payload, listAPI) => {
		try {
			await trigger({
				data: payload,
			});
			listAPI({ filters: {} });
			Toast.success('Document Created Successfully');
		} catch (err) {
			Toast.error(err || 'Failed to Upload');
		}
	};

	return {
		createDocument,
		loading,
	};
};
export default useCreateShipmentDocument;
