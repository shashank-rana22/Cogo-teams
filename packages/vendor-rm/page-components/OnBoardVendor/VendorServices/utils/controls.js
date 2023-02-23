import categoryOptions from './category-options';

const getControls = () => [
	{
		name               : 'services',
		label              : 'Office Details',
		type               : 'fieldArray',
		buttonText         : 'Add',
		noDeleteButtonTill : 1,
		showLabelOnce      : true,
		controls           : [
			{
				name        : 'category',
				label       : 'Select Category',
				type        : 'select',
				placeholder : 'Select a Category',
				options     : categoryOptions,
				style       : { flexBasis: '30%' },
				rules       : { required: 'Category is required' },
			},
			{
				name        : 'sub_category',
				label       : 'Select Sub-category',
				type        : 'select',
				placeholder : 'Select a sub-category',
				style       : { flexBasis: '30%' },
				rules       : { required: 'Sub-category is required' },
			},
			{
				name        : 'cogoport_office_id',
				label       : 'Select Cogoport Office',
				type        : 'select',
				placeholder : 'Select Location',
				style       : { flexBasis: '30%' },
				options     : [
					{ label: 'Delhi', value: 'd1cd0599-7d89-4219-878e-dc0cbf579948' },
					{ label: 'Coimbatore', value: '61fe95e4-b00a-48f2-b0c6-a58174b7f9dd' },
					{ label: 'Bangalore', value: '26d74ffd-3e85-475c-ab59-99834d1b30fa' },
					{ label: 'Chennai', value: 'cf0b03ed-e4dd-4223-868d-28ad2be715c3' },
					{ label: 'Kolkata', value: 'b721cfa0-f082-4c9c-b85b-2b34e0812066' },
					{ label: 'Noida', value: '601d392b-1e56-4d19-b388-eab84d6e783a' },
					{ label: 'Ambala', value: '4818c333-4680-4365-807a-3774102c1141' },
					{ label: 'Gurgaon', value: '9cf87c31-f991-4351-976d-3abd7eff374d' },
					{ label: 'Haldia', value: '80951077-2790-4c59-92de-daf9fc66307f' },
					{ label: 'Ludhiana', value: '5c540315-40f5-4ef2-bad8-5a982d9c3c94' },
					{ label: 'Kochi', value: '51396881-2ee6-4171-b991-3cf6f342ec04' },
					{ label: 'Hyderabad', value: '9a7cdac9-d585-4e2f-8165-56aafe1df8f3' },
					{ label: 'Pune', value: '59baa839-29d8-4f4f-9d9b-1eabe9e6729f' },
					{ label: 'Jaipur', value: '5d1449fe-25d8-45dc-9906-ee1360728587' },
					{ label: 'Raipur', value: '372dea42-f37a-43be-b95f-a8ad2b00fd8e' },
					{ label: 'Ahmedabad', value: '93523420-62c1-41cb-b2d1-8c4eff928c88' },
					{ label: 'Vadodara', value: 'e6d5764c-62a0-4038-a157-7d5261a824d4' },
					{ label: 'Mumbai', value: '48a489eb-76d3-419a-bffc-dac6715056d3' },
					{ label: 'Rudrapur', value: '68d0e107-5879-4b5c-b0ca-de99230aaf38' },
					{ label: 'Bagdogra', value: 'b906d557-c80f-4819-bfc1-f59d3ebad6ac' },
					{ label: 'Ho Chi Minh', value: 'edaccd90-ee23-4238-b1c1-e15aa9532366' },
				],
				rules: { required: 'Office Location is required' },
			},
		],
	},
];

export default getControls;
