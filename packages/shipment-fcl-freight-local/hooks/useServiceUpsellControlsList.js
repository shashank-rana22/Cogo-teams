import { useGetAsyncOptions } from '@cogoport/forms';
import { asyncFieldsLocations } from '@cogoport/forms/utils/getAsyncFields';
import getGeoConstants from '@cogoport/globalization/constants/geo';
import { merge } from '@cogoport/utils';

const useGetControls = ({ truckTypeToggle }) => {
	const locationAsyncOptions = useGetAsyncOptions(merge(asyncFieldsLocations(), {
		initialCall : false,
		params      : { filters: { type: ['pincode'] } },
	}));

	const geo = getGeoConstants();

	const serviceWiseControls = {
		fcl_customs: [
			{
				name    : 'cargo_handling_type',
				label   : 'Select type of stuffing',
				type    : 'select',
				options : [
					{
						label : 'Dock Stuffing',
						value : 'stuffing_at_dock',
						type  : 'export',
					},
					{
						label : 'Factory Stuffing',
						value : 'stuffing_at_factory',
						type  : 'export',
					},
					{
						label       : 'Direct Port Delivery',
						value       : 'direct_port_delivery',
						description : 'You are destuffing your cargo at factory',
						type        : 'import',
					},
					{
						label       : 'Destuffing at Factory',
						value       : 'delivery_from_dock',
						description : 'You are destuffing your cargo at dock',
						type        : 'import',
					},
					{
						label       : 'Destuffing at CFS',
						value       : 'destuffing_at_dock',
						description : 'You are destuffing your cargo at dock',
						type        : 'import',
					},
					{
						label       : 'DPD Without CFS',
						value       : 'dpd_without_cfs',
						description : 'DPD Without CFS',
						type        : 'import',
					},
					{
						label       : 'DPD CFS Dock Destuffing',
						value       : 'dpd_cfs_dock_destuffing',
						description : 'DPD CFS Dock Destuffing',
						type        : 'import',
					},
					{
						label       : 'DPD CFS Factory Destuffing',
						value       : 'dpd_cfs_factory_destuffing',
						description : 'DPD CFS Factory Destuffing',
						type        : 'import',
					},
					{
						label       : 'Enapanelled CFS Dock Destuffing',
						value       : 'enpanelled_cfs_dock_destuffing',
						description : 'Enapanelled CFS Dock Destuffing',
						type        : 'import',
					},
					{
						label       : 'Enapanelled CFS Factory Destuffing',
						value       : 'enpanelled_cfs_factory_destuffing',
						description : 'Enapanelled CFS Factory Destuffing',
						type        : 'import',
					},
					{
						label       : ' Non-Enapanelled CFS Factory Destuffing',
						value       : 'non_enpanelled_cfs_factory_destuffing',
						description : 'Non-Enapanelled CFS Factory Destuffing',
						type        : 'import',
					},
					{
						label       : 'Non-Enapanelled CFS Dock Destuffing',
						value       : 'non_enpanelled_cfs_dock_destuffing',
						description : 'Non-Enapanelled CFS Dock Destuffing',
						type        : 'import',
					},
				],
				xs    : 12,
				lg    : 12,
				span  : 12,
				rules : { required: 'Type of stuffing at origin is required' },
			},
		],

		trailer_freight: [
			{
				label       : 'Pickup/Drop Pincode',
				name        : 'location_id',
				placeholder : 'Search via pincode',
				type        : 'select',
				caret       : true,
				className   : 'primary sm',
				span        : 12,
				rules       : { required: 'This is required' },
				...locationAsyncOptions,
			},
		],

		ftl_freight: [
			{
				label       : 'Pickup/Drop Pincode',
				name        : 'location_id',
				placeholder : 'Search via pincode',
				type        : 'select',
				caret       : true,
				className   : 'primary sm',
				span        : 12,
				rules       : { required: 'This is required' },
				...locationAsyncOptions,
			},
			{
				name     : 'truck_body_type',
				offLabel : 'Closed Body',
				onLabel  : 'Open Body',
				type     : 'toggle',
				value    : false,
			},
			{
				name      : 'truck_type',
				type      : 'chips',
				options   : truckTypeToggle ? geo.options.open_truck : geo.options.closed_truck,
				className : 'primary sm',
				span      : 12,
				lg        : 12,
			},
			{
				name      : 'trucks_count',
				label     : 'Number of Trucks',
				type      : 'number',
				prefix    : 'Truck',
				span      : 12,
				className : 'primary sm',
				min       : 1,
			},
		],

		haulage_freight: [],

		fcl_cfs: [
			{
				name      : 'cargo_handling_type',
				label     : 'Select type of stuffing',
				type      : 'select',
				span      : 12,
				className : 'primary sm',
				options   : [
					{ label: 'Dock Stuffing', value: 'stuffing_at_dock', type: 'origin' },
					{
						label : 'Factory Stuffing',
						value : 'stuffing_at_factory',
						type  : 'export',
					},
					{
						label : 'DPD without cfs',
						value : 'dpd_without_cfs',
						type  : 'import',
					},
					{
						label : 'DPD cfs dock destuffing',
						value : 'dpd_cfs_dock_destuffing',
						type  : 'import',
					},
					{
						label : 'DPD cfs factory destuffing',
						value : 'dpd_cfs_factory_destuffing',
						type  : 'import',
					},
					{
						label : 'Enpanelled cfs dock destuffing',
						value : 'enpanelled_cfs_dock_destuffing',
						type  : 'import',
					},
					{
						label : 'Enpanelled cfs factory destuffing',
						value : 'enpanelled_cfs_factory_destuffing',
						type  : 'import',
					},
					{
						label : 'Non-enpanelled cfs dock destuffing',
						value : 'non_enpanelled_cfs_dock_destuffing',
						type  : 'import',
					},
					{
						label : 'Non-enpanelled cfs factory destuffing',
						value : 'non_enpanelled_cfs_factory_destuffing',
						type  : 'import',
					},
				],
				xs    : 12,
				lg    : 12,
				rules : { required: 'Type of stuffing at origin is required' },
			},
		],
	};

	return {
		serviceWiseControls,
	};
};

export default useGetControls;
