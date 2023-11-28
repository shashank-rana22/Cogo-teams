import { MultiSelect, Select, CreatableMultiSelect, CreatableSelect } from '@cogoport/components';
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
	asyncTicketsCategory,
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
	asyncListAllocationObjectives,
	asyncListCompanyLocations,
	asyncListOverSeasTradeParties,
	asyncListPricingZones,
	asyncListTruckTypes,
	asyncFieldsOrganizationUsers,
	asyncListLeadOrganizationUsers,
	asyncListUserShipments,
	asyncFieldsOrganizationOnCall,
	asyncListSaasHsCodes,
	asyncListSpotSearchRateCardOperators,
	asyncListLocationClusters,
	asyncListFclFreightCommodityClusters,
	asyncListShippingLineEvents,
	asyncListSaasPlan,
	asyncListEnrichmentSources,
	asyncListIncidentTypes,
	asyncAllocationEligibleRoles,
	asyncAgentScoringConfigs,
	asyncAgentScoringBlocks,
	asyncAgentScoringParameters,
	asyncAgentScoringQuests,
	asyncListFclFreightRate,
	asyncListLclFreightRate,
	asyncListAirFreightRate,
	asyncListFtlFreightRate,
	asyncListLtlFreightRate,
	asyncListFclCfsRate,
	asyncListHaulageFreightRate,
	asyncListFclCustomsRate,
	asyncListLclCustomsRate,
	asyncListAirCustomsRate,
	asyncListTrailerFreightRate,
	asyncListFclRateFeedback,
	asyncListLclRateFeedback,
	asyncListAirRateFeedback,
	asyncListFtlRateFeedback,
	asyncListLtlRateFeedback,
	asyncListFclCustomFeedback,
	asyncListLclCustomFeedback,
	asyncListTrailerRateFeedback,
	asyncListHaulageRateFeedback,
	asyncListAirCustomFeedback,
	asyncInsuranceHsCode,
	asyncListSalaryBands,
	asyncListTransactionType,
	asyncListSalaryConfigurations,
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
	list_location_clusters         	     : asyncListLocationClusters,
	commodity_clusters                   : asyncListFclFreightCommodityClusters,
	list_locations_mapping               : asyncFieldsLocationsMapping,
	list_operators                       : asyncFieldsListOperators,
	list_rate_charge_codes               : asyncFieldListRateChargeCodes,
	allot_bank                           : asyncAllotBanks,
	shipping_lines                       : asyncShippingLines,
	list_vendors                         : listVendors,
	configuration_categories             : asyncTicketsCategory,
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
	insurance_commodities                : asyncInsuranceCommoditiesList,
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
	allocation_objectives                : asyncListAllocationObjectives,
	list_company_locations               : asyncListCompanyLocations,
	list_overseas_trade_parties          : asyncListOverSeasTradeParties,
	list_pricing_zones                   : asyncListPricingZones,
	list_organization_users              : asyncFieldsOrganizationUsers,
	lead_org_users                       : asyncListLeadOrganizationUsers,
	list_user_shipments                  : asyncListUserShipments,
	list_organizations_on_call           : asyncFieldsOrganizationOnCall,
	list_saas_hs_codes                   : asyncListSaasHsCodes,
	list_spot_search_operators           : asyncListSpotSearchRateCardOperators,
	list_shipping_line_events            : asyncListShippingLineEvents,
	list_saas_plan                       : asyncListSaasPlan,
	list_enrichment_sources              : asyncListEnrichmentSources,
	list_incident_types                  : asyncListIncidentTypes,
	agent_scoring_eligible_roles         : asyncAllocationEligibleRoles,
	agent_scoring_configs                : asyncAgentScoringConfigs,
	agent_scoring_blocks                 : asyncAgentScoringBlocks,
	agent_scoring_parameters             : asyncAgentScoringParameters,
	agent_scoring_quests                 : asyncAgentScoringQuests,
	list_fcl_freight_rate_requests       : asyncListFclFreightRate,
	list_lcl_freight_rate_requests       : asyncListLclFreightRate,
	list_air_freight_rate_requests       : asyncListAirFreightRate,
	list_ftl_freight_rate_requests       : asyncListFtlFreightRate,
	list_ltl_freight_rate_requests       : asyncListLtlFreightRate,
	list_fcl_cfs_rate_requests           : asyncListFclCfsRate,
	list_haulage_freight_rate_requests   : asyncListHaulageFreightRate,
	list_fcl_customs_rate_requests       : asyncListFclCustomsRate,
	list_lcl_customs_rate_requests       : asyncListLclCustomsRate,
	list_air_customs_rate_requests       : asyncListAirCustomsRate,
	list_trailer_freight_rate_requests   : asyncListTrailerFreightRate,
	list_fcl_freight_rate_feedbacks      : asyncListFclRateFeedback,
	list_lcl_freight_rate_feedbacks      : asyncListLclRateFeedback,
	list_air_freight_rate_feedbacks      : asyncListAirRateFeedback,
	list_ftl_freight_rate_feedbacks      : asyncListFtlRateFeedback,
	list_ltl_freight_rate_feedbacks      : asyncListLtlRateFeedback,
	list_fcl_customs_rate_feedbacks      : asyncListFclCustomFeedback,
	list_lcl_customs_rate_feedbacks      : asyncListLclCustomFeedback,
	list_trailer_freight_rate_feedbacks  : asyncListTrailerRateFeedback,
	list_haulage_freight_rate_feedbacks  : asyncListHaulageRateFeedback,
	list_air_customs_rate_feedbacks      : asyncListAirCustomFeedback,
	list_insurance_hs_code               : asyncInsuranceHsCode,
	list_salary_bands                    : asyncListSalaryBands,
	list_transaction_type                : asyncListTransactionType,
	list_salary_configurations           : asyncListSalaryConfigurations,
};

const SINGLE_ENTITY = 1;

const getElement = ({ type = '', multiple = false }) => {
	if (type === 'async_create_select' && multiple) {
		return CreatableMultiSelect;
	}

	if (type === 'async_create_select') {
		return CreatableSelect;
	}

	if (multiple) {
		return MultiSelect;
	}

	return Select;
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
		onOptionsChange,
		isSingleEntity,
		onSearch,
		type,
		...rest
	} = props;

	const defaultParams = keyAsyncFieldsParamsMapping[asyncKey]?.() || {};

	const asyncOptionsHook = microService || defaultParams.microService
		? useGetAsyncOptionsMicroservice
		: useGetAsyncOptions;

	const getAsyncOptionsProps = asyncOptionsHook({
		...defaultParams,
		getModifiedOptions,
		initialCall,
		onOptionsChange,
		onSearch,
		params       : params || defaultParams.params,
		labelKey     : rest.labelKey || defaultParams.labelKey,
		valueKey     : rest.valueKey || defaultParams.valueKey,
		microService : microService || defaultParams.microService,
	});

	const disabled = isSingleEntity
    && asyncKey === 'list_cogo_entity'
    && getAsyncOptionsProps?.options?.length <= SINGLE_ENTITY;

	if (typeof getSelectedOption === 'function' && !isEmpty(rest.value)) {
		let selectedValue;
		if (multiple) {
			selectedValue = rest.value.slice(REST_VALUE_SLICE_INDEX);
		} else {
			selectedValue = rest.value;
		}

		const selectedOption = getAsyncOptionsProps.options.filter(
			(option) => option[rest.valueKey || defaultParams.valueKey || 'id']
        === selectedValue,
		);

		getSelectedOption(selectedOption[GLOBAL_CONSTANTS.zeroth_index]);
	}

	const Element = getElement({ type, multiple });

	return <Element disabled={disabled} {...getAsyncOptionsProps} {...rest} />;
}

export default AsyncSelect;
