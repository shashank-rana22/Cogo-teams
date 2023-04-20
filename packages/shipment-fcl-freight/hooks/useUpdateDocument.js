import { Toast } from '@cogoport/components';
import toastApiError from '@cogoport/ocean-modules/utils/toastApiError';
import { useRequest } from '@cogoport/request';

const useUpdateDocument = () => {
	const [{ loading }, trigger] = useRequest({
		url    : 'create_organization_document',
		method : 'POST',

	}, { manual: true });

	const updateDocument = async ({ values }) => {
		try {
			const res = await trigger({
				data: {
					name            : values?.name,
					document_type   : values?.document_type,
					image_url       : values?.image_url,
					organization_id : values?.organization_id,
				},
			});
			if (!res.hasError) {
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
