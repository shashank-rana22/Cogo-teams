import { asyncKamExpertiseGroupOptions } from '@cogoport/forms';
import useGetAsyncOptionsMicroservice from '@cogoport/forms/hooks/useGetAsyncOptionsMicroservice';

const useGetControls = ({ expertiseTypeWatch, t = () => {} }) => {
	const asyncControlOptions = useGetAsyncOptionsMicroservice({
		...asyncKamExpertiseGroupOptions(),
		initialCall : false,
		params      : {
			status  : 'live',
			filters : {
				expertise_type: expertiseTypeWatch,
			},
		},
	});

	return [
		{
			name    : 'expertise_type',
			label   : t('allocation:expertise_type_label'),
			type    : 'select',
			options : [
				{ value: 'customer_expertise', label: t('allocation:expertise_type_options_customer_expertise') },
				{ value: 'trade_expertise', label: t('allocation:expertise_type_options_trade_expertise') },
				{ value: 'commodity_expertise', label: t('allocation:expertise_type_options_commodity_expertise') },
				{
					value : 'miscellaneous_expertise',
					label : t('allocation:expertise_type_options_miscellaneous_expertise'),
				},
			],
			rules: {
				required: t('allocation:expertise_type_rules_required'),
			},
			isClearable: true,
		},
		{
			name  : 'condition_name',
			label : t('allocation:condition_name_label'),
			type  : 'text',
			rules : {
				required : t('allocation:condition_name_rules_required'),
				validate : (value) => (value.includes("'") ? t('allocation:condition_name_rules_validate') : undefined),
			},
		},
		{
			name        : 'group_name',
			label       : t('allocation:group_name_label'),
			type        : 'creatableSelect',
			isClearable : true,
			disabled    : !expertiseTypeWatch,
			...(asyncControlOptions),
		},
		{
			name    : 'event_state_on',
			label   : t('allocation:event_state_on_label'),
			type    : 'select',
			options : [
				{ value: 'in_progress', label: t('allocation:event_state_on_options_in_progress') },
				{ value: 'completed', label: t('allocation:event_state_on_options_completed') },
			],
			rules: {
				required: t('allocation:event_state_on_rules_required'),
			},
			isClearable: true,
		},
		{
			name        : 'description',
			label       : t('allocation:description_label'),
			type        : 'textarea',
			placeholder : t('allocation:description_placeholder'),
		},
	];
};

export default useGetControls;
