import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { useRequest } from '@cogoport/request';
import { useCallback } from 'react';

const getPayload = ({ status }) => ({
	status,
	validity_start: formatDate({
		date       : new Date(),
		dateFormat : GLOBAL_CONSTANTS.formats.date['yyyy-MM-dd'],
		timeFormat : GLOBAL_CONSTANTS.formats.time['HH:mm:ss'],
		formatType : 'dateTime',
		separator  : ' ',
	}),
});

function useUpdateAgentStatus() {
	const [, trigger] = useRequest({
		url    : '/update_agent_work_preference',
		method : 'post',
	}, { manual: true });

	const updateAgentStatus = useCallback((status) => {
		try {
			trigger({
				data: getPayload({ status }),
			});
		} catch (error) {
			console.error(error);
		}
	}, [trigger]);

	return {
		updateAgentStatus,
	};
}
export default useUpdateAgentStatus;
