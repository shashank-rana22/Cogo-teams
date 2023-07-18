import getGeoConstants from '@cogoport/globalization/constants/geo';

import RenderListLocationOption from '../../../common/RenderListLocationOption';
import getAllTruckTypeOptions from '../helpers/get-all-truck-type-options';
import getIncotermOptionsByTradeType from '../helpers/get-incoterm-options-by-trade-type';
import getListLocationParams from '../helpers/get-list-location-params';
import getServiceTypeOptions from '../helpers/get-service-type-options';

const getServiceRequirementControls = (props) => {
	const { watchShipmentMode, watchServiceType, watchTradeType, disabled } = props;

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
					value : 'rail_domestic_freight',
				},
			],
			isClearable: true,
			disabled,
		},
		{
			name        : 'service_type',
			label       : 'Service Type',
			placeholder : 'Select Type',
			type        : 'select',
			options     : getServiceTypeOptions({ watchShipmentMode }),
			isClearable : true,
			showElement : {
				shipmentMode: ['ocean', 'air', 'surface', 'haulage'],
			},
			disabled,
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
			isClearable : true,
			showElement : {
				serviceType: ['fcl_freight', 'lcl_freight', 'air_international'],
			},
			disabled,
		},
		{
			name        : 'origin_location',
			label       : 'Origin Country/Port',
			placeholder : 'Select Origin',
			type        : 'asyncSelect',
			asyncKey    : 'list_locations',
			valueKey    : 'value',
			initialCall : false,
			params      : {
				page_limit: 20,
				...getListLocationParams({ watchShipmentMode, watchServiceType }),
			},
			isClearable        : true,
			renderLabel        : (item) => <RenderListLocationOption item={item} />,
			getModifiedOptions : ({ options }) => options.map(
				(option) => ({ ...option, value: `${option.id}_${option.name}` }),
			),
			disabled,
		},
		{
			name        : 'destination_location',
			label       : 'Destination Country/Port',
			placeholder : 'Select Destination',
			type        : 'asyncSelect',
			asyncKey    : 'list_locations',
			valueKey    : 'value',
			initialCall : false,
			params      : {
				page_limit: 20,
				...getListLocationParams({ watchShipmentMode, watchServiceType }),
			},
			isClearable        : true,
			renderLabel        : (item) => <RenderListLocationOption item={item} />,
			getModifiedOptions : ({ options }) => options.map(
				(option) => ({ ...option, value: `${option.id}_${option.name}` }),
			),
			disabled,
		},
		{
			name        : 'inco_term',
			label       : 'Incoterm',
			placeholder : 'Select Incoterm',
			type        : 'multiSelect',
			options     : getIncotermOptionsByTradeType({ trade_type: watchTradeType }),
			isClearable : true,
			showElement : {
				serviceType: ['fcl_freight', 'lcl_freight', 'air_international'],
			},
			disabled,
		},
		{
			name        : 'hs_codes',
			label       : 'Commodity Details (HS Code)',
			placeholder : 'Select HS Code',
			type        : 'asyncSelect',
			multiple    : true,
			asyncKey    : 'list_hs_codes',
			valueKey    : 'hs_code',
			isClearable : true,
			showElement : {
				serviceType: ['fcl_freight', 'lcl_freight', 'air_domestic', 'air_international'],
			},
			renderLabel: ({ name = '', hs_code = '' }) => `${name} (${hs_code})`,
			disabled,
		},
		{
			name        : 'container_count',
			label       : 'Container Count',
			placeholder : 'Count',
			type        : 'number',
			min         : 0,
			isClearable : true,
			showElement : {
				serviceType: ['fcl_freight'],
			},
			disabled,
		},
		{
			name        : 'cargo_weight',
			label       : 'Cargo Weight (in Kg)',
			placeholder : 'Weight',
			type        : 'number',
			min         : 0,
			isClearable : true,
			showElement : {
				serviceType: ['fcl_freight', 'lcl_freight'],
			},
			disabled,
		},
		{
			name        : 'volume',
			label       : 'Volume (in CBM)',
			placeholder : 'Volume',
			type        : 'text',
			isClearable : true,
			showElement : {
				serviceType: ['lcl_freight', 'air_domestic', 'air_international'],
			},
			disabled,
		},
		{
			name        : 'container_size',
			label       : 'Container Size',
			placeholder : 'Size',
			type        : 'multiSelect',
			options     : [
				{
					label : '20ft',
					value : '20',
				},
				{
					label : '40ft',
					value : '40',
				},
				{
					label : '40ft HC',
					value : '40 HC',
				},
				{
					label : '45ft HC',
					value : '45 HC',
				},
			],
			isClearable : true,
			showElement : {
				shipmentMode : ['rail_domestic'],
				serviceType  : ['fcl_freight', 'trailer_freight', 'haulage_freight', 'barge_freight'],
			},
			disabled,
		},
		{
			name        : 'container_type',
			label       : 'Container Type',
			placeholder : 'Type',
			type        : 'multiSelect',
			options     : geo.options.freight_container_types,
			isClearable : true,
			showElement : {
				shipmentMode : ['rail_domestic'],
				serviceType  : ['fcl_freight', 'trailer_freight', 'haulage_freight', 'barge_freight'],
			},
			disabled,
		},
		{
			name        : 'truck_type',
			label       : 'Truck Type',
			placeholder : 'Truck Type',
			type        : 'multiSelect',
			options     : getAllTruckTypeOptions(),
			isClearable : true,
			showElement : {
				serviceType: ['ftl_freight'],
			},
			disabled,
		},
	];

	return controls;
};

export default getServiceRequirementControls;
