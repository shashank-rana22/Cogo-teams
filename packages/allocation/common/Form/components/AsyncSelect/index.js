import { MultiSelect, Select } from '@cogoport/components';
import { useGetAsyncOptions } from '@cogoport/forms';
import {
	asyncFieldsCampaignSegments,
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
	segments           : asyncFieldsCampaignSegments,
};

function AsyncSelect({ asyncKey, initialCall, params, getModifiedOptions, multiple, getSelectedOption, ...rest }) {
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

	if (typeof handleChange === 'function' && !isEmpty(rest.value)) {
		let selectedValue;
		if (multiple) {
			selectedValue = rest.value.slice(-1);
		} else {
			selectedValue = rest.value;
		}

		const selectedOption = getAsyncOptionsProps.options.filter((option) => option.id === selectedValue);

		getSelectedOption(selectedOption[0]);
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
