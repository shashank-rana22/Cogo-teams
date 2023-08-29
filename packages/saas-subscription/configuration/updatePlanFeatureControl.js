const getUpdatePlanFeatureControl = ({ t }) =>	[{
	name     : 'updatePlanFeature',
	type     : 'fieldArray',
	controls : [
		{
			name        : 'value',
			type        : 'text',
			placeholder : t('saasSubscription:update_plan_value'),
			size        : 'sm',
			width       : '25%',
			rules       : {
				required: true,
			},
		},
		{
			name        : 'display_name',
			type        : 'text',
			placeholder : t('saasSubscription:update_plan_name'),
			size        : 'sm',
			width       : '45%',
			rules       : {
				required: true,
			},
		},
		{
			name        : 'sequence',
			type        : 'number',
			placeholder : t('saasSubscription:update_plan_seq'),
			size        : 'sm',
			width       : '20%',
			rules       : {
				required : true,
				min      : {
					value   : 0,
					message : t('saasSubscription:update_plan_seq_err'),
				},
			},
		},
	],
}];

const PLAN_FEATURE_DEFAULT_VALUE = {
	value        : '',
	display_name : '',
	sequence     : '',
};
export default getUpdatePlanFeatureControl;
export { PLAN_FEATURE_DEFAULT_VALUE };
