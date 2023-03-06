import { Pill } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { startCase } from '@cogoport/utils';
import { useEffect } from 'react';

import WORK_SCOPES_OPTIONS from '../../ConfigurationEngine/CreateAudienceForm/utils/workScopeMappings';
import useListCogoEntity from '../../ConfigurationEngine/hooks/useListCogoEntities';
/* eslint-disable */
import countries from '../../../../../../.data-store/constants/countries.json';

const useGetTopicTagList = () => {
	const [{ data: topicsData , loading:listTopicsLoading }, triggerTopics] = useRequest({
		method : 'get',
		url    : '/list_faq_topics',
		params : {
			page_limit               : 100000,
			pagination_data_required : false,
		},
	}, { manual: false });

	const [{ data: tagsData ,loading:listTagsLoading}, triggerTags] = useRequest({
		method : 'get',
		url    : '/list_faq_tags',
		params : {
			page_limit               : 100000,
			pagination_data_required : false,
		},
	}, { manual: false });

	const [{ data: audienceData, loading:listAudienceLoading }, triggerAudiences] = useRequest({
		method : 'get',
		url    : '/list_faq_audiences',
		params : {
			page_limit               : 100000,
			pagination_data_required : false,
		},
	}, { manual: false });

	const fetchTopics = async () => {
		try {
			await triggerTopics({
				params: {
					page_limit               : 100000,
					pagination_data_required : false,
				},
			});
		} catch (error) {
			console.log('error :: ', error);
		}
	};

	const fetchTags = async () => {
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
	};

	const fetchAudiences = async () => {
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
	};

	useEffect(() => {
		fetchTopics();
		fetchTags();
		fetchAudiences();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const { list: topicList = [] } = topicsData || {};
	const { list : tagList = [] } = tagsData || {};
	const { list: audienceList = [] } = audienceData || {};

	const topicOptions = [];
	const tagOptions = [];
	const audienceOptions = [];

	const { entity_data } = useListCogoEntity();

	const getAudienceOption = (item) => {
		const {
			auth_function = '',
			auth_sub_function = '',
			cogo_entity_id = '',
			name = '',
			platform = '',
			work_scope = '',
			country_id = '',
		} = item || {};

		const workScopeLabel = (WORK_SCOPES_OPTIONS || []).find((workScope) => workScope.value === work_scope);
		const cogoEntityLabel = (entity_data || []).find((cogoEntity) => cogoEntity.id === cogo_entity_id);
		const selectedCountry = countries.find((country)=> country.id===country_id)

		const pillsArray = [
			workScopeLabel?.label,
			auth_function||'All',
			startCase(auth_sub_function)||'All',
			cogoEntityLabel?.business_name,
			startCase(platform),
			selectedCountry?.name];


		const label = (
			<div>
				<div style={{ fontWeight: 600, paddingTop:'4px', paddingBottom:'6px' }}>{startCase(name)}</div>
				{(pillsArray || []).map((ele) => (
					ele && <Pill color='blue'>{ele}</Pill>
				))}
			</div>
		);
		const q = `${item.name || ''}-${pillsArray.join('-')}`;
		const value = item.id;

		return {label, q, value}
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
		listAudienceLoading
	};
};

export default useGetTopicTagList;
