import { Toast } from '@cogoport/components';
import toastApiError from '@cogoport/ocean-modules/utils/toastApiError';
import { useRequest } from '@cogoport/request';

const useUpdateDocument = ({ refetch = () => {} } = {}) => {
	const [{ loading }, trigger] = useRequest({
		url    : 'create_organization_document',
		method : 'POST',

	}, { manual: true });

	const updateDocument = async ({ values } = {}) => {
		try {
			await trigger({ data: values });
			Toast.success('Document Added To Organization Wallet');
			refetch();
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
