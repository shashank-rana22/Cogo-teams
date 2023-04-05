import { Pill } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { startCase } from '@cogoport/utils';
import { useCallback } from 'react';

import WORK_SCOPES_OPTIONS from '../../ConfigurationEngine/CreateAudienceForm/utils/workScopeMappings';

// eslint-disable-next-line import/no-unresolved
import countries from '@/data-store/constants/countries.json';

const useGetTopicTagList = () => {
	const [{ data: topicsData, loading:listTopicsLoading }, triggerTopics] = useRequest({
		method : 'get',
		url    : '/list_faq_topics',
	}, { manual: true });

	const [{ data: tagsData, loading:listTagsLoading }, triggerTags] = useRequest({
		method : 'get',
		url    : '/list_faq_tags',
	}, { manual: true });

	const [{ data: audienceData, loading:listAudienceLoading }, triggerAudiences] = useRequest({
		method : 'get',
		url    : '/list_faq_audiences',
	}, { manual: true });

	const fetchTopics = useCallback(async () => {
		try {
			await triggerTopics({
				params: {
					page_limit               : 100000,
					pagination_data_required : false,
					is_admin_view            : true,
				},
			});
		} catch (error) {
			console.log('error :: ', error);
		}
	}, [triggerTopics]);

	const fetchTags = useCallback(async () => {
		try {
			await triggerTags({
				params: {
					page_limit               : 100000,
					pagination_data_required : false,
				},
			});
		} catch (error) {
			console.log('error :: ', error);
		}
	}, [triggerTags]);

	const fetchAudiences = useCallback(async () => {
		try {
			await triggerAudiences({
				params: {
					page_limit               : 100000,
					pagination_data_required : false,
				},
			});
		} catch (error) {
			console.log('error :: ', error);
		}
	}, [triggerAudiences]);

	const { list: topicList = [] } = topicsData || {};
	const { list : tagList = [] } = tagsData || {};
	const { list: audienceList = [] } = audienceData || {};

	const topicOptions = [];
	const tagOptions = [];
	const audienceOptions = [];

	const getAudienceOption = (item) => {
		const {
			auth_function = '',
			auth_sub_function = '',
			cogo_entity_name = '',
			name = '',
			platform = '',
			work_scope = '',
			country_id = '',
		} = item || {};

		const workScopeLabel = (WORK_SCOPES_OPTIONS || []).find((workScope) => workScope.value === work_scope);
		const selectedCountry = countries.find((country) => country.id === country_id);

		const pillsObject = {
			work_scope   : workScopeLabel?.label,
			function     : auth_function || 'all',
			sub_function : startCase(auth_sub_function) || 'all',
			cogo_entity_name,
			platform     : startCase(platform),
			country      : selectedCountry?.name,
		};

		const pillsArray = Object.keys(pillsObject);

		const label = (
			<div>
				<div style={{ fontWeight: 600, paddingTop: '4px', paddingBottom: '6px' }}>{startCase(name)}</div>
				{(pillsArray || []).map((ele) => (pillsObject[ele]
					&& (
						<Pill color="blue">
							{['all', 'All'].includes(pillsObject[ele])
								? `${startCase(ele)} - ${startCase(pillsObject[ele])}`
								: startCase(pillsObject[ele]) }
						</Pill>
					)))}
			</div>
		);
		const q = `${item.name || ''}-${pillsArray.join('-')}`;
		const value = item.id;

		return { label, q, value };
	};

	(topicList || []).forEach((item) => {
		topicOptions.push({ label: item?.display_name, value: item?.id });
	});

	(tagList || []).forEach((item) => {
		tagOptions.push({ label: item?.display_name, value: item?.id });
	});

	(audienceList || []).forEach((item) => {
		audienceOptions.push(getAudienceOption(item));
	});

	return {
		topicOptions,
		tagOptions,
		audienceOptions,
		fetchTopics,
		fetchTags,
		fetchAudiences,
		listTopicsLoading,
		listTagsLoading,
		listAudienceLoading,
	};
};

export default useGetTopicTagList;
