import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useEffect, useState } from 'react';

const useTopicList = () => {
	const { general = {}, profile = {} } = useSelector((state) => state);
	const { auth_role_data = [], partner = {} } = profile;
	const { scope = '' } = general || {};
	const { country_id = '', id = '' } = partner;

	const [search, setSearch] = useState('');
	const [topic, setTopic] = useState('');
	const [page, setPage] = useState(1);
	const [question, setQuestion] = useState(null);

	const { role_functions = [], role_sub_functions = [] } = auth_role_data?.[0] || {};

	const [{ data, loading }, trigger] = useRequest({
		url    : 'list_faq_topics',
		method : 'get',
	}, { manual: true });

	const fetch = async () => {
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
					page_limit : 6,
				},
			});
		} catch (error) {
			// eslint-disable-next-line no-console
			console.log('error :: ', error);
		}
	};

	useEffect(() => {
		fetch();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [page]);

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
	};
};

export default useTopicList;
