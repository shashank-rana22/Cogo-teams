import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';
import { useEffect, useState } from 'react';

function useListFaqQuestions({
	searchState = undefined,
	topicId = undefined,
	tagId = [],
	limit = undefined,
	sort = undefined,
	query_name = undefined,
}) {
	const [activeTab, setActiveTab] = useState('');
	const [page, setPage] = useState(1);

	const { general = {}, profile = {} } = useSelector((state) => state);

	const { auth_role_data = [], partner = {} } = profile;
	const { role_functions = {}, role_sub_functions = {} } = auth_role_data || {};

	const { scope = '' } = general;
	const { country_id = '', id = '' } = partner;

	const [{ data, loading }, trigger] = useRequest({
		method : 'get',
		url    : '/list_faq_questions',
	}, { manual: true });

	const roleFunction = !isEmpty(role_functions) ? role_functions : undefined;
	const roleSubFunction = !isEmpty(role_sub_functions) ? role_sub_functions : undefined;

	const fetchFaqQuestions = async () => {
		try {
			await trigger({
				params: {
					filters: {
						state             : 'published',
						status            : 'active',
						q                 : searchState || query_name || undefined,
						faq_topic_id      : topicId || undefined,
						faq_tag_id        : tagId || undefined,
						auth_function     : scope === 'partner' ? roleFunction : undefined,
						auth_sub_function : scope === 'partner' ? roleSubFunction : undefined,
						country_id,
						cogo_entity_id    : id,
						persona           : scope === 'partner' ? 'admin_user' : 'importer_exporter',

					},
					sort_by                    : sort,
					page,
					page_limit                 : limit || undefined,
					faq_tags_data_required     : !query_name,
					answers_data_required      : !query_name,
					related_questions_required : !!query_name,

				},
			});
		} catch (error) {
			console.log('error ::: ', error);
		}
	};

	useEffect(() => {
		fetchFaqQuestions();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [page, searchState, topicId, JSON.stringify(tagId)]);

	const { page_limit, response_type, gpt_answer = '', show_more = '', total_count } = data || {};

	const paginationData = { page_limit, total_count };

	return {
		refetchQuestions: fetchFaqQuestions,
		page,
		setPage,
		paginationData,
		data,
		loading,
		activeTab,
		setActiveTab,
		topicId,
		response_type,
		gpt_answer,
		show_more,
	};
}

export default useListFaqQuestions;
