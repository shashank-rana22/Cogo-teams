import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';
import { useEffect, useCallback } from 'react';

const useAnswer = ({ question }) => {
	const { general = {}, profile = {} } = useSelector((state) => state);
	const { auth_role_data = {}, partner = {} } = profile;
	const { scope = '' } = general || {};
	const { country_id = '', id : cogo_entity_id = '' } = partner;
	const { role_functions = [], role_sub_functions = [] } = auth_role_data || {};

	const roleFunction = !isEmpty(role_functions) ? role_functions : undefined;

	const roleSubFunction = !isEmpty(role_sub_functions)
		? role_sub_functions
		: undefined;

	const [{ data, loading }, trigger] = useRequest({
		url    : '/get_question',
		method : 'get',
	}, { manual: true });
	const fetch = useCallback(async () => {
		try {
			await trigger({
				params: {
					id                : question?.id,
					auth_function     : scope === 'partner' ? roleFunction : undefined,
					auth_sub_function : scope === 'partner' ? roleSubFunction : undefined,
					country_id,
					cogo_entity_id,
					persona           : scope === 'partner' ? 'admin_user' : 'importer_exporter',
					platform          : scope === 'partner' ? 'admin' : 'app',
				},
			});
		} catch (error) {
			Toast.error(error?.message);
		}
	}, [cogo_entity_id, country_id, question?.id, roleFunction, roleSubFunction, scope, trigger]);

	useEffect(() => {
		fetch();
	}, [fetch]);

	return {
		data,
		loading,
		fetch,
	};
};

export default useAnswer;
