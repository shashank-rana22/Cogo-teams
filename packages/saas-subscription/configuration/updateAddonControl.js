const getUpdateAddonControl = ({ t }) => [{
	name     : 'updateAddon',
	type     : 'fieldArray',
	controls : [
		{
			name        : 'product_id',
			type        : 'asyncSelect',
			asyncKey    : 'addon_list',
			placeholder : t('saasSubscription:update_addon_name'),
			size        : 'sm',
			width       : '40%',
			rules       : {
				required: true,
			},
		},
		{
			name        : 'count',
			type        : 'number',
			placeholder : t('saasSubscription:update_addon_count'),
			size        : 'sm',
			width       : '25%',
			rules       : {
				required : true,
				min      : {
					value   : -1,
					message : t('saasSubscription:update_addon_count_err'),
				},
			},
		},
		{
			name        : 'discount',
			type        : 'number',
			placeholder : t('saasSubscription:update_addon_discount'),
			size        : 'sm',
			width       : '25%',
			rules       : {
				required : true,
				min      : {
					value   : 0,
					message : t('saasSubscription:update_addon_discount_err'),
				},
			},
		},
	],
}];

const ADDON_DEFAULT_VALUE = {
	product_id : '',
	count      : 0,
	discount   : 0,
};

export default getUpdateAddonControl;
export { ADDON_DEFAULT_VALUE };
