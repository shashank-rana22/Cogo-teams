import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';
import { useEffect, useState, useCallback } from 'react';

const useQuestionList = ({
	topic = {},
	search = '',
	from,
	question,
	setQuestion,
	query_name = undefined,
}) => {
	const { general, profile } = useSelector((state) => ({
		general : state.general,
		profile : state.profile,
	}));

	const { auth_role_data = {}, partner = {} } = profile;
	const { scope = '' } = general || {};
	const { country_id = '', id = '' } = partner;

	const [page, setPage] = useState(1);

	const { role_functions = [], role_sub_functions = [] } = auth_role_data || {};

	const roleFunction = !isEmpty(role_functions) ? role_functions : undefined;

	const roleSubFunction = !isEmpty(role_sub_functions)
		? role_sub_functions
		: undefined;

	const [{ data, loading = false }, trigger] = useRequest({
		url    : '/list_faq_questions',
		method : 'get',
	}, { manual: true });

	const fetch = useCallback(
		async () => {
			try {
				await trigger({
					params: {
						filters: {
							status            : 'active',
							state             : 'published',
							faq_topic_id      : [topic?.id] || undefined,
							auth_function     : scope === 'partner' ? roleFunction : undefined,
							auth_sub_function : scope === 'partner' ? roleSubFunction : undefined,
							country_id,
							cogo_entity_id    : id,
							persona           : scope === 'partner' ? 'admin_user' : 'importer_exporter',
							q                 : search || query_name || undefined,
						},
						is_test_ongoing            : from === 'test_module' ? true : undefined,
						sort_by                    : 'view_count',
						page,
						faq_tags_data_required     : true,
						faq_topics_data_required   : true,
						related_questions_required : !!query_name,
					},
				});
			} catch (error) {
				if (error.response?.data) { Toast.error(getApiErrorString(error.response?.data)); }
			}
		},
		[country_id, id, page, query_name, roleFunction, roleSubFunction, scope, search, topic?.id, trigger, from],
	);

	useEffect(() => {
		if (question && !query_name) {
			return;
		}
		fetch();
	}, [fetch, page, query_name, question]);

	const { list = [], response_type, gpt_answer = '', show_more = '', ...pageData } = data || {};
	return {
		page,
		setPage,
		pageData,
		loading,
		list,
		question,
		setQuestion,
		response_type,
		gpt_answer,
		show_more,

	};
};

export default useQuestionList;
