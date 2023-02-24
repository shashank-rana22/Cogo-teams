import { useRequest } from '@cogoport/request';
import { useEffect, useState } from 'react';

function useListFaqTag() {
	const [activeTab, setActiveTab] = useState('');

	const [{ data, loading }, trigger] = useRequest({
		method : 'get',
		url    : 'faq/list_faq_tags',
	}, { manual: true });

	const fetchFaqTag = async () => {
		try {
			await trigger({
				params: {
					filters: {
						status: 'active',
					},
					page_limit               : 15,
					pagination_data_required : false,
				},
			});
		} catch (error) {
			console.log('error :: ', error);
		}
	};

	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(() => { fetchFaqTag(); }, []);

	return {
		refetchTag: fetchFaqTag,
		data,
		loading,
		activeTab,
		setActiveTab,
	};
}

export default useListFaqTag;
