import { Toast } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
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
			Toast.error(err?.response?.data?.base?.[GLOBAL_CONSTANTS.zeroth_index] || 'Something went wrong');
		}
	};

	return {
		updateDocument,
		loading,
	};
};
export default useUpdateShipmentDocument;
