import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';
import { useCallback, useMemo, useEffect } from 'react';

const useAnswer = ({ question, setIsLiked, FEEDBACK_MAPPING_ISLIKED }) => {
	const { general = {}, profile = {} } = useSelector((state) => state);

	const { auth_role_data = [], partner = {}, platform = '' } = profile;
	const { role_functions = {}, role_sub_functions = {} } = auth_role_data || {};

	const { scope = '' } = general;
	const { country_id = '', id = '' } = partner;
	const roleFunction = !isEmpty(role_functions) ? role_functions : undefined;
	const roleSubFunction = !isEmpty(role_sub_functions) ? role_sub_functions : undefined;
	const params = useMemo(
		() => ({
			auth_function     : scope === 'partner' ? roleFunction : undefined,
			auth_sub_function : scope === 'partner' ? roleSubFunction : undefined,
			platform,
			country_id,
			cogo_entity_id    : id,
			persona           : scope === 'partner' ? 'admin_user' : 'importer_exporter',

			id: question?.id,

		}),
		[country_id, id, platform, question?.id, roleFunction, roleSubFunction, scope],
	);

	const [{ data, loading }, trigger] = useRequest({
		url    : '/get_question',
		method : 'get',
		params,
	}, { manual: false });

	const fetch = useCallback(async () => {
		try {
			const res = await trigger({
				params,
			});

			const { is_positive } = res?.data?.answers?.[0]?.faq_feedbacks?.[0] || {};
			setIsLiked(FEEDBACK_MAPPING_ISLIKED[is_positive] || '');
		} catch (error) {
			if (error.response?.data) { Toast.error(getApiErrorString(error.response?.data)); }
		}
	}, [FEEDBACK_MAPPING_ISLIKED, params, setIsLiked, trigger]);

	useEffect(() => { fetch(); }, [fetch]);

	return {
		data,
		loading,
		fetch,
	};
};

export default useAnswer;
