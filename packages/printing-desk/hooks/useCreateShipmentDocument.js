import toastApiError from '@cogoport/air-modules/utils/toastApiError';
import { Toast } from '@cogoport/components';
import { useRequestAir } from '@cogoport/request';

const useCreateShipmentDocument = () => {
	const [{ loading }, trigger] = useRequestAir(
		{
			url     : '/air-coe/documents',
			method  : 'POST',
			authKey : 'post_air_coe_documents',
		},
	);

	const createDocument = async (payload, listAPI) => {
		try {
			await trigger({
				data: payload,
			});
			listAPI({ filters: {} });
			Toast.success('Document Created Successfully');
		} catch (err) {
			toastApiError(err);
		}
	};

	return {
		createDocument,
		loading,
	};
};
export default useCreateShipmentDocument;
