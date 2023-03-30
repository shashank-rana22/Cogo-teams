import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useEffect, useState, useCallback } from 'react';

const useTopicList = () => {
	const { general = {}, profile = {} } = useSelector((state) => state);
	const { auth_role_data = {}, partner = {} } = profile;
	const { scope = '' } = general || {};
	const { country_id = '', id = '' } = partner;

	const [search, setSearch] = useState('');
	const [topic, setTopic] = useState('');
	const [page, setPage] = useState(1);
	const [question, setQuestion] = useState(null);
	const [showHistory, setShowHistory] = useState(false);
	const [showNotificationContent, setShowNotificationContent] = useState(false);

	const { role_functions = [], role_sub_functions = [] } = auth_role_data || {};

	const [{ data, loading }, trigger] = useRequest({
		url    : '/list_faq_topics',
		method : 'get',
	}, { manual: true });

	const fetch = useCallback(async () => {
		try {
			await trigger({
				params: {
					filters: {
						status        : 'active',
						state         : 'published',
						auth_function : scope === 'partner' ? role_functions : undefined,
						auth_sub_function:
							scope === 'partner' ? role_sub_functions : undefined,
						country_id,
						cogo_entity_id : id,
						persona        : scope === 'partner' ? 'admin_user' : 'importer_exporter',
					},
					sort_by    : 'view_count',
					page,
					page_limit : 20,
				},
			});
		} catch (error) {
			Toast.error(error?.message);
		}
	}, [country_id, id, page, role_functions, role_sub_functions, scope, trigger]);

	useEffect(() => {
		fetch();
	}, [fetch, page]);

	const { list, ...paginationData } = data || {};

	return {
		search,
		setSearch,
		list,
		paginationData,
		loading,
		page,
		setPage,
		topic,
		setTopic,
		question,
		setQuestion,
		showHistory,
		setShowHistory,
		setShowNotificationContent,
		showNotificationContent,
	};
};

export default useTopicList;
