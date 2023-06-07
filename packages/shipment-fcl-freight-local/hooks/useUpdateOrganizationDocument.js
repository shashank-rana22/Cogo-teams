import { Toast } from '@cogoport/components';
import toastApiError from '@cogoport/ocean-modules/utils/toastApiError';
import { useRequest } from '@cogoport/request';

const useUpdateOrganizationDocument = ({ refetch, defaultParams = {} }) => {
	const [{ loading }, trigger] = useRequest({
		url    : 'update_organization_document',
		method : 'POST',

	}, { manual: true });

	const deleteDocument = async ({ id }) => {
		try {
			const res = await trigger({
				data: {
					id,
					...defaultParams,
				},
			});

			if (!res.hasError) Toast.success('Document Deleted Successfully');

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
