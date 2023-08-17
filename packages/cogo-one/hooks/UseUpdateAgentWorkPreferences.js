import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { useRequest } from '@cogoport/request';
import { useCallback } from 'react';

const getPayload = ({ type }) => {
	const todayDateTime = formatDate({
		date       : new Date(),
		dateFormat : GLOBAL_CONSTANTS.formats.date['yyyy-MM-dd'],
		timeFormat : GLOBAL_CONSTANTS.formats.time['HH:mm:ss'],
		formatType : 'dateTime',
		separator  : ' ',
	});

	return {
		status         : type,
		validity_start : type === 'punched_in' ? todayDateTime : undefined,
		validity_end   : type === 'punched_out' ? todayDateTime : undefined,
	};
};

function useUpdateAgentWorkPreferences({
	fetchworkPrefernce = () => {},
	agentTimeline = () => {},
	setIsShaking = () => {},
}) {
	const [{ data, loading }, trigger] = useRequest({
		url    : '/update_agent_work_preference',
		method : 'post',
	}, { manual: true });

	const updateWorkPreference = useCallback(async ({ type = '' }) => {
		try {
			await trigger({
				data: getPayload({ type }),
			});
			agentTimeline();
			fetchworkPrefernce();
			setIsShaking(false);
		} catch (error) {
			Toast.error(getApiErrorString(error));
		}
	}, [trigger, fetchworkPrefernce, agentTimeline, setIsShaking]);

	return {
		updateWorkPreference,
		data,
		loading,
	};
}

export default useUpdateAgentWorkPreferences;
