import toastApiError from '@cogoport/air-modules/utils/toastApiError';
import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';

const useUpdateOrganizationDocument = ({ refetch, defaultParams = {} }) => {
	const [{ loading }, trigger] = useRequest({
		url    : '/update_organization_document',
		method : 'POST',

	}, { manual: true });

	const deleteDocument = async ({ id }) => {
		try {
			await trigger({
				data: {
					id,
					...defaultParams,
				},
			});

			Toast.success('Document Deleted Successfully');

			refetch();
		} catch (err) {
			toastApiError(err);
		}
	};

	return {
		deleteDocument,
		loading,
	};
};

export default useUpdateOrganizationDocument;
