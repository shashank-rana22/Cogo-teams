import { useRequest } from '@cogoport/request';
import { startCase } from '@cogoport/utils';
import { useEffect, useState } from 'react';

function useListFaqTag() {
	const [activeTab, setActiveTab] = useState('');

	const [{ data, loading }, trigger] = useRequest({
		method : 'get',
		url    : '/list_faq_tags',
	}, { manual: true });

	const fetchFaqTag = async () => {
		try {
			await trigger({
				params: {
					filters: {
						status: 'active',
					},
					sort_by                  : 'view_count',
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

	const options = (data?.list || []).map((item) => ({
		key      : item.id,
		children : startCase(item?.display_name),
	}));

	return {
		refetchTag: fetchFaqTag,
		data,
		loading,
		activeTab,
		setActiveTab,
		options,
	};
}

export default useListFaqTag;
