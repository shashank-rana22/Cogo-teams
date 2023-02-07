import useGetAsyncOptions from '@cogoport/forms/hooks/useGetAsyncOptions';

export const getControls = () => {
	const currentDate = new Date();
	const year = currentDate.getFullYear();

	const partnerOptions = useGetAsyncOptions({
		endpoint    : 'list_partner_users',
		initialCall : false,
		params      : {
			filters: {
				reporting_level      : 0,
				reporting_manager_id : '7c6c1fe7-4a4d-4f3a-b432-b05ffdec3b44',
			},
		},
		valueKey : 'user_id',
		labelKey : 'name',
	});

	return [
		{
			...partnerOptions,
			label          : 'Manager Name',
			name           : 'performed_by_id',
			placeholder    : 'Search via name',
			type           : 'select',
			defaultOptions : true,
			isClearable    : true,
			span           : 12,
			validations    : [{ type: 'required', message: 'Required' }],
		},
		{
			name           : 'rating',
			label          : 'Rating',
			type           : 'select',
			defaultOptions : true,
			isClearable    : true,
			placeholder    : 'Rating',
			options        : [
				{ label: '1', value: 1 },
				{ label: '2', value: 2 },
				{ label: '3', value: 3 },
				{ label: '4', value: 4 },
				{ label: '5', value: 5 },
			],
			span: 12,
		},
		{
			name           : 'created_at_month',
			label          : 'Select Month',
			type           : 'select',
			defaultOptions : true,
			isClearable    : true,
			placeholder    : 'Month',
			options        : [
				{ label: 'January', value: 1 },
				{ label: 'February', value: 2 },
				{ label: 'March', value: 3 },
				{ label: 'April', value: 4 },
				{ label: 'May', value: 5 },
				{ label: 'June', value: 6 },
				{ label: 'July', value: 7 },
				{ label: 'August', value: 8 },
				{ label: 'September', value: 9 },
				{ label: 'October', value: 10 },
				{ label: 'November', value: 11 },
				{ label: 'December', value: 12 },
			],
			span: 6,
		},
		{
			name           : 'created_at_year',
			label          : 'Select Year',
			type           : 'select',
			defaultOptions : true,
			isClearable    : true,
			placeholder    : 'Year',
			options        : [
				{ label: `${year}`, value: year },
				{ label: `${year - 1}`, value: year - 1 },
				{ label: `${year - 2}`, value: year - 2 },
			],
			span: 6,
		},
	];
};
