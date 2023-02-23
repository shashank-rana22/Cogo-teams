import { useRequest } from '@cogoport/request';

const useGetTopicTagList = () => {
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
		topicOptions.push({ label: item?.display_name, value: item?.id });
	});

	(tagList || []).forEach((item) => {
		tagOptions.push({ label: item?.display_name, value: item?.id });
	});

	return {
		topicOptions,
		tagOptions,
	};
};

export default useGetTopicTagList;
