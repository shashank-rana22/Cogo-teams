import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useState } from 'react';

const useBulkUpload = ({ refetch, setShow }) => {
	const [fileUrl, setFileUrl] = useState(null);

	const {
		profile: profileData = {},
	} = useSelector((state: object) => state);

	const [trigger] = useRequestBf({
		url     : '/translation/translate/bulk-translations',
		method  : 'POST',
		authKey : 'post_translation_translate_bulk',
		params  : {
			fileUrl,
			uploadedBy: profileData.user.id,
		},
	}, { manual: true });

	const bulkUpload = async () => {
		try {
			const response = await trigger({ data: {} });
			if (response.hasError) {
				Toast.error(response?.message || 'Something went wrong');
				return;
			}
			Toast.success('Translations Added');
			setShow(false);
			refetch();
		} catch (error) {
			Toast.error(error?.response?.data?.message || 'Something went wrong');
		}
	};

	return {
		fileUrl,
		setFileUrl,
		bulkUpload,
	};
};

export default useBulkUpload;
