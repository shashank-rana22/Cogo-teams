import useGetAsyncOptionsMicroservice from '@cogoport/forms/hooks/useGetAsyncOptionsMicroservice';

const useGetControls = ({ modifiedControls = [], typeFilter, showModal = false, t = () => {} }) => {
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
			label       : t('allocation:event_configuration_detail_id_label'),
			placeholder : '',
			...asyncControl,
			type        : 'select',
			rules       : {
				required: t('allocation:event_configuration_detail_id_rules_required'),
			},
			isClearable: true,
		},
		{
			name        : 'scoring_type',
			label       : t('allocation:scoring_type_label'),
			placeholder : '',
			type        : 'select',
			options     : [
				{ value: 'absolute', label: t('allocation:scoring_type_options_absolute') },
				{ value: 'percentage', label: t('allocation:scoring_type_options_percentage') },
				{ value: 'tat', label: t('allocation:scoring_type_options_tat') },
			],
			rules: {
				required: t('allocation:scoring_type_rules_required'),
			},
			isClearable: true,
		},
		...modifiedControls,
		{
			name    : 'impact',
			label   : t('allocation:impact_label'),
			type    : 'select',
			options : [
				{ value: 'low', label: t('allocation:impact_options_low') },
				{ value: 'medium', label: t('allocation:impact_options_medium') },
				{ value: 'high', label: t('allocation:impact_options_high') },
			],
			rules: {
				required: t('allocation:impact_rules_required'),
			},
			isClearable: true,
		},
	];
};

export default useGetControls;
