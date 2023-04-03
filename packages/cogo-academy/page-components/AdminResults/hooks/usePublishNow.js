import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useState } from 'react';

const usePublishNow = ({ test_id, refetchTest }) => {
	const [showPublishModal, setShowPublishModal] = useState(false);

	const [{ loading }, trigger] = useRequest({
		method : 'POST',
		url    : '/end_test',
	}, { manual: true });

	const publishResults = async () => {
		try {
			await trigger({
				data: {
					test_id,
				},
			});

			setShowPublishModal(false);

			refetchTest({ test_id });
		} catch (err) {
			Toast.error(getApiErrorString(err.response?.data));
		}
	};

	return {
		showPublishModal, setShowPublishModal, loading, publishResults,
	};
};

export default usePublishNow;
