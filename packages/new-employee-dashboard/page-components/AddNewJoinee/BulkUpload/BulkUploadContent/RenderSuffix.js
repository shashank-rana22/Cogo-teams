import { getCountryConstants } from '@cogoport/globalization/constants/geo';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { startCase } from '@cogoport/utils';

import RenderSelect from './RenderSelect';

const india_country_id = GLOBAL_CONSTANTS.country_ids.IN;
const vietnam_country_id = GLOBAL_CONSTANTS.country_ids.VN;

const india_constants = getCountryConstants({ country_id: india_country_id });
const vietnam_constants = getCountryConstants({ country_id: vietnam_country_id });

const OFFICE_LOCATIONS = [...india_constants.office_locations, ...vietnam_constants.office_locations];

const REPORTING_CITY_OPTIONS = OFFICE_LOCATIONS.map((location) => (
	{ label: startCase(location), value: location }));

function RenderSuffix({ instruction = '' }) {
	if (instruction.includes('Office Location')) {
		return <RenderSelect options={REPORTING_CITY_OPTIONS} />;
	}
	if (instruction.includes('Role')) {
		return <RenderSelect type="async" asyncKey="list_employee_roles" valueKey="role_name" />;
	}
	if (instruction.includes('Department')) {
		return <RenderSelect type="async" asyncKey="list_employee_departments" valueKey="department_name" />;
	}
	if (instruction.includes('Learning Indicator')) {
		return <RenderSelect options={GLOBAL_CONSTANTS.li_options} />;
	}

	return null;
}

export default RenderSuffix;
