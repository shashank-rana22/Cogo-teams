import currencies from '@cogoport/air-modules/helpers/currencies';
import ENTITY_FEATURE_MAPPING from '@cogoport/globalization/constants/entityFeatureMapping';
import getGeoConstants from '@cogoport/globalization/constants/geo';

const ENTITY_CODES = Object.keys(ENTITY_FEATURE_MAPPING).filter(
	(key) => ENTITY_FEATURE_MAPPING[key].feature_supported.includes('terminal_charge'),
);

const getAddressOptions = (item = []) => (
	(item || []).map((address) => ({
		label : address?.address,
		value : address?.id,
	}))
);

const getTerminalChargeRateControl = ({
	entityData = {}, setEntityData = () => {},
	collectionPartyData = {}, setCollectionPartyData = () => {},
}) => {
	const geo = getGeoConstants();

	const TERMINAL_CHARGE_RATE_CONTROL = [
		{
			name        : 'mawb_number',
			label       : 'MAWB Number',
			type        : 'text',
			placeholder : 'Enter MAWB Number (XXX-XXXX-XXXX)',
			rules       : { required: 'MAWB Number is required' },
			span        : 6,
		},
		{
			span: 6,
		},
		{
			name     : 'cogo_entity_id',
			label    : 'Billing Party',
			type     : 'async-select',
			asyncKey : 'list_cogo_entity',
			params   : {
				filters: {
					entity_code: ENTITY_CODES,
				},
			},
			placeholder    : 'Select Cogo Entity',
			rules          : { required: 'This is required' },
			span           : 6,
			defaultOptions : true,
			onChange       : (_, val) => { setEntityData({ ...val }); },
		},
		{
			label       : 'Billing Party Address',
			name        : 'billing_address',
			type        : 'select',
			options     : getAddressOptions(entityData?.addresses),
			placeholder : 'Select Address',
			span        : 6,
			rules       : {
				required: true,
			},
		},
		{
			name        : 'collection_party',
			label       : 'Collection Party',
			type        : 'async-select',
			labelKey    : 'business_name',
			renderLabel : (item) => `${item?.business_name} (${item?.display_name})`,
			placeholder : 'Select Collection Party',
			asyncKey    : 'list_organization_trade_parties',
			initialCall : true,
			span        : 6,
			params      : {
				billing_addresses_data_required : true,
				filters                         : {
					organization_id  : geo.uuid.freight_force_org_id,
					trade_party_type : ['collection_party', 'self'],
				},
			},
			onChange : (_, val) => { setCollectionPartyData({ ...val }); },
			rules    : {
				required: true,
			},
		},
		{
			label       : 'Collection Party Address',
			name        : 'collection_party_address',
			type        : 'select',
			options     : getAddressOptions(collectionPartyData?.billing_addresses),
			span        : 6,
			placeholder : 'Select Collection Party Address',
			rules       : {
				required: true,
			},
		},
		{
			name    : 'currency',
			label   : 'Currency',
			type    : 'select',
			rules   : { required: 'Currency is required' },
			span    : 6,
			options : currencies,
		},
		{
			span: 6,
		},
		// {
		// 	name  : 'terminalChargeReceipt',
		// 	label : type === 'terminal' ? 'Add Terminal Charge Informations'
		// 		: 'Add Gatepass Charge Informations',
		// 	span               : 6,
		// 	type               : 'fieldArray',
		// 	showButtons        : true,
		// 	showHeader         : true,
		// 	showDeleteButton   : true,
		// 	noDeleteButtonTill : 1,
		// 	value              : [
		// 		{
		// 			price           : 0,
		// 			tax_price       : 0,
		// 			total_tax_price : 0,
		// 			alias           : '',
		// 		},
		// 	],
		// 	controls: [
		// 		{
		// 			name        : 'csr_reference_number',
		// 			label       : type === 'terminal' ? 'TC Invoice Number' : 'Gatepass Invoice Number',
		// 			type        : 'text',
		// 			placeholder : 'Type TC Invoice No',
		// 			span        : 6,
		// 			rules:
		// 				{
		// 					required: 'TC Invoice No. is required',
		// 				},
		// 		},
		// 		{
		// 			name       : 'terminal_charge_document',
		// 			label      : type === 'terminal' ? 'Terminal Charge Receipt' : 'Gatepass Charge Receipt',
		// 			type       : 'file',
		// 			drag       : true,
		// 			span       : 6,
		// 			maxSize    : '10485760',
		// 			uploadType : 'aws',
		// 			accept     : '.pdf',
		// 			rules      : {
		// 				required: true,
		// 			},
		// 		},
		// 		{
		// 			name        : 'price',
		// 			label       : 'Price',
		// 			type        : 'number',
		// 			placeholder : 'Enter Sell Price',
		// 			rules       : { required: 'Price is required', min: 0 },
		// 			span        : 6,
		// 		},
		// 		{
		// 			name        : 'tax_price',
		// 			label       : 'Tax Price',
		// 			type        : 'number',
		// 			placeholder : 'Enter Tax Price',
		// 			rules       : { required: 'Price is required', min: 0 },
		// 			span        : 6,
		// 		},
		// 		{
		// 			name        : 'total_tax_price',
		// 			label       : 'Total Tax Price',
		// 			type        : 'number',
		// 			placeholder : 'Enter Total Tax Price',
		// 			rules       : { required: 'Price is required', min: 0 },
		// 			span        : 6,
		// 		},
		// 		{
		// 			name        : 'alias',
		// 			label       : 'Alias (Optional)',
		// 			type        : 'text',
		// 			placeholder : 'Enter Alias (Only if required)',
		// 			span        : 6,
		// 		},
		// 	],
		// },
	];
	return TERMINAL_CHARGE_RATE_CONTROL;
};

export default getTerminalChargeRateControl;
