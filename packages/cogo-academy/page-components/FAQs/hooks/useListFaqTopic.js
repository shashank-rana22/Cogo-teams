import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';
import { useEffect, useState } from 'react';

function useListFaqTopic() {
	const { general = {}, profile = {} } = useSelector((state) => state);

	const { auth_role_data = {}, partner = {} } = profile;
	const { role_functions = [], role_sub_functions = [] } = auth_role_data || {};

	const { scope = '', query } = general;
	const { country_id = '', id = '' } = partner;

	const { topicId = '' } = query || {};
	const [activeTab, setActiveTab] = useState(topicId || 'All Topics');

	const [{ data, loading }, trigger] = useRequest({
		method : 'get',
		url    : '/list_faq_topics',
	}, { manual: true });

	const roleFunction = !isEmpty(role_functions) ? role_functions : undefined;
	const roleSubFunction = !isEmpty(role_sub_functions) ? role_sub_functions : undefined;

	const fetchFaqTopic = async () => {
		try {
			await trigger({
				params: {
					filters: {
						status            : 'active',
						auth_function     : scope === 'partner' ? roleFunction : undefined,
						auth_sub_function : scope === 'partner' ? roleSubFunction : undefined,
						country_id,
						cogo_entity_id    : id,
						persona           : scope === 'partner' ? 'admin_user' : 'importer_exporter',
					},
					page_limit               : 100000,
					pagination_data_required : false,
				},
			});
		} catch (error) {
			console.log('error :: ', error);
		}
	};

	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(() => { fetchFaqTopic(); }, []);

	return {
		refetchTopic: fetchFaqTopic,
		data,
		loading,
		activeTab,
		setActiveTab,
	};
}

export default useListFaqTopic;
