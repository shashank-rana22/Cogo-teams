import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';

const useCreateShipmentDocument = () => {
	const [{ loading }, trigger] = useRequest({
		url    : 'create_shipment_document',
		method : 'POST',
	});

	const createDocument = async (payload, listAPi) => {
		try {
			await trigger({
				data: payload,
			});
			listAPi({});
			Toast.success('Document Created Successfully');
		} catch (err) {
			console.log(err);
		}
	};

	return {
		createDocument,
		loading,
	};
};
export default useCreateShipmentDocument;
