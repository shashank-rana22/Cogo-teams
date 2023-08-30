import { useRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

const getPayload = ({ userData = {} }) => {
	const { user_id = '', lead_user_id = '' } = userData || {};
	return {
		filters: {
			user_id      : user_id || undefined,
			lead_user_id : lead_user_id || undefined,
		},
	};
};

const useGetLastVoiceCallDetails = ({ userData = {} }) => {
	const [{ data, loading }, trigger] = useRequest({
		url    : '/list_user_call_details',
		method : 'get',
	}, { manual: true });

	const getVoiceCall = useCallback(async () => {
		try {
			await trigger({
				params: getPayload({ userData }),
			});
		} catch (error) {
			console.error(error);
		}
	}, [trigger, userData]);

	useEffect(() => {
		getVoiceCall();
	}, [getVoiceCall]);

	return {
		userLastCallLoading : loading,
		userLastCallDetails : data,
	};
};
export default useGetLastVoiceCallDetails;
