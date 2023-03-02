import { useDebounceQuery } from '@cogoport/forms';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useEffect, useState } from 'react';

function useListFaqQuestions({
	searchState = '',
	topicId = undefined,
	sort = false,
	tagId = [],
	limit = undefined,
}) {
	const [activeTab, setActiveTab] = useState('');
	const [page, setPage] = useState(1);
	const SORT_MODE = ((sort) ? 'view_count' : 'created_at');

	const { general = {}, profile = {} } = useSelector((state) => state);

	const { auth_role_data = [], partner = {} } = profile;
	const { role_functions = [], role_sub_functions = [] } = auth_role_data?.[0] || {};

	const { scope = '' } = general;
	const { country_id = '', id = '' } = partner;

	const [{ data, loading }, trigger] = useRequest({
		method : 'get',
		url    : 'list_faq_questions',
	}, { manual: true });

	const { query, debounceQuery } = useDebounceQuery();

	useEffect(() => {
		debounceQuery(searchState);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [searchState]);

	const fetchFaqQuestions = async () => {
		try {
			await trigger({
				params: {
					filters: {
						state             : 'published',
						status            : 'active',
						q                 : query,
						faq_topic_id      : topicId,
						faq_tag_id        : tagId,
						auth_function     : scope === 'partner' ? role_functions : undefined,
						auth_sub_function : scope === 'partner' ? role_sub_functions : undefined,
						country_id,
						cogo_entity_id    : id,
						persona           : scope === 'partner' ? 'admin_user' : 'importer_exporter',

					},
					sort_by    : SORT_MODE,
					page,
					page_limit : limit || undefined,
				},
			});
		} catch (error) {
			console.log('error ::: ', error);
		}
	};

	useEffect(() => {
		fetchFaqQuestions();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [page, query, topicId, JSON.stringify(tagId)]);

	const { page_limit, total_count } = data || {};

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
	};
}

export default useListFaqQuestions;
