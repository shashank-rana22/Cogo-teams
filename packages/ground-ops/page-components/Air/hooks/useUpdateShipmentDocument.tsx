import { Toast } from '@cogoport/components';
import { useRequestAir } from '@cogoport/request';

const useUpdateShipmentDocument = () => {
	const [{ loading }, trigger] = useRequestAir(
		{
			url     : '/air-coe/documents/update-shipment-document',
			method  : 'POST',
			authKey : 'post_air_coe_documents_update_shipment_document',
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
			Toast.error(err?.response?.data?.base?.[0] || 'Something went wrong');
		}
	};

	return {
		updateDocument,
		loading,
	};
};
export default useUpdateShipmentDocument;
