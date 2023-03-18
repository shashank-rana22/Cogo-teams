import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';

const useDeleteDocument = ({ refetch }) => {
	const [{ loading }, trigger] = useRequest({
		url    : 'update_organization_document',
		method : 'POST',
	}, { manual: true });

	const deleteDocument = async ({ item }) => {
		try {
			const res = await trigger({
				data: { id: item?.id, status: 'inactive' },
			});
			if (!res.hasError) {
				Toast.success('Document Deleted Successfully');
			}
			refetch();
		} catch (err) {
			Toast.error(err?.data);
		}
	};

	return {
		deleteDocument,
		loading,
	};
};

export default useDeleteDocument;
