import { Pill } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { startCase } from '@cogoport/utils';

import WORK_SCOPES_OPTIONS from '../../ConfigurationEngine/CreateAudienceForm/utils/workScopeMappings';
import useListCogoEntity from '../../ConfigurationEngine/hooks/useListCogoEntities';
/* eslint-disable */
import countries from '../../../../../../.data-store/constants/countries.json';

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

	const [{ data: audienceData }] = useRequest({
		method : 'get',
		url    : '/list_faq_audiences',
		params : {
			page_limit               : 100000,
			pagination_data_required : false,
		},
	}, { manual: false });

	const { list: topicList = [] } = topicsData || {};
	const { list : tagList = [] } = tagsData || {};
	const { list:audienceList = [] } = audienceData || {};

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
			persona = '',
			country_id = '',
		} = item || {};
		console.log('item', item);

		const personaLabel = (WORK_SCOPES_OPTIONS || []).find((workScope) => workScope.value === persona);
		const cogoEntityLabel = (entity_data || []).find((cogoEntity) => cogoEntity.id === cogo_entity_id);
		const selectedCountry = countries.find((country)=> country.id===item.country_id)

		const pillsArray = [
			personaLabel?.label,
			auth_function||'All',
			startCase(auth_sub_function)||'All',
			cogoEntityLabel?.business_name,
			startCase(platform),
			selectedCountry?.name];

		// const label = ` Persona - ${personaLabel?.label},
		// Function - ${auth_function},  Sub-function - ${startCase(auth_sub_function)},
		//  Cogo Entity - ${cogoEntityLabel?.business_name} Platform - ${startCase(platform)}`;

		const label = (
			<div>
				<div style={{ fontWeight: 600 }}>{name}</div>
				{(pillsArray || []).map((ele) => (
					ele && <Pill color="#ecd7a8">{ele}</Pill>
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
	};
};

export default useGetTopicTagList;
