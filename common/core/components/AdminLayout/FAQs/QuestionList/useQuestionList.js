import { Toast } from '@cogoport/components';
import { useDebounceQuery } from '@cogoport/forms';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';
import { useEffect, useState, useCallback } from 'react';

const useQuestionList = ({
	topic = {},
	search = '',
	question,
	setQuestion,
}) => {
	const { general = {}, profile = {} } = useSelector((state) => state);
	const { auth_role_data = {}, partner = {} } = profile;
	const { scope = '' } = general || {};
	const { country_id = '', id = '' } = partner;

	const { query = '', debounceQuery } = useDebounceQuery();

	const [page, setPage] = useState(1);

	const { role_functions = [], role_sub_functions = [] } = auth_role_data || {};

	const roleFunction = !isEmpty(role_functions) ? role_functions : undefined;

	const roleSubFunction = !isEmpty(role_sub_functions)
		? role_sub_functions
		: undefined;

	const [{ data, loading }, trigger] = useRequest({
		url    : '/list_faq_questions',
		method : 'get',
	}, { manual: true });

	useEffect(() => {
		debounceQuery(search);
	}, [debounceQuery, search]);

	const fetch = useCallback(
		async () => {
			try {
				await trigger({
					params: {
						filters: {
							status        : 'active',
							state         : 'published',
							faq_topic_id  : [topic?.id] || undefined,
							auth_function : scope === 'partner' ? roleFunction : undefined,
							auth_sub_function:
							scope === 'partner' ? roleSubFunction : undefined,
							country_id,
							cogo_entity_id : id,
							persona        : scope === 'partner' ? 'admin_user' : 'importer_exporter',
							q              : query || undefined,
						},
						sort_by                  : 'view_count',
						page,
						faq_tags_data_required   : true,
						faq_topics_data_required : true,
					},
				});
			} catch (error) {
				Toast.error(error);
			}
		},
		[country_id, id, page, query, roleFunction, roleSubFunction, scope, topic?.id, trigger],
	);

	useEffect(() => {
		fetch();
	}, [fetch, page, query]);

	useEffect(() => {
		if (search && question) {
			setQuestion(null);
		}
	}, [question, search, setQuestion]);

	const { list = [], ...pageData } = data || {};

	return {
		page,
		setPage,
		pageData,
		loading,
		list,
		question,
		setQuestion,
	};
};

export default useQuestionList;
