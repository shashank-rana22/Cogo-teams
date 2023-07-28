import { useRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

import { DATE_FILTER_MAPPING } from '../constants';

const getParams = ({ timeline }) => ({
	source  : 'omnichannel',
	filters : {
		created_at_less_than    : new Date(),
		created_at_greater_than : DATE_FILTER_MAPPING[timeline](new Date()),
	},
});

const useListCallDetails = ({ timeline }) => {
	const [{ data, loading }, trigger] = useRequest({
		url    : '/list_user_call_details',
		method : 'get',
	}, { manual: true });

	const voiceCallList = useCallback(() => {
		try {
			trigger({
				params: getParams({ timeline }),
			});
		} catch (error) {
			console.error(error, 'error');
		}
	}, [trigger, timeline]);

	useEffect(() => {
		voiceCallList();
	}, [voiceCallList]);

	return {
		callLoading : loading,
		callData    : data,
	};
};
export default useListCallDetails;
