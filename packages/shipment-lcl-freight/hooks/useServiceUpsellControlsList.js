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
		lcl_customs : [],
		ltl_freight : [
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
						dimensions     : { length: 1, width: 1, height: 1 },
						packages_count : 1,
					},
				],
				controls: [
					{
						label       : 'Type',
						name        : 'packing_type',
						placeholder : 'Select',
						type        : 'select',
						style       : {
							control: {
								fontSize   : '12px',
								lineHeight : '14px',
								color      : 'black',
								minHeight  : '24px',
								height     : '24px',
							},
							indicatorsContainer: { display: 'none' },
						},
						showMessage : false,
						options     : [
							{ label: 'Pallet', value: 'pallet' },
							{ label: 'Box', value: 'box' },
						],
						rules : { required: 'Required' },
						xs    : 3,
						lg    : 3,
						span  : 3,
					},
					{
						name          : 'dimensions',
						label         : 'Dimensions',
						type          : 'input-group',
						className     : 'small-input medium-input',
						subLabel      : 'CM',
						xs            : 6,
						lg            : 6,
						span          : 4,
						showMessage   : false,
						inputControls : [
							{
								name        : 'length',
								type        : 'number',
								placeholder : 'L',
							},
							{
								name        : 'width',
								type        : 'number',
								span        : 4,
								placeholder : 'W',
							},
							{
								name        : 'height',
								type        : 'number',
								placeholder : 'H',
							},
						],
						rules: { required: 'Required' },
					},
					{
						label       : 'Package Weight',
						name        : 'package_weight',
						placeholder : 'Enter package weight',
						type        : 'number',
						span        : 4,
						rules       : { required: 'Required' },
					},
					{
						label         : 'Count',
						name          : 'packages_count',
						placeholder   : '(min 1, max 400)',
						type          : 'number',
						span          : 12,
						isShowStepper : false,
						max           : 400,
						min           : 1,
						xs            : 2,
						lg            : 2,
						showMessage   : false,
						rules         : { min: 1 },
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
	};

	return {
		serviceWiseControls,
	};
};

export default useGetControls;
