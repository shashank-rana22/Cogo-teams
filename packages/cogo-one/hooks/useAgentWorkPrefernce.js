import { useRequest } from '@cogoport/request';
import { useSelector, useDispatch } from '@cogoport/store';
import { setProfileState } from '@cogoport/store/reducers/profile';
import { useEffect, useCallback, useState } from 'react';

import getViewType from '../helpers/getViewType';
import getViewTypeFromWorkPreferences from '../utils/getViewTypeFromWorkPreferences';

function useAgentWorkPrefernce() {
	const { userRoleIds = [], userId = '', authRoleData = {} } = useSelector(({ profile }) => ({
		userRoleIds  : profile.partner?.user_role_ids || [],
		userId       : profile?.user?.id,
		authRoleData : profile?.auth_role_data,
	}));

	const dispatch = useDispatch();

	const [viewType, setViewType] = useState('');
	const [userSharedMails, setUserSharedMails] = useState([]);

	const [{ loading, data }, trigger] = useRequest({
		url    : '/get_agent_work_preference',
		method : 'get',
	}, { manual: true });

	const viewTypeFromRoleIds = getViewType({ userRoleIds, userId, authRoleData });

	const fetchworkPrefernce = useCallback(async () => {
		let res;
		try {
			res = await trigger();
			dispatch(
				setProfileState({
					cogoone_agent_type: res?.data?.agent_type,
				}),
			);
		} catch (error) {
			console.error(error);
		} finally {
			const viewTypeValue = getViewTypeFromWorkPreferences(
				{ viewTypeFromRoleIds, agentType: res?.data?.agent_type },
			);
			setUserSharedMails(res?.data?.emails || []);
			setViewType(viewTypeValue);
		}
	}, [dispatch, trigger, viewTypeFromRoleIds]);

	useEffect(() => {
		fetchworkPrefernce();
	}, [fetchworkPrefernce]);

	return {
		viewType,
		loading,
		userSharedMails,
		fetchworkPrefernce,
		agentStatus: data,
	};
}
export default useAgentWorkPrefernce;
