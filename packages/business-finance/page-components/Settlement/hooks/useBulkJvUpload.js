import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

const useBulkJvUpload = ({ fileValue = '', setShowBulkJV = () => {} }) => {
	const { profile } = useSelector((state) => state || {});

	const [
		{ loading:bulkJvLoading }, Trigger] = useRequestBf(
		{
			url     : '/payments/parent-jv/bulk-jv-upload',
			method  : 'POST',
			authKey : 'post_payments_parent_jv_bulk_jv_upload',
		},
		{ manual: true },
	);
	const getUploadApi = async () => {
		try {
			await Trigger({
				data: {
					documentUrl       : fileValue,
					performedByUserId : profile?.user?.id,
				},
			});
			setShowBulkJV(false);
		} catch (error) {
			if (error?.response?.data?.message) {
				Toast.error(error?.response?.data?.message);
			}
		}
	};

	return {
		getUploadApi,
		bulkJvLoading,
	};
};
export default useBulkJvUpload;
