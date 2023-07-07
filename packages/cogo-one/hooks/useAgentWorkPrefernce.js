import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useEffect, useCallback, useState } from 'react';

import getViewType from '../helpers/getViewType';

const PERSONA_KEYS_MAPPING = ['sales', 'supply', 'support', 'shipment_specialist'];

const getViewTypeFromWorkPreferences = ({ viewTypeFromRoleIds, agentType }) => {
	if (viewTypeFromRoleIds === 'cogoone_admin') {
		return viewTypeFromRoleIds;
	}

	if (agentType.includes('admin')) {
		return agentType;
	}

	return PERSONA_KEYS_MAPPING.find((eachPersona) => agentType.includes(eachPersona)) || '';
};

function useAgentWorkPrefernce() {
	const { userRoleIds, userId, authRoleData } = useSelector(({ profile }) => ({
		userRoleIds  : profile.partner?.user_role_ids || [],
		userId       : profile?.user?.id,
		authRoleData : profile?.auth_role_data,
	}));

	const [viewType, setViewType] = useState('');

	const [{ loading, data }, trigger] = useRequest({
		url    : '/get_agent_work_preference',
		method : 'get',
	}, { manual: true });

	const viewTypeFromRoleIds = getViewType({ userRoleIds, userId, authRoleData });

	const fetchworkPrefernce = useCallback(async () => {
		try {
			const res = await trigger();

			const viewTypeValue = getViewTypeFromWorkPreferences(
				{ viewTypeFromRoleIds, agentType: res?.data?.agent_type },
			);
			setViewType(viewTypeValue);
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
		fetchworkPrefernce,
		agentStatus: data,
	};
}
export default useAgentWorkPrefernce;
