import { MultiSelect, Select } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
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
	asyncShippingLines,
	asyncFieldsExpertiseConfigurations,
	asyncFieldsExpertiseBadgeName,
	asyncKamExpertiseRuleOptions,
	listVendors,
	asyncListCogoEntity,
	asyncOrganizationTradeParties,
	asyncSearchProducts,
	asyncListHsCodes,
	asyncListCurrency,
	asyncAccountEngagementScoringEvents,
	asyncShipmentContainerDetails,
	asyncJvList,
	asyncJournalCode,
	asyncAccMode,
	asyncCodeMaster,
	asyncListOrgTradeParties,
	asyncPlanPricingList,
	asyncFieldsPartnerUsersIds,
	asyncQuotaList,
	asyncAllocationRequestRejectionType,
	asyncCommoditiesList,
	asyncFortigoLocations,
	asyncOrganizationBranches,
	asyncListFAQTopics,
	asyncListFAQTags,
	asyncListCourseCategories,
	asyncListTests,
	asyncListEmployees,
	asyncListSquad,
	asyncListSubChapters,
	asyncListTribes,
	asyncListChapter,
	asyncListRoles,
	asyncListDepartment,
	asyncFieldsTicketTypes,
	asyncInsuranceCommoditiesList,
	asyncListDunningTemplates,
	asyncListOrganizationStakeholders,
	asyncListExpenseCategories,
	asyncListAllManagers,
	asyncFieldsListAgents,
	asyncListShipmentServices,
	asyncListShipments,
	asyncListShipmentPendingTasks,
	asyncIncidentSubtypeList,
	asyncFieldsLeadOrganization,
	asyncListResources,
	asyncFieldsLocationsMapping,
	asyncListOverSeasParties,
	asyncListPricingZones,
	asyncListTruckTypes,
	asyncFieldsOrganizationUsers,
	asyncListLeadOrganizationUsers,
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

const REST_VALUE_SLICE_INDEX = -1;
const keyAsyncFieldsParamsMapping = {
	organizations                        : asyncFieldsOrganizations,
	organization_users                   : asyncFieldsOrganizationUser,
	partners                             : asyncFieldsPartner,
	partner_users                        : asyncFieldsPartnerUsers,
	partner_roles                        : asyncFieldsPartnerRoles,
	segments                             : asyncFieldsCampaignSegments,
	list_locations                       : asyncFieldsLocations,
	list_locations_mapping               : asyncFieldsLocationsMapping,
	list_operators                       : asyncFieldsListOperators,
	list_rate_charge_codes               : asyncFieldListRateChargeCodes,
	allot_bank                           : asyncAllotBanks,
	shipping_lines                       : asyncShippingLines,
	list_vendors                         : listVendors,
	list_cogo_entity                     : asyncListCogoEntity,
	expertise_configuration              : asyncFieldsExpertiseConfigurations,
	badge_name                           : asyncFieldsExpertiseBadgeName,
	rule_options                         : asyncKamExpertiseRuleOptions,
	list_hs_codes                        : asyncListHsCodes,
	list_exchange_rate_currencies        : asyncListCurrency,
	engagement_scoring_events            : asyncAccountEngagementScoringEvents,
	plan_pricing_list                    : asyncPlanPricingList,
	partner_users_ids                    : asyncFieldsPartnerUsersIds,
	addon_list                           : asyncQuotaList,
	journal_category                     : asyncJvList,
	journal_code                         : asyncJournalCode,
	jv_account_mode                      : asyncAccMode,
	shipment_container_details           : asyncShipmentContainerDetails,
	jv_code_master                       : asyncCodeMaster,
	list_trade_parties                   : asyncListOrgTradeParties,
	allocation_rejection_type            : asyncAllocationRequestRejectionType,
	search_products_v2                   : asyncSearchProducts,
	list_organization_trade_parties      : asyncOrganizationTradeParties,
	hs_code_list                         : asyncCommoditiesList,
	list_shipment_fortigo_trip_locations : asyncFortigoLocations,
	list_organization_branches           : asyncOrganizationBranches,
	faq_topics                           : asyncListFAQTopics,
	faq_tags                             : asyncListFAQTags,
	list_course_categories               : asyncListCourseCategories,
	list_tests                           : asyncListTests,
	list_employees                       : asyncListEmployees,
	list_squads                          : asyncListSquad,
	list_sub_chapters                    : asyncListSubChapters,
	list_tribes                          : asyncListTribes,
	list_chapters                        : asyncListChapter,
	list_employee_roles                  : asyncListRoles,
	list_employee_departments            : asyncListDepartment,
	default_types                        : asyncFieldsTicketTypes,
	insurance_commodities              	 : asyncInsuranceCommoditiesList,
	list_dunning_templates               : asyncListDunningTemplates,
	list_organization_stakeholders       : asyncListOrganizationStakeholders,
	list_expense_category                : asyncListExpenseCategories,
	list_all_managers                    : asyncListAllManagers,
	list_chat_agents                     : asyncFieldsListAgents,
	list_shipment_services               : asyncListShipmentServices,
	list_shipments                       : asyncListShipments,
	list_shipment_pending_tasks          : asyncListShipmentPendingTasks,
	list_incident_subtype                : asyncIncidentSubtypeList,
	list_lead_organizations              : asyncFieldsLeadOrganization,
	list_truck_types                     : asyncListTruckTypes,
	resources                            : asyncListResources,
	list_overseas_trade_parties          : asyncListOverSeasParties,
	list_pricing_zones                   : asyncListPricingZones,
	list_organization_users              : asyncFieldsOrganizationUsers,
	lead_org_users                       : asyncListLeadOrganizationUsers,
};

const SINGLE_ENTITY = 1;

function AsyncSelect(props) {
	const {
		params,
		multiple,
		asyncKey,
		initialCall,
		getModifiedOptions,
		getSelectedOption,
		microService = '',
		onOptionsChange,
		isSingleEntity,
		...rest
	} = props;

	const defaultParams = keyAsyncFieldsParamsMapping[asyncKey]?.() || {};

	const asyncOptionsHook = (microService || defaultParams.microService)
		? useGetAsyncOptionsMicroservice
		: useGetAsyncOptions;

	const getAsyncOptionsProps = asyncOptionsHook({
		...defaultParams,
		getModifiedOptions,
		initialCall,
		onOptionsChange,
		params       : params || defaultParams.params,
		labelKey     : rest.labelKey || defaultParams.labelKey,
		valueKey     : rest.valueKey || defaultParams.valueKey,
		microService : microService || defaultParams.microService,
	});

	const disabled = isSingleEntity && asyncKey === 'list_cogo_entity'
	&& getAsyncOptionsProps?.options?.length <= SINGLE_ENTITY;

	if (typeof getSelectedOption === 'function' && !isEmpty(rest.value)) {
		let selectedValue;
		if (multiple) {
			selectedValue = rest.value.slice(REST_VALUE_SLICE_INDEX);
		} else {
			selectedValue = rest.value;
		}

		const selectedOption = getAsyncOptionsProps.options.filter(
			(option) => option[rest.valueKey || defaultParams.valueKey || 'id'] === selectedValue,
		);

		getSelectedOption(selectedOption[GLOBAL_CONSTANTS.zeroth_index]);
	}

	const Element = multiple ? MultiSelect : Select;

	return (
		<Element
			disabled={disabled}
			{...getAsyncOptionsProps}
			{...rest}

		/>
	);
}

export default AsyncSelect;
