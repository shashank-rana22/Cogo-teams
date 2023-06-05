import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import toastApiError from '@cogoport/surface-modules/utils/toastApiError';

const useCreateShipmentDocument = ({ setShowEdit }) => {
	const [{ loading }, trigger] = useRequest({
		url    : '/create_shipment_document',
		method : 'POST',
	}, { manual: true });

	const createDocument = async (payload, refetch) => {
		try {
			await trigger({
				data: payload,
			});

			refetch();
			setTimeout(() => {
				setShowEdit(false);
			}, 1000);

			Toast.success('Document saved successfully');
		} catch (error) {
			toastApiError(error);
		}
	};

	return {
		createDocument,
		loading,
	};
};

export default useCreateShipmentDocument;
