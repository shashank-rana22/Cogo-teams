import toastApiError from '@cogoport/ocean-modules/utils/toastApiError';
import { useRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

const useListCommunications = ({ taskId = '' }) => {
	const [{ loading = false, data }, trigger] = useRequest({
		url    : 'list_communications',
		method : 'GET',
		params : {
			filters: {
				service_objects : [{ id: taskId }],
				type            : 'email',
			},
			communication_content_required: true,
		},
		headers: {
			stopApiCache: true,
		},
	}, { manual: false });

	const getListCommunications = useCallback(async () => {
		try {
			await trigger();
		} catch (err) {
			toastApiError(err);
		}
	}, [trigger]);

	useEffect(() => {
		getListCommunications();
	}, [getListCommunications]);

	return {
		list: data?.list,
		loading,
	};
};

export default useListCommunications;
