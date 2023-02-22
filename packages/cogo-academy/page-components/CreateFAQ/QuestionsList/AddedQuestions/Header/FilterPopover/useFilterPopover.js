import { useRequest } from '@cogoport/request';
import { useState } from 'react';

const useFilterPopover = () => {
	const [showFilter, setShowFilter] = useState(false);

	const [{ data: topicsData }] = useRequest({
		method : 'get',
		url    : '/list_faq_topics',
		params : {
			page_limit               : 100000,
			pagination_data_required : false,
		},
	}, { manual: false });

	const [{ data: tagsData }] = useRequest({
		method : 'get',
		url    : '/list_faq_tags',
		params : {
			page_limit               : 100000,
			pagination_data_required : false,
		},
	}, { manual: false });

	const { list: topicList = [] } = topicsData || {};
	const { list : tagList = [] } = tagsData || {};

	const topicOptions = [];
	const tagOptions = [];

	(topicList || []).forEach((item) => {
		topicOptions.push({ label: item?.display_name, value: item?.name });
	});

	(tagList || []).forEach((item) => {
		tagOptions.push({ label: item?.display_name, value: item?.name });
	});

	return {
		showFilter,
		setShowFilter,
		topicOptions,
		tagOptions,
	};
};

export default useFilterPopover;
