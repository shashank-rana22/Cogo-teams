import toastApiError from '@cogoport/air-modules/utils/toastApiError';
import { Toast } from '@cogoport/components';
import { useRequestAir } from '@cogoport/request';

const useUpdateShipmentDocument = () => {
	const [{ loading }, trigger] = useRequestAir(
		{
			url     : '/air-coe/documents',
			method  : 'PUT',
			authKey : 'put_air_coe_documents',
		},
	);

	const updateDocument = async (payload, listAPI) => {
		try {
			await trigger({
				data: payload,
			});
			listAPI({});
			Toast.success('Document Approved Successfully');
		} catch (err) {
			toastApiError(err);
		}
	};

	return {
		updateDocument,
		loading,
	};
};
export default useUpdateShipmentDocument;
