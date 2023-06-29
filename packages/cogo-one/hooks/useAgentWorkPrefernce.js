import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useEffect, useCallback, useState } from 'react';

import getViewType from '../helpers/getViewType';

function useAgentWorkPrefernce() {
	const { userRoleIds, userId, authRoleData } = useSelector(({ profile }) => ({
		userRoleIds  : profile.partner?.user_role_ids || [],
		userId       : profile?.user?.id,
		authRoleData : profile?.auth_role_data,
	}));

	const [viewType, setViewType] = useState('');

	const [{ loading }, trigger] = useRequest({
		url    : '/get_agent_work_preference',
		method : 'get',
	}, { manual: true });

	const viewTypeFromRoleIds = getViewType({ userRoleIds, userId, authRoleData });

	const fetchworkPrefernce = useCallback(async () => {
		try {
			const res = await trigger();
			const agentType = res?.data?.agent_type;

			if (viewTypeFromRoleIds === 'cogoone_admin') {
				setViewType(viewTypeFromRoleIds);
			} else {
				setViewType(agentType);
			}
		} catch (error) {
			console.error(error);
		}
	}, [trigger, viewTypeFromRoleIds]);

	useEffect(() => {
		fetchworkPrefernce();
	}, [fetchworkPrefernce]);

	return {
		viewType,
		loading,
	};
}
export default useAgentWorkPrefernce;
