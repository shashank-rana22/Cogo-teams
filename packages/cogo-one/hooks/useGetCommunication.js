import { useRequest } from '@cogoport/request';
import { useCallback, useEffect } from 'react';

const getParams = ({ communicationId }) => ({
	id: communicationId,
});

function useGetCommunication({ communicationId = '' }) {
	const [{ loading, data }, trigger] = useRequest(
		{
			url    : '/get_communication',
			method : 'get',
		},
		{ manual: true },
	);

	const getCommunication = useCallback(
		async () => {
			try {
				await trigger({
					params: getParams({ communicationId }),
				});
			} catch (error) {
				console.error(error);
			}
		},
		[communicationId, trigger],
	);

	useEffect(
		() => {
			getCommunication();
		},
		[getCommunication],
	);

	return {
		loading,
		communicationData: data || {},
	};
}

export default useGetCommunication;
