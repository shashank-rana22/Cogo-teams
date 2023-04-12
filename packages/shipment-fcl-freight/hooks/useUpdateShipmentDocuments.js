import { useRequest } from '@cogoport/request';

import toastApiError from '../utils/toastApiError';

function useUpdateShipmentDocuments({
	refetch = () => {},
}) {
	console.log('refetch', refetch);
	const [{ loading }, trigger] = useRequest({
		url    : 'update_shipment_document',
		method : 'POST',
	}, { manual: true });

	const updateDocument = async (val) => {
		try {
			const res = await trigger({
				data: val,
			});
			if (!res?.hasError) {
				refetch();
			}
		} catch (err) {
			toastApiError(err);
		}
	};

	return {
		taskUpdateLoading: loading,
		updateDocument,
	};
}

export default useUpdateShipmentDocuments;
