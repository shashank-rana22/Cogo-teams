import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useEffect, useState } from 'react';

function useMostReadFAQs() {
	const [activeTab, setActiveTab] = useState('');

	const [{ data, loading }, trigger] = useRequest({
		method : 'get',
		url    : 'list_faq_questions',
	}, { manual: true });

	const { general = {}, profile = {} } = useSelector((state) => state);

	const { auth_role_data = [], partner = {} } = profile;
	const { role_functions = [], role_sub_functions = [] } = auth_role_data?.[0] || {};

	const { scope = '' } = general;
	const { country_id = '', id = '' } = partner;

	const fetchMostReadFAQs = async () => {
		try {
			await trigger({
				params: {
					filters: {
						state             : 'published',
						status            : 'active',
						auth_function     : scope === 'partner' ? role_functions : undefined,
						auth_sub_function : scope === 'partner' ? role_sub_functions : undefined,
						country_id,
						cogo_entity_id    : id,
						persona           : scope === 'partner' ? 'admin_user' : 'importer_exporter',

					},
					sort_by: 'view_count',

				},
			});
		} catch (error) {
			console.log('error :: ', error);
		}
	};

	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(() => { fetchMostReadFAQs(); }, []);

	return {
		refetchMostReadFAQs: fetchMostReadFAQs,
		data,
		loading,
		activeTab,
		setActiveTab,
	};
}

export default useMostReadFAQs;
