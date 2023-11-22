import containerSize from '@cogoport/constants/container-sizes.json';
import containertypes from '@cogoport/constants/container-types.json';
import getCommodityList from '@cogoport/globalization/utils/getCommodityList';

// import SERVICE_OPTIONS from '../../../config/SERVICE_OPTIONS.json';

const getControls = ({ activeTab = '' }) => {
	const account_type = (activeTab === 'supply' ? 'service_provider' : 'importer_exporter');

	const commoditiesOptions = getCommodityList('freight');

	const controls = [
		// {
		// 	label       : 'Select any Service',
		// 	name        : 'service',
		// 	placeholder : 'Drop down to select',
		// 	type        : 'select',
		// 	multiple    : false,
		// 	watch       : true,
		// 	options     : SERVICE_OPTIONS?.service,
		// 	span        : 12,
		// },
		{
			label       : 'Select any Organization',
			name        : 'organization_id',
			type        : 'async_select',
			asyncKey    : 'organizations',
			multiple    : false,
			isClearable : true,
			params      : {
				filters: {
					account_type,
				},
			},
			span: 12,
		},
		{
			label       : 'Select Trade Type',
			name        : 'trade_type',
			type        : 'select',
			placeholder : 'Drop down to select',
			multiple    : false,
			watch       : true,
			options     : [
				{ label: 'Import', value: 'import' },
				{ label: 'Export', value: 'export' },
				{ label: 'Domestic', value: 'domestic' },
			],
			span: 12,
		},
		{
			label       : 'Select Rate Type',
			name        : 'rate_type',
			type        : 'multi_select',
			placeholder : 'Drop down to select',
			watch       : true,
			options     : [
				{ label: 'Marketplace Rate', value: 'marketplace_rate' },
				{ label: 'Promotional Rate', value: 'promotional' },
				{ label: 'Cogo Assured Rate', value: 'cogo_assured_rate' },
				{ label: 'Spot Booking', value: 'spot_booking' },
			],
			span: 12,
		},
		{
			label       : 'Select Organization Type',
			name        : 'organization_type',
			type        : 'select',
			watch       : true,
			multiple    : false,
			placeholder : 'Select Organization Type',
			options     : [
				{ label: 'Importer Exporter', value: 'importer_exporter' },
				{ label: 'Channel Partner', value: 'channel_partner' },
			],
			span: 12,
		},
		{
			label       : 'Select Container SIze',
			name        : 'container_size',
			type        : 'select',
			placeholder : 'Drop down to select',
			multiple    : false,
			watch       : true,
			options     : containerSize,
			span        : 12,
		},
		{
			label       : 'Select Container Type',
			name        : 'container_type',
			type        : 'select',
			placeholder : 'Drop down to select',
			multiple    : false,
			watch       : true,
			options     : containertypes,
			span        : 12,
		},
		{
			label       : 'Select Commodity',
			name        : 'commodity',
			type        : 'select',
			placeholder : 'Drop down to select',
			multiple    : false,
			watch       : true,
			options     : commoditiesOptions,
			span        : 12,
		},
	];
	return { controls };
};

export default getControls;
