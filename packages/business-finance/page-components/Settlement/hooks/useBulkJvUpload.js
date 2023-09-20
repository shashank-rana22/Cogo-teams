import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

const useBulkJvUpload = ({ fileValue = '', setShowBulkJV = () => {} }) => {
	const { profile } = useSelector((state) => state || {});
	const [uploadData, setUploadData] = useState({});

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
			const res = await Trigger({
				data: {
					documentUrl       : fileValue,
					performedByUserId : profile?.user?.id,
				},
			});
			setUploadData(res);
			if (isEmpty(res?.data)) {
				setShowBulkJV(false);
			}
		} catch (error) {
			if (error?.response?.data?.message) {
				Toast.error(error?.response?.data?.message);
			}
		}
	};

	return {
		getUploadApi,
		bulkJvLoading,
		uploadData,
	};
};
export default useBulkJvUpload;
