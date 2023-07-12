import getGeoConstants from '@cogoport/globalization/constants/geo';

import getAllTruckTypeOptions from '../helpers/get-all-truck-type-options';
import getIncotermOptionsByTradeType from '../helpers/get-incoterm-options-by-trade-type';
import getServiceTypeOptions from '../helpers/get-service-type-options';

const getServiceRequirementControls = (props) => {
	const { shipmentMode } = props;

	const geo = getGeoConstants();

	const controls = [
		{
			name        : 'shipment_mode',
			label       : 'Shipment Mode',
			placeholder : 'Select Mode',
			type        : 'select',
			options     : [
				{
					label : 'Ocean',
					value : 'ocean',
				},
				{
					label : 'Air',
					value : 'air',
				},
				{
					label : 'Surface',
					value : 'surface',
				},
				{
					label : 'Haulage',
					value : 'haulage',
				},
				{
					label : 'Rail Domestic',
					value : 'rail_domestic',
				},
			],
			isClearable: true,
		},
		{
			name        : 'service_type',
			label       : 'Service Type',
			placeholder : 'Select Type',
			type        : 'select',
			options     : getServiceTypeOptions({ shipmentMode }),
			isClearable : true,
		},
		{
			name        : 'trade_type',
			label       : 'Trade Type',
			placeholder : 'Select Type',
			type        : 'select',
			options     : [
				{
					label : 'Import',
					value : 'import',
				},
				{
					label : 'Export',
					value : 'export',
				},
			],
			isClearable: true,
		},
		{
			name        : 'origin_location_id',
			label       : 'Origin Country/Port',
			placeholder : 'Select Origin',
			type        : 'asyncSelect',
			asyncKey    : 'list_locations',
			initialCall : false,
			params      : {
				filters    : { type: ['country', 'seaport', 'city'], status: 'active' },
				page_limit : 10,
				sort_by    : 'name',
				sort_type  : 'asc',
				includes   : { country: null, default_params_required: true },
			},
			isClearable: true,
		},
		{
			name        : 'destination_location_id',
			label       : 'Destination Country/Port',
			placeholder : 'Select Destination',
			type        : 'asyncSelect',
			asyncKey    : 'list_locations',
			initialCall : false,
			params      : {
				filters    : { type: ['country', 'seaport', 'city'], status: 'active' },
				page_limit : 10,
				sort_by    : 'name',
				sort_type  : 'asc',
				includes   : { country: null, default_params_required: true },
			},
			isClearable: true,
		},
		{
			name        : 'inco_term',
			label       : 'Incoterm',
			placeholder : 'Select Incoterm',
			type        : 'select',
			options     : getIncotermOptionsByTradeType({ trade_type: 'export' }),
			isClearable : true,
		},
		{
			name        : 'hs_codes',
			label       : 'Commodity Details (HS Code)',
			placeholder : 'Select HS Code',
			type        : 'asyncSelect',
			asyncKey    : 'list_hs_codes',
			valueKey    : 'name',
			isClearable : true,
		},
		{
			name        : 'container_count',
			label       : 'Container Count',
			placeholder : 'Count',
			type        : 'text',
			isClearable : true,
		},
		{
			name        : 'cargo_weight',
			label       : 'Cargo Weight',
			placeholder : 'Weight',
			type        : 'text',
			isClearable : true,
		},
		{
			name        : 'volume',
			label       : 'Volume (in CBM)',
			placeholder : 'Volume',
			type        : 'text',
			isClearable : true,
		},
		{
			name        : 'container_size',
			label       : 'Container Size',
			placeholder : 'Size',
			type        : 'select',
			options     : [
				{
					label : '20ft',
					value : '20ft',
				},
				{
					label : '40ft',
					value : '40ft',
				},
				{
					label : '40ft HC',
					value : '40ft HC',
				},
				{
					label : '45ft HC',
					value : '45ft HC',
				},
			],
			isClearable: true,
		},
		{
			name        : 'container_type',
			label       : 'Container Type',
			placeholder : 'Type',
			type        : 'select',
			options     : geo.options.freight_container_types,
			isClearable : true,
		},
		{
			name        : 'truck_type',
			label       : 'Truck Type',
			placeholder : 'Truck Type',
			type        : 'select',
			options     : getAllTruckTypeOptions(),
			isClearable : true,
		},
	];

	return controls;
};

export default getServiceRequirementControls;
