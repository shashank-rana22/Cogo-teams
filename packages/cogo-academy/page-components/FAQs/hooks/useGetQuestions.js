import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';
import { useEffect, useCallback } from 'react';

function useGetQuestions({ id }) {
	const { general = {}, profile = {} } = useSelector((state) => state);

	const { auth_role_data = [], partner = {}, platform = '' } = profile;
	const { role_functions = {}, role_sub_functions = {} } = auth_role_data || {};

	const { scope = '' } = general;
	const { country_id = '' } = partner;
	const roleFunction = !isEmpty(role_functions) ? role_functions : undefined;
	const roleSubFunction = !isEmpty(role_sub_functions) ? role_sub_functions : undefined;
	const [{ data, loading }, trigger] = useRequest({
		method : 'get',
		url    : '/get_question',
	}, { manual: true });

	const fetchQuestions = useCallback(async () => {
		try {
			await trigger({
				params: {
					auth_function     : scope === 'partner' ? roleFunction : undefined,
					auth_sub_function : scope === 'partner' ? roleSubFunction : undefined,
					country_id,
					platform,
					cogo_entity_id    : partner?.id || undefined,
					persona           : scope === 'partner' ? 'admin_user' : 'importer_exporter',
					id,
				},
			});
		} catch (error) {
			if (error.response?.data) { Toast.error(getApiErrorString(error.response?.data)); }
		}
	}, [country_id, id, partner?.id, platform, roleFunction, roleSubFunction, scope, trigger]);

	useEffect(() => {
		if (id) {
			fetchQuestions();
		}
	}, [fetchQuestions, id]);

	return {
		refetchQuestions: fetchQuestions,
		data,
		loading,
	};
}

export default useGetQuestions;
