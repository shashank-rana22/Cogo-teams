import { useGetAsyncOptions } from '@cogoport/forms';
import { asyncFieldsLocations } from '@cogoport/forms/utils/getAsyncFields';
import getGeoConstants from '@cogoport/globalization/constants/geo';
import { merge } from '@cogoport/utils';

const geo = getGeoConstants();

const useGetControls = ({ truckTypeToggle }) => {
	const locationAsyncOptions = useGetAsyncOptions(merge(asyncFieldsLocations(), {
		initialCall : false,
		params      : { filters: { type: ['pincode'] } },
	}));

	const serviceWiseControls = {
		ftl_freight: [
			{
				label       : 'Pickup/Drop Pincode',
				name        : 'location_id',
				placeholder : 'Search via pincode',
				type        : 'select',
				span        : 12,
				rules       : { required: 'This is required' },
				...locationAsyncOptions,
			},
			{
				name     : 'truck_body_type',
				label    : 'Truck Body Type',
				offLabel : 'Closed Body',
				onLabel  : 'Open Body',
				type     : 'toggle',
				value    : false,
			},
			{
				name      : 'truck_type',
				label     : 'Truck Type',
				type      : 'pills',
				options   : truckTypeToggle ? geo.options.open_truck : geo.options.closed_truck,
				className : 'pills_overflow',
				span      : 12,
			},
			{
				name   : 'trucks_count',
				label  : 'Number of Trucks',
				type   : 'number',
				prefix : 'Truck',
				span   : 12,
				rules  : {
					required : 'Trucks are required',
					min      : 1,
				},
			},
		],
		ltl_freight: [
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
				name        : 'packages',
				type        : 'fieldArray',
				showButtons : true,
				label       : 'Choose Package Information',
				span        : 12,
				buttonText  : 'Add More Packages',
				value       : [
					{
						packing_type   : 'pallet',
						length         : 1,
						width          : 1,
						height         : 1,
						packages_count : 1,
					},
				],
				controls: [
					{
						label       : 'Type',
						name        : 'packing_type',
						placeholder : 'Select',
						type        : 'select',
						showMessage : false,
						options     : [
							{ label: 'Pallet', value: 'pallet' },
							{ label: 'Box', value: 'box' },
						],
						rules: { required: 'Packing Type is Required' },
					},
					{
						name        : 'length',
						label       : 'Length(CM)',
						type        : 'number',
						placeholder : 'L',
						span        : 2,
						rules       : {
							required : 'Length is required',
							min      : 1,
						},
					},
					{
						name        : 'width',
						label       : 'Width(CM)',
						type        : 'number',
						placeholder : 'W',
						span        : 2,
						rules       : {
							required : 'Width is required',
							min      : 1,
						},
					},
					{
						name        : 'height',
						label       : 'Height(CM)',
						type        : 'number',
						placeholder : 'H',
						span        : 2,
						rules       : {
							required : 'Height is required',
							min      : 1,
						},
					},
					{
						label       : 'Package Weight',
						name        : 'package_weight',
						placeholder : 'Enter package weight',
						type        : 'number',
						span        : 6,
						rules       : {
							required : 'Package weight is required',
							min      : 0.0001,
						},
					},
					{
						label       : 'Count',
						name        : 'packages_count',
						placeholder : '(min 1, max 400)',
						type        : 'number',
						span        : 12,
						rules       : {
							min      : 1,
							max      : 400,
							required : 'Count is required',
						},
					},
					{
						label   : 'Handling Type',
						name    : 'handling_type',
						type    : 'select',
						options : [
							{ label: 'Stackable', value: 'stackable' },
							{ label: 'Non-stackable', value: 'non_stackable' },
						],
						span  : 6,
						rules : { required: 'Required' },
					},
				],
			},
		],
		trailer_freight: [
			{
				label       : 'Pickup/Drop Pincode',
				name        : 'location_id',
				placeholder : 'Search via pincode',
				type        : 'select',
				span        : 12,
				rules       : { required: 'This is required' },
				...locationAsyncOptions,
			},
		],
	};

	return {
		serviceWiseControls,
	};
};

export default useGetControls;
