import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';

const useUpdateShipmentDocument = () => {
	const [{ loading }, trigger] = useRequest({
		url    : 'update_shipment_document',
		method : 'POST',
	});

	const updateDocument = async (payload, listAPi) => {
		try {
			await trigger({
				data: payload,
			});
			listAPi({});
			Toast.success('Document Approved Successfully');
		} catch (err) {
			Toast.error(err);
		}
	};

	return {
		updateDocument,
		loading,
	};
};
export default useUpdateShipmentDocument;
