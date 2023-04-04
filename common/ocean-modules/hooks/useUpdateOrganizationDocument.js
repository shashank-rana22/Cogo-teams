import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';

import getApiErrorString from '../utils/getApiErrorString';

const useUpdateOrganizationDocument = ({ refetch }) => {
	const [{ loading }, trigger] = useRequest({
		url    : 'update_organization_document',
		method : 'POST',
	}, { manual: true });

	const deleteDocument = async ({ id }) => {
		try {
			const res = await trigger({
				data: { id, status: 'inactive' },
			});
			if (!res.hasError) {
				Toast.success('Document Deleted Successfully');
			}
			refetch();
		} catch (err) {
			Toast.error(getApiErrorString(err));
		}
	};

	return {
		deleteDocument,
		loading,
	};
};

export default useUpdateOrganizationDocument;
