import { MultiSelect, Select } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import useGetAsyncOptions from '../../../hooks/useGetAsyncOptions';
import useGetAsyncOptionsMicroservice from '../../../hooks/useGetAsyncOptionsMicroservice';
import {
	asyncFieldsCampaignSegments,
	asyncFieldsOrganizations,
	asyncFieldsOrganizationUser,
	asyncFieldsPartner,
	asyncFieldsPartnerRoles,
	asyncFieldsPartnerUsers,
	asyncFieldsLocations,
	asyncFieldsListOperators,
	asyncFieldListRateChargeCodes,
	asyncAllotBanks,
	asyncFieldsExpertiseConfigurations,
	asyncFieldsExpertiseBadgeName,
	asyncKamExpertiseRuleOptions,
	listVendors,
	asyncListCogoEntity,
	asyncListHsCodes,
	asyncListCurrency,
} from '../../../utils/getAsyncFields';

/**
 * to get async options, first check desired endpoint is present or not,
 * 1. if present
 * 		1. get the endpoint function "key" from "keyAsyncFieldsParamsMapping" obj
 * 		2. pass that function "key" as value in "asyncKey" property in control
 * 2. if not present
 * 		1. add function in "common/utils/getAsyncFields" file and export it,
 * 		2. import that function from "utils/getAsyncFields",
 * 		3. add a new "key" in "keyAsyncFieldsParamsMapping" obj with value as
 * 			function reference, note. do not call the function
 * 		4. then follow 1.1 and 1.2 steps
 *
 * if you want to modify the options, pass "getModifiedOptions" function in control,
 * @method
 * @param {Object} Object: { options: [] => Async Options }
 * @returns {Array} Modified Async Options
 * getModifiedOptions
 */

const keyAsyncFieldsParamsMapping = {
	list_vendors                  : listVendors,
	organizations                 : asyncFieldsOrganizations,
	organization_users            : asyncFieldsOrganizationUser,
	partners                      : asyncFieldsPartner,
	partner_users                 : asyncFieldsPartnerUsers,
	partner_roles                 : asyncFieldsPartnerRoles,
	segments                      : asyncFieldsCampaignSegments,
	list_locations                : asyncFieldsLocations,
	list_operators                : asyncFieldsListOperators,
	list_rate_charge_codes        : asyncFieldListRateChargeCodes,
	allot_bank                    : asyncAllotBanks,
	list_cogo_entity              : asyncListCogoEntity,
	list_hs_codes               	 : asyncListHsCodes,
	list_exchange_rate_currencies : asyncListCurrency,
};

function AsyncSelect(props) {
	const {
		params,
		multiple,
		asyncKey,
		initialCall,
		getModifiedOptions,
		getSelectedOption,
		microService = '',
		...rest
	} = props;

	const defaultParams = keyAsyncFieldsParamsMapping[asyncKey]?.() || {};

	const asyncOptionsHook = (microService || defaultParams.microService)
		? useGetAsyncOptionsMicroservice
		: useGetAsyncOptions;

	const getAsyncOptionsProps = asyncOptionsHook({
		...defaultParams,
		initialCall,
		params       : params || defaultParams.params,
		labelKey     : rest.labelKey || defaultParams.labelKey,
		valueKey     : rest.valueKey || defaultParams.valueKey,
		microService : microService || defaultParams.microService,
	});

	if (typeof getModifiedOptions === 'function' && !isEmpty(getAsyncOptionsProps.options)) {
		getAsyncOptionsProps.options = getModifiedOptions({ options: getAsyncOptionsProps.options });
	}

	if (typeof getSelectedOption === 'function' && !isEmpty(rest.value)) {
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
