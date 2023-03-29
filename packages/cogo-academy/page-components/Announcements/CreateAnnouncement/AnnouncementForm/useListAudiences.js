import { Pill } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { startCase } from '@cogoport/utils';
import { useCallback, useMemo } from 'react';

import WORK_SCOPES_OPTIONS from './CreateAudienceForm/utils/workScopeMappings';

// eslint-disable-next-line import/no-unresolved
import countries from '@/data-store/constants/countries.json';

const useListAudiences = () => {
	const [{ data: audienceData, loading:listAudienceLoading }, triggerAudiences] = useRequest({
		method : 'get',
		url    : '/list_faq_audiences',
		params : {
			page_limit               : 100000,
			pagination_data_required : false,
		},
	}, { manual: false });

	const fetchAudiences = useCallback(() => {
		try {
			triggerAudiences({
				params: {
					page_limit               : 100000,
					pagination_data_required : false,
				},
			});
		} catch (error) {
			console.log('error :: ', error);
		}
	}, [triggerAudiences]);

	const { list: audienceList = [] } = audienceData || {};

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
						<Pill color="blue" key={pillsObject[ele]}>
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

	const audienceOptions = useMemo(() => audienceList.map((audience) => getAudienceOption(audience)), [audienceList]);

	return {
		audienceOptions,
		fetchAudiences,
		listAudienceLoading,
	};
};

export default useListAudiences;
