import useGetAsyncOptionsMicroservice from '@cogoport/forms/hooks/useGetAsyncOptionsMicroservice';
import { asyncFieldsExpertiseConfigurations } from '@cogoport/forms/utils/getAsyncFields';

const getControls = ({ modifiedControls = [] }) => {
	// const conditions = useGetAsyncOptionsMicroservice(asyncFieldsExpertiseConfigurations() || {});

	const asyncControl = useGetAsyncOptionsMicroservice({
		labelKey     : 'condition_name',
		valueKey     : 'event_configuration_id',
		endpoint     : '/kam_expertise_event_configuration_name',
		authkey      : 'get_allocation_kam_expertise_event_configuration_name',
		microService : 'allocation',
		initialCall  : false,
	});

	return [
		{
			name        : 'event_configuration_rule_mapping_id',
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

export default getControls;
