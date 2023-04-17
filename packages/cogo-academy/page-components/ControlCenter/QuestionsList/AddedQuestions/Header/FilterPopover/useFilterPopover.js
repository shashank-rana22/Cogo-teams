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
			is_admin_view            : true,
			filters                  : {
				status: 'active',
			},
		},
	}, { manual: false });

	const [{ data: tagsData }] = useRequest({
		method : 'get',
		url    : '/list_faq_tags',
		params : {
			page_limit               : 100000,
			pagination_data_required : false,
			filters                  : {
				status: 'active',
			},
		},
	}, { manual: false });

	const [{ data: audienceData }] = useRequest({
		method : 'get',
		url    : '/list_faq_audiences',
		params : {
			page_limit               : 100000,
			pagination_data_required : false,
			filters                  : {
				status: 'active',
			},
		},
	}, { manual: false });

	const { control, handleSubmit, reset } = useForm();

	const onSubmit = (values) => {
		setFilters({
			faq_tag_id   : values?.tag,
			faq_topic_id : values?.topic,
			audience_id  : values?.audience,
		});

		setShowFilter(false);
	};

	const { list: topicList = [] } = topicsData || {};
	const { list : tagList = [] } = tagsData || {};
	const { list: audienceList = [] } = audienceData || {};

	const topicOptions = (topicList || []).map((item) => ({
		label : item?.display_name,
		value : item?.id,
	}));

	const tagOptions = (tagList || []).map((item) => ({
		label : item?.display_name,
		value : item?.id,
	}));

	const audienceOptions = (audienceList || []).map((item) => ({
		label : item?.name,
		value : item?.id,
	}));

	const onClickReset = () => {
		setFilters({});
		setShowFilter(false);
		reset();
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
		audienceOptions,
		reset,
	};
};

export default useFilterPopover;
