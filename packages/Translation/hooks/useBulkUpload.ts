import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useState } from 'react';

const useBulkUpload = () => {
	const [fileUrl, setFileUrl] = useState(null);

	const {
		profile: profileData = {},
	} = useSelector((state: object) => state);

	const [{ loading }, trigger] = useRequestBf({
		url     : '/translation/translate/bulk-translations',
		method  : 'POST',
		authKey : 'post_translation_translate_bulk',
	}, { manual: true });

	const bulkUpload = async () => {
		try {
			const response = await trigger({
				URLSearchParams: {
					fileUrl,
					uploadedBy: profileData.user.id,
				},
			});
			if (response.hasError) {
				Toast.error(response?.message || 'Something went wrong');
				return;
			}
			Toast.success('Translations Added');
		} catch (error) {
			Toast.error(error?.response?.data?.message || 'Something went wrong');
		}
	};

	return {
		loading,
		fileUrl,
		setFileUrl,
		bulkUpload,
	};
};

export default useBulkUpload;
