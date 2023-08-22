import { useRequestBf } from '@cogoport/request';

import toastApiError from '../../commons/toastApiError.ts';

const useUploadAndDelete = ({ refetch }) => {
	const [{ loading:deleteIdLoading }, trigger] = useRequestBf(
		{
			url     : '/sales/outward',
			method  : 'delete',
			authKey : 'delete_sales_outward',
		},
		{ manual: true },
	);
	const [{ loading:uploadIdLoading }, uploadTrigger] = useRequestBf(
		{
			url     : '/sales/outward/upload-outward-file',
			method  : 'post',
			authKey : 'post_sales_outward_upload_outward_file',
		},
		{ manual: true },
	);
	const deleteId = async (id) => {
		try {
			await trigger({
				data: {
					id,
				},
			});
			refetch();
		} catch (error) {
			toastApiError(error);
		}
	};

	const uploadId = async (id) => {
		try {
			await uploadTrigger({
				data: {
					outwardId: id,
				},
			});
			refetch();
		} catch (error) {
			toastApiError(error);
		}
	};

	return {
		deleteId,
		uploadId,
		deleteIdLoading,
		uploadIdLoading,
	};
};
export default useUploadAndDelete;
