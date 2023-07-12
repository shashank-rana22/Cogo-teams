import { Toast } from '@cogoport/components';
import { useRequestAir } from '@cogoport/request';

const useUpdateShipmentDocument = () => {
	const [{ loading }, trigger] = useRequestAir({
		url     : '/air-coe/documents',
		method  : 'PUT',
		authKey : 'put_air_coe_documents',
	});

	const updateShipment = async ({ payload }) => {
		try {
			await trigger({
				data: payload,
			});
			Toast.success('Document saved successfully');
		} catch (error) {
			Toast.error(error?.response?.data?.message || error?.message || 'Failed to save Document');
		}
	};

	return {
		updateShipment,
		loading,
	};
};

export default useUpdateShipmentDocument;
