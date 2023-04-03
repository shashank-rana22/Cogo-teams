import { useGetAsyncOptions } from '@cogoport/forms';
import { asyncFieldsLocations } from '@cogoport/forms/utils/getAsyncFields';
import { merge } from '@cogoport/utils';

const Controls = () => {
	const locationAsyncOptions = useGetAsyncOptions(merge(asyncFieldsLocations(), {
		params: { filters: { type: ['pincode'] } },
	}));

	const serviceWiseControls = {
		fcl_customs: [
			{
				name      : 'cargo_handling_type',
				label     : 'Select type of stuffing',
				type      : 'select',
				className : 'primary sm',
				options   : [
					{
						label : 'Dock Stuffing',
						value : 'stuffing_at_dock',
						type  : 'origin',
					},
					{
						label : 'Factory Stuffing',
						value : 'stuffing_at_factory',
						type  : 'origin',
					},
					{
						label       : 'Direct Port Delivery',
						value       : 'direct_port_delivery',
						description : 'You are destuffing your cargo at factory',
						type        : 'destination',
					},
					{
						label       : 'Destuffing at Factory',
						value       : 'delivery_from_dock',
						description : 'You are destuffing your cargo at dock',
						type        : 'destination',
					},
					{
						label       : 'Destuffing at CFS',
						value       : 'destuffing_at_dock',
						description : 'You are destuffing your cargo at dock',
						type        : 'destination',
					},
					{
						label       : 'DPD Without CFS',
						value       : 'dpd_without_cfs',
						description : 'DPD Without CFS',
						type        : 'destination',
					},
					{
						label       : 'DPD CFS Dock Destuffing',
						value       : 'dpd_cfs_dock_destuffing',
						description : 'DPD CFS Dock Destuffing',
						type        : 'destination',
					},
					{
						label       : 'DPD CFS Factory Destuffing',
						value       : 'dpd_cfs_factory_destuffing',
						description : 'DPD CFS Factory Destuffing',
						type        : 'destination',
					},
					{
						label       : 'Enapanelled CFS Dock Destuffing',
						value       : 'enpanelled_cfs_dock_destuffing',
						description : 'Enapanelled CFS Dock Destuffing',
						type        : 'destination',
					},
					{
						label       : 'Enapanelled CFS Factory Destuffing',
						value       : 'enpanelled_cfs_factory_destuffing',
						description : 'Enapanelled CFS Factory Destuffing',
						type        : 'destination',
					},
					{
						label       : ' Non-Enapanelled CFS Factory Destuffing',
						value       : 'non_enpanelled_cfs_factory_destuffing',
						description : 'Non-Enapanelled CFS Factory Destuffing',
						type        : 'destination',
					},
					{
						label       : 'Non-Enapanelled CFS Dock Destuffing',
						value       : 'non_enpanelled_cfs_dock_destuffing',
						description : 'Non-Enapanelled CFS Dock Destuffing',
						type        : 'destination',
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
				...locationAsyncOptions,
				label       : 'Pickup/Drop Pincode',
				// name        : 'location_id',
				placeholder : 'Search via pincode',
				type        : 'select',
				caret       : true,
				className   : 'primary sm',
				span        : 12,
				rules       : { required: 'This is required' },
			},
		],
		ftl_freight: [
			{
				...locationAsyncOptions,
				label          : 'Pickup/Drop Pincode',
				name           : 'location_id',
				placeholder    : 'Search via pincode',
				type           : 'location-select',
				caret          : true,
				className      : 'primary sm',
				optionsListKey : 'locations',
				span           : 12,
				rules          : { required: 'This is required' },
				params         : { filters: { type: ['pincode'] } },
			},
			{
				name       : 'truck_type',
				label      : '',
				type       : 'select',
				selectType : 'pills',
				className  : 'primary sm',
				span       : 12,
				lg         : 12,
			},
			{
				name          : 'trucks_count',
				label         : 'Number of Trucks',
				type          : 'number',
				prefix        : 'truck',
				span          : 12,
				className     : 'primary sm',
				isShowStepper : false,
				min           : 1,
			},
		],
		haulage_freight : [],
		fcl_cfs         : [
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
						type  : 'origin',
					},
					{
						label : 'DPD without cfs',
						value : 'dpd_without_cfs',
						type  : 'destination',
					},
					{
						label : 'DPD cfs dock destuffing',
						value : 'dpd_cfs_dock_destuffing',
						type  : 'destination',
					},
					{
						label : 'DPD cfs factory destuffing',
						value : 'dpd_cfs_factory_destuffing',
						type  : 'destination',
					},
					{
						label : 'Enpanelled cfs dock destuffing',
						value : 'enpanelled_cfs_dock_destuffing',
						type  : 'destination',
					},
					{
						label : 'Enpanelled cfs factory destuffing',
						value : 'enpanelled_cfs_factory_destuffing',
						type  : 'destination',
					},
					{
						label : 'Non-enpanelled cfs dock destuffing',
						value : 'non_enpanelled_cfs_dock_destuffing',
						type  : 'destination',
					},
					{
						label : 'Non-enpanelled cfs factory destuffing',
						value : 'non_enpanelled_cfs_factory_destuffing',
						type  : 'destination',
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

export default Controls;
