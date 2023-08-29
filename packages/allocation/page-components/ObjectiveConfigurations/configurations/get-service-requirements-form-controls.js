import getGeoConstants from '@cogoport/globalization/constants/geo';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { isEmpty } from '@cogoport/utils';

import RenderListLocationOption from '../../../common/RenderListLocationOption';
import getAllTruckTypeOptions from '../helpers/get-all-truck-type-options';
import getIncotermOptionsByTradeType from '../helpers/get-incoterm-options-by-trade-type';
import getListLocationParams from '../helpers/get-list-location-params';
import getServiceTypeOptions from '../helpers/get-service-type-options';
import getShipmentModeOptions from '../helpers/get-shipment-mode-options';

const getServiceRequirementControls = (props) => {
	const {
		watchShipmentMode,
		watchServiceType,
		watchTradeType,
		watchOriginLocation,
		watchDestinationLocation,
		lifecycleStage,
		disabled,
		t = () => {},
	} = props;

	const geo = getGeoConstants();

	const controls = [
		{
			name        : 'shipment_mode',
			label       : t('allocation:shipment_mode_label'),
			placeholder : t('allocation:shipment_mode_placeholder'),
			type        : 'select',
			options     : getShipmentModeOptions({ lifecycleStage, t }),
			isClearable : true,
			disabled,
		},
		{
			name        : 'service_type',
			label       : t('allocation:service_type_label'),
			placeholder : t('allocation:service_type_placeholder'),
			type        : 'select',
			options     : getServiceTypeOptions({ watchShipmentMode, t }),
			isClearable : true,
			showElement : {
				shipmentMode: ['ocean', 'air', 'surface', 'haulage'],
			},
			disabled,
		},
		{
			name        : 'trade_type',
			label       : t('allocation:trade_type_label'),
			placeholder : t('allocation:trade_type_placeholder'),
			type        : 'select',
			options     : [
				{
					label : t('allocation:trade_type_import'),
					value : 'import',
				},
				{
					label : t('allocation:trade_type_export'),
					value : 'export',
				},
			],
			isClearable : true,
			showElement : {
				serviceType: ['fcl_freight', 'lcl_freight', 'air_freight'],
			},
			disabled,
		},
		{
			name        : 'origin_location',
			label       : t('allocation:origin_location_label'),
			placeholder : t('allocation:origin_location_placeholder'),
			type        : 'asyncSelect',
			asyncKey    : 'list_locations',
			valueKey    : 'value',
			filterKey   : 'id',
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
			setFilterValue : ({ value }) => value.split('_')?.[GLOBAL_CONSTANTS.zeroth_index],
			rules          : {
				required: isEmpty(watchDestinationLocation) ? false : t('allocation:rules_required'),
			},
			disabled,
		},
		{
			name        : 'destination_location',
			label       : t('allocation:destination_location_label'),
			placeholder : t('allocation:destination_location_placeholder'),
			type        : 'asyncSelect',
			asyncKey    : 'list_locations',
			valueKey    : 'value',
			filterKey   : 'id',
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
			setFilterValue : ({ value }) => value.split('_')?.[GLOBAL_CONSTANTS.zeroth_index],
			rules          : {
				required: isEmpty(watchOriginLocation) ? false : t('allocation:rules_required'),
			},
			disabled,
		},
		{
			name        : 'inco_terms',
			label       : t('allocation:inco_terms_label'),
			placeholder : t('allocation:inco_terms_placeholder'),
			type        : 'multiSelect',
			options     : getIncotermOptionsByTradeType({ trade_type: watchTradeType }),
			isClearable : true,
			showElement : {
				serviceType: ['fcl_freight', 'lcl_freight', 'air_freight'],
			},
			disabled,
		},
		{
			name        : 'hs_codes',
			label       : t('allocation:hs_code_label'),
			placeholder : t('allocation:hs_code_placeholder'),
			type        : 'asyncSelect',
			multiple    : true,
			asyncKey    : 'list_hs_codes',
			valueKey    : 'hs_code',
			isClearable : true,
			showElement : {
				serviceType: ['fcl_freight', 'lcl_freight', 'domestic_air_freight', 'air_freight'],
			},
			renderLabel: ({ name = '', hs_code = '' }) => `${name} (${hs_code})`,
			disabled,
		},
		{
			name        : 'container_count',
			label       : t('allocation:container_count_label'),
			placeholder : t('allocation:container_count_placeholder'),
			type        : 'number',
			min         : 0,
			isClearable : true,
			showElement : {
				serviceType: ['fcl_freight'],
			},
			disabled,
		},
		{
			name        : 'weight',
			label       : t('allocation:weight_label'),
			placeholder : t('allocation:weight_placeholder'),
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
			label       : t('allocation:volume_label'),
			placeholder : t('allocation:volume_placeholder'),
			type        : 'text',
			isClearable : true,
			showElement : {
				serviceType: ['lcl_freight', 'domestic_air_freight', 'air_freight'],
			},
			disabled,
		},
		{
			name        : 'container_size',
			label       : t('allocation:container_size_label'),
			placeholder : t('allocation:container_size_placeholder'),
			type        : 'multiSelect',
			options     : [
				{
					label : t('allocation:container_size_20'),
					value : '20',
				},
				{
					label : t('allocation:container_size_40'),
					value : '40',
				},
				{
					label : t('allocation:container_size_40_hc'),
					value : '40 HC',
				},
				{
					label : t('allocation:container_size_45_hc'),
					value : '45 HC',
				},
			],
			isClearable : true,
			showElement : {
				shipmentMode : ['rail_domestic'],
				serviceType  : ['fcl_freight', 'trailer_freight', 'rail_freight', 'barge_freight'],
			},
			disabled,
		},
		{
			name        : 'container_type',
			label       : t('allocation:container_type_label'),
			placeholder : t('allocation:container_type_placeholder'),
			type        : 'multiSelect',
			options     : geo.options.freight_container_types,
			isClearable : true,
			showElement : {
				shipmentMode : ['rail_domestic'],
				serviceType  : ['fcl_freight', 'trailer_freight', 'rail_freight', 'barge_freight'],
			},
			disabled,
		},
		{
			name        : 'truck_type',
			label       : t('allocation:truck_type_label'),
			placeholder : t('allocation:truck_type_placeholder'),
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
