import { useAllocationRequest } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';
import { useEffect } from 'react';

import getChannelsFromRoleSubFunctions from '../../helpers/get-channels-from-role-sub-functions';
import getFormValuesFromData from '../../helpers/get-form-values-from-data';

const useGetDefaultFormValues = (props) => {
	const { ref } = props;

	const { current: { container } = {} } = ref || {};

	console.log('container :: ', container);

	const { objectiveId = '', role = {}, user = {}, partner = {} } = container || {};

	const [{ data, loading }, trigger] = useAllocationRequest({
		url     : '/objective_details',
		method  : 'GET',
		authkey : 'get_allocation_objective_details',
	}, { manual: true });

	useEffect(() => {
		if (!isEmpty(objectiveId)) {
			trigger({ params: { objective_id: objectiveId } });
		}
	}, [objectiveId, trigger]);

	let defaultFormValues = {
		generalConfiguration  : { selectMode: 'select_all', user_ids: [] },
		objectiveRequirements : {},
	};

	if (!isEmpty(role) && !isEmpty(user) && !isEmpty(partner)) {
		defaultFormValues = {
			generalConfiguration: {
				selectMode : 'select_only',
				roles      : [role],
				user_ids   : [user.id],
				partner,
				channels   : getChannelsFromRoleSubFunctions({ role_sub_functions: role.role_sub_functions }),
			},
			objectiveRequirements: {},
		};
	}

	if (!isEmpty(objectiveId)) {
		defaultFormValues = getFormValuesFromData({ data: data?.data });
	}

	return {
		defaultFormValues,
		loading,
	};
};

export default useGetDefaultFormValues;
