import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useState } from 'react';

interface Props {
	refetch: () => void;
	setShow: (p: boolean) => void;
}

const useBulkUpload = ({ refetch, setShow }: Props) => {
	const [fileUrl, setFileUrl] = useState(null);

	const {
		profile: profileData = {},
	} = useSelector((state: object) => state);

	const [{ loading }, trigger] = useRequestBf({
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

			if (response.data?.rejectedCount !== 0) {
				Toast.success(`${response.data?.successCount} Translations Added`);
				Toast.error(`${response.data?.rejectedCount} Translations Rejected` || 'Something went wrong');
				window.open(response.data?.errorFileUrl, '_blank');
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
		loading,
		fileUrl,
		setFileUrl,
		bulkUpload,
	};
};

export default useBulkUpload;
