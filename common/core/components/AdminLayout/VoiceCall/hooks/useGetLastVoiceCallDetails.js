// import { useRequest } from '@cogoport/request';
// import { useEffect, useCallback } from 'react';

// const useGetLastVoiceCallDetails = ({ userData = {} }) => {
// 	const [{ data, loading }, trigger] = useRequest({
// 		url    : '/list_user_call_details',
// 		method : 'get',
// 	}, { manual: true });

// 	const getVoiceCall = useCallback(async () => {
// 		try {
// 			await trigger({
// 				params: { page: pagination, source: 'omnichannel' },
// 			});
// 		} catch (error) {
// 			// console.log(error);
// 		}
// 	}, [trigger]);

// 	useEffect(() => {
// 		getVoiceCall();
// 	}, [getVoiceCall]);

// 	return {
// 		userLastCallLoading : loading,
// 		userLastCallDetails : data,
// 	};
// };
// export default useGetLastVoiceCallDetails;
