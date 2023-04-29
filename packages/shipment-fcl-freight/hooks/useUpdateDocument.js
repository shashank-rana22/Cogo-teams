import { Toast } from '@cogoport/components';
import toastApiError from '@cogoport/ocean-modules/utils/toastApiError';
import { useRequest } from '@cogoport/request';

const useUpdateDocument = ({ refetch = () => {} }) => {
	const [{ loading }, trigger] = useRequest({
		url    : 'create_organization_document',
		method : 'POST',

	}, { manual: true });

	const updateDocument = async ({ values }) => {
		try {
			const res = await trigger({ data: values });
			if (!res.hasError) {
				refetch();
				Toast.success('Document Added To Organization Wallet');
			}
		} catch (err) {
			toastApiError(err?.data);
		}
	};

	return {
		updateDocument,
		loading,
	};
};
export default useUpdateDocument;
