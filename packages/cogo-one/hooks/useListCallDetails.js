import { useRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

import { DATE_FILTER_MAPPING } from '../configurations/time-filter-mapping';

const CALL_TYPE_FILTER = ['outgoing', 'incoming'];

const getParams = ({ value }) => ({
	source  : 'omnichannel',
	filters : {
		call_type               : CALL_TYPE_FILTER,
		created_at_less_than    : new Date(),
		created_at_greater_than : DATE_FILTER_MAPPING[value](new Date()),
	},
});

const useListCallDetails = ({ value }) => {
	const [{ data, loading }, trigger] = useRequest({
		url    : '/list_user_call_details',
		method : 'get',
	}, { manual: true });

	const voiceCallList = useCallback(() => {
		try {
			trigger({
				params: getParams({ value }),
			});
		} catch (error) {
			console.error(error, 'error');
		}
	}, [trigger, value]);

	useEffect(() => {
		voiceCallList();
	}, [voiceCallList]);

	return {
		callLoading : loading,
		callData    : data,
	};
};
export default useListCallDetails;
