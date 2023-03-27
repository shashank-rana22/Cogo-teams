import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';
import { useEffect } from 'react';

function useGetQuestions({ id }) {
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
		method : 'get',
		url    : '/get_question',
	}, { manual: true });

	const fetchQuestions = async () => {
		try {
			await trigger({
				params: {
					id,

					auth_function     : scope === 'partner' ? roleFunction : undefined,
					auth_sub_function : scope === 'partner' ? roleSubFunction : undefined,
					country_id,
					cogo_entity_id,
					persona           : scope === 'partner' ? 'admin_user' : 'importer_exporter',
					platform          : scope === 'partner' ? 'admin' : 'app',

				},
			});
		} catch (error) {
			console.log('error :: ', error);
		}
	};

	useEffect(() => {
		fetchQuestions();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id]);

	return {
		refetchQuestions: fetchQuestions,
		data,
		loading,
	};
}

export default useGetQuestions;
