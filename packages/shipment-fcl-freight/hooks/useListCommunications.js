import toastApiError from '@cogoport/ocean-modules/utils/toastApiError';
import { useRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

const useListCommunications = ({ taskId }) => {
	const [{ loading, data }, trigger] = useRequest({
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

	const listCommunications = useCallback(
		() => {
			(async () => {
				try {
					await trigger();
				} catch (err) {
					toastApiError(err);
				}
			})();
		},
		[trigger],
	);

	useEffect(() => {
		listCommunications();
	}, [listCommunications]);

	return {
		list: data?.list,
		loading,
	};
};

export default useListCommunications;
