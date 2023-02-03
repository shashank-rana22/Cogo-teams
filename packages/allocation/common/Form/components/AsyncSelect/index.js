import { MultiSelect, Select } from '@cogoport/components';
import { useGetAsyncOptions } from '@cogoport/forms';
import {
	asyncFieldsOrganizations,
	asyncFieldsOrganizationUser,
	asyncFieldsPartner,
	asyncFieldsPartnerRoles,
	asyncFieldsPartnerUsers,
} from '@cogoport/forms/utils/getAsyncFields';
import { isEmpty } from '@cogoport/utils';

const keyAsyncFieldsParamsMapping = {
	organizations      : asyncFieldsOrganizations,
	organization_users : asyncFieldsOrganizationUser,
	partners           : asyncFieldsPartner,
	partner_users      : asyncFieldsPartnerUsers,
	partner_roles      : asyncFieldsPartnerRoles,
};

function AsyncSelect({ asyncKey, initialCall, params, getModifiedOptions, multiple, ...rest }) {
	const defaultParams = keyAsyncFieldsParamsMapping[asyncKey]?.() || {};

	const getAsyncOptionsProps = useGetAsyncOptions({
		...defaultParams,
		initialCall,
		params   : params || defaultParams.params,
		labelKey : rest.labelKey || defaultParams.labelKey,
		valueKey : rest.valueKey || defaultParams.valueKey,
	});

	if (typeof getModifiedOptions === 'function' && !isEmpty(getAsyncOptionsProps.options)) {
		getAsyncOptionsProps.options = getModifiedOptions({ options: getAsyncOptionsProps.options });
	}

	const Element = multiple ? MultiSelect : Select;

	return (
		<Element
			{...rest}
			{...getAsyncOptionsProps}
		/>
	);
}

export default AsyncSelect;
