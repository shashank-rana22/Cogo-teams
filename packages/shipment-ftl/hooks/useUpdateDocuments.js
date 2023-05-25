import toastApiError from '@cogoport/surface-modules/utils/toastApiError';
import { useRequest } from '@cogoport/request';

function useUpdateDocuments({
	refetch = () => {},
}) {
	const [{ loading }, trigger] = useRequest({
		url    : '/update_shipment_document',
		method : 'POST',
	}, { manual: true });

	const updateDocument = async (val) => {
		try {
			const res = await trigger({ data: val });

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

export default useUpdateDocuments;
