import { useForm } from '@cogoport/forms';
import { useRequest } from '@cogoport/request';
import { useState } from 'react';

const useFilterPopover = ({ setFilters }) => {
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

	const { control, handleSubmit } = useForm();

	const onSubmit = (values) => {
		setFilters({
			tag_id   : values?.tag,
			topic_id : values?.topic,
		});

		setShowFilter(false);
	};

	const { list: topicList = [] } = topicsData || {};
	const { list : tagList = [] } = tagsData || {};

	const topicOptions = (topicList || []).map((item) => ({
		label : item?.display_name,
		value : item?.id,
	}));

	const tagOptions = (tagList || []).map((item) => ({
		label : item?.display_name,
		value : item?.id,
	}));

	const onClickReset = () => {
		setFilters({});
		setShowFilter(false);
	};

	return {
		showFilter,
		setShowFilter,
		topicOptions,
		tagOptions,
		control,
		handleSubmit,
		onSubmit,
		onClickReset,
	};
};

export default useFilterPopover;
