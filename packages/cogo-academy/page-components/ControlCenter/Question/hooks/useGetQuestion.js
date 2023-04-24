import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';
import { useCallback } from 'react';

function useGetQuestion() {
	const { general = {}, profile = {} } = useSelector((state) => state);
	const { query = {} } = general;
	const { id = '' } = query || {};
	const { mode = '' } = query || {};
	const { auth_role_data = [], partner = {} } = profile;
	const { role_functions = {}, role_sub_functions = {} } = auth_role_data || {};

	const { scope = '' } = general;
	const { country_id = '' } = partner;
	const roleFunction = !isEmpty(role_functions) ? role_functions : undefined;
	const roleSubFunction = !isEmpty(role_sub_functions) ? role_sub_functions : undefined;

	const [{ data, loading }, trigger] = useRequest({
		method : 'get',
		url    : '/get_question',
	}, { manual: true });

	const fetchQuestion = useCallback(
		async () => {
			if (!id) return;

			try {
				await trigger({
					params: {
						auth_function     : scope === 'partner' ? roleFunction : undefined,
						auth_sub_function : scope === 'partner' ? roleSubFunction : undefined,
						country_id,
						cogo_entity_id    : partner?.id || undefined,
						persona           : scope === 'partner' ? 'admin_user' : 'importer_exporter',
						id,
						is_admin_view     : true,
					},
				});
			} catch (err) {
				console.log(err);
			}
		},
		[country_id, id, partner?.id, roleFunction, roleSubFunction, scope, trigger],
	);

	return { fetchQuestion, query, data, loading, mode };
}
export default useGetQuestion;
