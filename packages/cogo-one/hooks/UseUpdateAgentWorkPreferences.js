import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useCallback, useEffect } from 'react';

const currentDateTime = new Date();

const getPayload = ({ type }) => ({
	status         : type,
	validity_start : type === 'punched_in' ? currentDateTime : undefined,
	validity_end   : type === 'punched_out' ? currentDateTime : undefined,
});

function useUpdateAgentWorkPreferences({ fetchworkPrefernce = () => {} }) {
	const [{ data, loading }, trigger] = useRequest({
		url    : '/update_agent_work_preference',
		method : 'post',
	}, { manual: true });

	const updateWorkPreference = useCallback(async ({ type = '' }) => {
		try {
			await trigger({
				data: getPayload({ type }),
			});
			fetchworkPrefernce();
		} catch (error) {
			Toast.error(getApiErrorString(error));
		}
	}, [trigger, fetchworkPrefernce]);

	useEffect(() => {
		updateWorkPreference({});
	}, [updateWorkPreference]);

	return {
		updateWorkPreference,
		data,
		loading,
	};
}

export default useUpdateAgentWorkPreferences;
