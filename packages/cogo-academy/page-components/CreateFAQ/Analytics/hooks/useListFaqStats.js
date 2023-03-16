import { useDebounceQuery } from '@cogoport/forms';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';
import { useEffect, useState } from 'react';

function useListFaqStats({
	searchState = undefined,
	topicId = undefined,
	tagId = [],
	// limit = undefined,
	// sort = undefined,
}) {
	const [activeTab, setActiveTab] = useState('');
	const [page, setPage] = useState(1);

	const { general = {}, profile = {} } = useSelector((state) => state);

	const { auth_role_data = [], partner = {} } = profile;
	// const { role_functions = [], role_sub_functions = [] } = auth_role_data?.[0] || {};

	// const { scope = '' } = general;
	// const { country_id = '', id = '' } = partner;

	const [{ data, loading }, trigger] = useRequest({
		method : 'get',
		url    : 'list_faq_stats',
	}, { manual: true });

	const { query, debounceQuery } = useDebounceQuery();

	// const roleFunction = !isEmpty(role_functions) ? role_functions : undefined;
	// const roleSubFunction = !isEmpty(role_sub_functions) ? role_sub_functions : undefined;

	useEffect(() => {
		debounceQuery(searchState);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [searchState]);

	const fetchFaqStats = async () => {
		try {
			await trigger({
				params: {
					filters: {
						// state             : 'published',
						// status            : 'active',
						q            : query || undefined,
						faq_topic_id : topicId || undefined,
						faq_tag_id   : tagId || undefined,
						// auth_function     : scope === 'partner' ? roleFunction : undefined,
						// auth_sub_function : scope === 'partner' ? roleSubFunction : undefined,
						// country_id,
						// cogo_entity_id    : id,
						// persona           : scope === 'partner' ? 'admin_user' : 'importer_exporter',

					},
					// sort_by                             : sort,
					// page,
					page_limit                          : 1000 || undefined,
					most_viewed_questions_data_required : true,
					trending_tags_data_required         : true,
					trending_topics_data_required       : true,
					popular_questions_data_required     : true,
					unpopular_questions_data_required   : true,
					topic_wise_questions_data_required  : true,
					active_audiences_data_required      : true,
					question_stats_data_required        : true,
					get_data_required                   : false,
					get_pagination_data_required        : false,
				},
			});
		} catch (error) {
			console.log('error :: ', error);
		}
	};

	useEffect(() => {
		fetchFaqStats();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [page, query, topicId, JSON.stringify(tagId)]);

	const { page_limit, total_count } = data || {};

	const paginationData = { page_limit, total_count };

	return {
		refetchStats: fetchFaqStats,
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

export default useListFaqStats;
