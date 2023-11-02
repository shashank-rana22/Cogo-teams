import { isEmpty } from '@cogoport/utils';

const updateApiControls = ({ selectedApi }) => [
	{
		name  : 'name',
		label : 'Resource Name',
		type  : 'text',
		width : '40%',
		value : (selectedApi || {}).name,
		rules : {
			validate: (val) => {
				if (isEmpty(val)) {
					return 'Please select the api to update...';
				}
				const SNAKE_CASE_REGEX = /^[a-z0-9_]+$/;
				const isSnakeCase = SNAKE_CASE_REGEX.test(val);

				if (!isSnakeCase) {
					return 'Name should be snake case';
				}

				return true;
			},
		},
	},
	{
		name     : 'display_name',
		label    : 'Display Name',
		type     : 'text',
		width    : '40%',
		disabled : !selectedApi,
	},
	{
		name    : 'service',
		label   : 'Service',
		type    : 'select',
		options : [
			{ label: 'Rolling Forecast', value: 'rolling_forecast' },
			{ label: 'Lead', value: 'lead' },
			{ label: 'Condition', value: 'condition' },
			{ label: 'Ltl freight rate', value: 'ltl_freight_rate' },
			{ label: 'Sage', value: 'sage' },
			{ label: 'Cogomaps', value: 'cogomaps' },
			{ label: 'Subsidiary service rate', value: 'subsidiary_service_rate' },
			{ label: 'Service provider', value: 'service_provider' },
			{ label: 'Cogo assured rate', value: 'cogo_assured_rate' },
			{ label: 'Spot negotiation', value: 'spot_negotiation' },
			{ label: 'Saas traceability', value: 'saas_traceability' },
			{ label: 'Rate sheet', value: 'rate_sheet' },
			{ label: 'Checkout', value: 'checkout' },
			{ label: 'Email', value: 'email' },
			{ label: 'Trade finance', value: 'trade_finance' },
			{ label: 'Ingestion', value: 'ingestion' },
			{ label: 'Event', value: 'event' },
			{ label: 'Template', value: 'template' },
			{ label: 'Exchange rate', value: 'exchange_rate' },
			{ label: 'Analytics', value: 'analytics' },
			{ label: 'Air schedule', value: 'air_schedule' },
			{ label: 'Air customs rate', value: 'air_customs_rate' },
			{ label: 'Meeting', value: 'meeting' },
			{ label: 'Incentive', value: 'incentive' },
			{ label: 'Rating', value: 'rating' },
			{ label: 'Contract', value: 'contract' },
			{ label: 'Voice call', value: 'voice_call' },
			{ label: 'Ltl warehouse ops', value: 'ltl_warehouse_ops' },
			{ label: 'Rfq', value: 'rfq' },
			{ label: 'Platform config', value: 'platform_config' },
			{ label: 'Payment', value: 'payment' },
			{ label: 'Cogopoint', value: 'cogopoint' },
			{ label: 'Store', value: 'store' },
			{ label: 'Operator', value: 'operator' },
			{ label: 'Communication control', value: 'communication_control' },
			{ label: 'Ftl terms', value: 'ftl_terms' },
			{ label: 'Hs code', value: 'hs_code' },
			{ label: 'Lcl customs rate', value: 'lcl_customs_rate' },
			{ label: 'User', value: 'user' },
			{ label: 'Freight trend', value: 'freight_trend' },
			{ label: 'Inventory management', value: 'inventory_management' },
			{ label: 'Credit', value: 'credit' },
			{ label: 'Attribution', value: 'attribution' },
			{ label: 'Chakravyuh', value: 'chakravyuh' },
			{ label: 'Communication', value: 'communication' },
			{ label: 'Air tracking', value: 'air_tracking' },
			{ label: 'Campaign', value: 'campaign' },
			{ label: 'Feedback api', value: 'feedback_api' },
			{ label: 'Spot search', value: 'spot_search' },
			{ label: 'Public search', value: 'public_search' },
			{ label: 'Public', value: 'public' },
			{ label: 'Rail domestic freight rate', value: 'rail_domestic_freight_rate' },
			{ label: 'Organization', value: 'organization' },
			{ label: 'Budget', value: 'budget' },
			{ label: 'Forecast', value: 'forecast' },
			{ label: 'Haulage freight rate', value: 'haulage_freight_rate' },
			{ label: 'Saas tools', value: 'saas_tools' },
			{ label: 'Revenue desk', value: 'revenue_desk' },
			{ label: 'Saas air schedules', value: 'saas_air_schedules' },
			{ label: 'Cogo public', value: 'cogo_public' },
			{ label: 'Domestic air freight rate', value: 'domestic_air_freight_rate' },
			{ label: 'Location', value: 'location' },
			{ label: 'Vessel', value: 'vessel' },
			{ label: 'Referral', value: 'referral' },
			{ label: 'Trade', value: 'trade' },
			{ label: 'External captcha', value: 'external_captcha' },
			{ label: 'Auth', value: 'auth' },
			{ label: 'Business', value: 'business' },
			{ label: 'Saas workspace', value: 'saas_workspace' },
			{ label: 'Partner', value: 'partner' },
			{ label: 'Convenience rate', value: 'convenience_rate' },
			{ label: 'Promotion', value: 'promotion' },
			{ label: 'Shipment', value: 'shipment' },
			{ label: 'Saas subscriptions v2', value: 'saas_subscriptions_v2' },
			{ label: 'Ftl freight rate', value: 'ftl_freight_rate' },
			{ label: 'Cash flow', value: 'cash_flow' },
			{ label: 'Cogo academy', value: 'cogo_academy' },
			{ label: 'Sailing schedule', value: 'sailing_schedule' },
			{ label: 'Vendor', value: 'vendor' },
			{ label: 'Discount', value: 'discount' },
			{ label: 'Social auth', value: 'social_auth' },
			{ label: 'Segmentation', value: 'segmentation' },
			{ label: 'Platform notification', value: 'platform_notification' },
			{ label: 'Container', value: 'container' },
			{ label: 'Link', value: 'link' },
			{ label: 'Chat', value: 'chat' },
			{ label: 'Margin', value: 'margin' },
			{ label: 'Lcl freight rate', value: 'lcl_freight_rate' },
			{ label: 'Terms and condition', value: 'terms_and_condition' },
			{ label: 'Unified dashboard', value: 'unified_dashboard' },
			{ label: 'Arjuna', value: 'arjuna' },
			{ label: 'Demeter', value: 'demeter' },
			{ label: 'Loki', value: 'loki' },
			{ label: 'Themis', value: 'themis' },
			{ label: 'Cogocare', value: 'cogocare' },
			{ label: 'Hrms', value: 'hrms' },
			{ label: 'Muneem', value: 'muneem' },
			{ label: 'Kuber', value: 'kuber' },
			{ label: 'Airbender', value: 'airbender' },
			{ label: 'Cogolens', value: 'cogolens' },
			{ label: 'Polyglot', value: 'polyglot' },
			{ label: 'Ares', value: 'ares' },
			{ label: 'Cogo Ais', value: 'cogo_ais' },
			{ label: 'Plutus', value: 'plutus' },
			{ label: 'Iris', value: 'iris' },
			{ label: 'Heimdall', value: 'heimdall' },
			{ label: 'Hades', value: 'hades' },
			{ label: 'Handling Fee', value: 'handling_fee' },
		],
		width    : '20%',
		disabled : !selectedApi,
	},
	{
		name     : 'access_type',
		label    : 'Access Type',
		type     : 'select',
		options  : [{ label: 'Private', value: 'private' }, { label: 'Public', value: 'public' }],
		width    : '30%',
		disabled : !selectedApi,
	},
	{
		name    : 'method',
		label   : 'Method',
		type    : 'select',
		options : [
			{ label: 'GET', value: 'get' },
			{ label: 'POST', value: 'post' },
			{ label: 'PUT', value: 'put' },
			{ label: 'DELETE', value: 'delete' },
			{ label: 'PATCH', value: 'patch' },
		],
		width    : '20%',
		disabled : !selectedApi,
	},
	{
		name     : 'status',
		label    : 'Status',
		type     : 'select',
		options  : [{ label: 'Active', value: 'active' }, { label: 'Inactive', value: 'inactive' }],
		width    : '20%',
		disabled : !selectedApi,
	},
	{
		name  : 'permission_check_required',
		label : 'Permission Check Required',
		type  : 'checkbox',
		width : '30%',
	},
];

export default updateApiControls;
