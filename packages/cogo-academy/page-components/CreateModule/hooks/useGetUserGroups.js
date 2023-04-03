import { Pill, Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { startCase } from '@cogoport/utils';
import { useCallback } from 'react';

import WORK_SCOPES_OPTIONS from '../../ControlCenter/ConfigurationEngine/CreateAudienceForm/utils/workScopeMappings';

// eslint-disable-next-line import/no-unresolved
import countries from '@/data-store/constants/countries.json';

const useGetUserGroups = () => {
	const [{ data: audienceData, loading: listAudienceLoading }, triggerAudiences] = useRequest({
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
			Toast.error('error :: ', error);
		}
	}, [triggerAudiences]);

	const { list: audienceList = [] } = audienceData || {};
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
				<div
					style={{
						display       : 'flex',
						flexWrap      : 'wrap',
						fontWeight    : 600,
						paddingTop    : '4px',
						paddingBottom : '6px',
					}}
					key={item.id}
				>
					{startCase(name)}
				</div>

				{(pillsArray || []).map((ele) => (pillsObject[ele]
					&& (
						<Pill color="blue" key={ele}>
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

	(audienceList || []).forEach((item) => {
		audienceOptions.push(getAudienceOption(item));
	});

	return {
		audienceOptions,
		listAudienceLoading,
		fetchAudiences,
	};
};

export default useGetUserGroups;
