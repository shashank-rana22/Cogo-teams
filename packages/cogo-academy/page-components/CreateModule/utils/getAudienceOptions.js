import { Pill } from '@cogoport/components';
import { startCase } from '@cogoport/utils';

import WORK_SCOPES_OPTIONS from '../../ControlCenter/ConfigurationEngine/CreateAudienceForm/utils/workScopeMappings';

// eslint-disable-next-line import/no-unresolved
import countries from '@/data-store/constants/countries.json';

const getAudienceOptions = ({ item }) => {
	const {
		auth_function = '',
		auth_sub_function = '',
		cogo_entity_name = '',
		name = '',
		platform = '',
		work_scope = '',
		country_id = '',
	} = item || {};

	const workScopeLabel = (WORK_SCOPES_OPTIONS || []).find(
		(workScope) => workScope.value === work_scope,
	);
	const selectedCountry = countries.find(
		(country) => country.id === country_id,
	);

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
				key={item.id}
				style={{
					display       : 'flex',
					flexWrap      : 'wrap',
					fontWeight    : 600,
					paddingTop    : '4px',
					paddingBottom : '6px',
				}}
			>
				{startCase(name)}
			</div>

			{(pillsArray || []).map(
				(ele) => pillsObject[ele] && (
					<Pill color="blue" key={ele}>
						{['all', 'All'].includes(pillsObject[ele])
							? `${startCase(ele)} - ${startCase(pillsObject[ele])}`
							: startCase(pillsObject[ele])}
					</Pill>
				),
			)}
		</div>
	);

	const q = `${item.name || ''}-${pillsArray.join('-')}`;
	const value = item.id;

	return { label, q, value };
};

export default getAudienceOptions;
