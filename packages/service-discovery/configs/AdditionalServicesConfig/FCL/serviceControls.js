import { IcMLocation } from '@cogoport/icons-react';

import CustomSelectOption from '../../../common/CustomSelectOption';

const controls = () => [
	{
		name    : 'stuffing_type',
		label   : 'Stuffing',
		type    : 'select',
		caret   : true,
		options : [
			{
				value : 'stuffing_at_factory',
				label : 'Factory Stuffing',
			},
			{
				value : 'stuffing_at_dock',
				label : 'Dock Stuffing',
			},
		],
		style : { width: 200 },
		rules : { required: 'This is required' },
	},
	{
		name        : 'origin_warehouse_id',
		type        : 'async-select',
		label       : 'Origin Warehouse',
		placeholder : 'select location',
		asyncKey    : 'list_locations',
		initialCall : false,
		span        : 6,
		params      : {
			page_limit      : 20,
			includes        : { default_params_required: true },
			// filters         : { type, status: 'active' },
			recommendations : true,
		},
		prefix      : <IcMLocation fontSize={16} />,
		isClearable : true,
		style       : { width: 250 },
		rules       : { required: 'Origin is required' },
		renderLabel : (option) => <>{CustomSelectOption({ data: option, key: 'locations' })}</>,

	},
	{
		name    : 'destuffing_type',
		label   : 'De-Stuffing',
		type    : 'select',
		caret   : true,
		span    : 12,
		style   : { width: 300 },
		options : [
			{
				label : 'Direct Port Delivery',
				value : 'direct_port_delivery',
			},
			{
				label : 'Destuffing at Factory',
				value : 'delivery_from_dock',
			},
			{
				label : 'Destuffing at CFS',
				value : 'destuffing_at_dock',
			},
			{
				label : 'DPD Without CFS',
				value : 'dpd_without_cfs',
			},
			{
				label : 'DPD CFS Dock Destuffing',
				value : 'dpd_cfs_dock_destuffing',
			},
			{
				label : 'DPD CFS Factory Destuffing',
				value : 'dpd_cfs_factory_destuffing',
			},
			{
				label : 'Enapanelled CFS Dock Destuffing',
				value : 'enpanelled_cfs_dock_destuffing',
			},
			{
				label : 'Enapanelled CFS Factory Destuffing',
				value : 'enpanelled_cfs_factory_destuffing',
			},
			{
				label : ' Non-Enapanelled CFS Factory Destuffing',
				value : 'non_enpanelled_cfs_factory_destuffing',
			},
			{
				label : 'Non-Enapanelled CFS Dock Destuffing',
				value : 'non_enpanelled_cfs_dock_destuffing',
			},
		],
		rules: { required: 'This is required' },
	},
	{
		name        : 'destination_warehouse_id',
		type        : 'async-select',
		label       : 'Destination Warehouse',
		placeholder : 'select location',
		asyncKey    : 'list_locations',
		initialCall : false,
		span        : 6,
		params      : {
			page_limit      : 20,
			includes        : { default_params_required: true },
			// filters         : { type, status: 'active' },
			recommendations : true,
		},
		prefix      : <IcMLocation fontSize={16} />,
		isClearable : true,
		style       : { width: 250 },
		rules       : { required: 'Origin is required' },
		renderLabel : (option) => <>{CustomSelectOption({ data: option, key: 'locations' })}</>,
	},

];

export default controls;
