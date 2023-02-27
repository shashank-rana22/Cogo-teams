import { useRequest } from '@cogoport/request';
import { startCase } from '@cogoport/utils';

import WORK_SCOPES_OPTIONS from '../../ConfigurationEngine/CreateUserForm/utils/workScopeMappings';
import useListCogoEntity from '../../ConfigurationEngine/hooks/useListCogoEntities';

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

	const audienceLabel = (item) => {
		const {
			auth_function = '',
			auth_sub_function = '',
			cogo_entity_id = '',
			// name = '',
			platform = '',
			persona = '',
			// country_id = '',
		} = item || {};

		const personaLabel = (WORK_SCOPES_OPTIONS || []).find((workScope) => workScope.value === persona);
		const cogoEntityLabel = (entity_data || []).find((cogoEntity) => cogoEntity.id === cogo_entity_id);

		const label = ` Persona - ${personaLabel?.label},  
		Function - ${auth_function},  Sub-function - ${startCase(auth_sub_function)}, 
		 Cogo Entity - ${cogoEntityLabel?.business_name} Platform - ${startCase(platform)}`;

		return label;
	};

	(topicList || []).forEach((item) => {
		topicOptions.push({ label: item?.display_name, value: item?.id });
	});

	(tagList || []).forEach((item) => {
		tagOptions.push({ label: item?.display_name, value: item?.id });
	});

	(audienceList || []).forEach((item) => {
		audienceOptions.push({ label: audienceLabel(item), value: item?.id });
	});

	return {
		topicOptions,
		tagOptions,
		audienceOptions,
	};
};

export default useGetTopicTagList;
