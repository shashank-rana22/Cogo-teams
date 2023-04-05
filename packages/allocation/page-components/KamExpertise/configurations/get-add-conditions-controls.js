import useGetAsyncOptionsMicroservice from '@cogoport/forms/hooks/useGetAsyncOptionsMicroservice';

const useGetControls = ({ modifiedControls = [], typeFilter, showModal = false }) => {
	const asyncControl = useGetAsyncOptionsMicroservice({
		labelKey : 'condition_name',
		valueKey : 'id',
		endpoint : '/kam_expertise_event_configuration_name',
		authkey  : 'get_allocation_kam_expertise_event_configuration_name',
		params   : {
			filters: { expertise_type: typeFilter },
		},
		microService : 'allocation',
		initialCall  : showModal,
	});

	return [
		{
			name        : 'event_configuration_detail_id',
			label       : 'Condition Name',
			placeholder : '',
			...asyncControl,
			type        : 'select',
			rules       : {
				required: 'Condition Parameter is required',
			},
			isClearable: true,
		},
		{
			name        : 'scoring_type',
			label       : 'Score Type',
			placeholder : '',
			type        : 'select',
			options     : [
				{ value: 'absolute', label: 'Absolute' },
				{ value: 'percentage', label: 'Percentage' },
				{ value: 'tat', label: 'TAT' },
			],
			rules: {
				required: 'Score Type is required',
			},
			isClearable: true,
		},
		...modifiedControls,
		{
			name    : 'impact',
			label   : 'Impact',
			type    : 'select',
			options : [
				{ value: 'low', label: 'Low' },
				{ value: 'medium', label: 'Medium' },
				{ value: 'high', label: 'High' },
			],
			rules: {
				required: 'Impact is required',
			},
			isClearable: true,
		},
	];
};

export default useGetControls;
