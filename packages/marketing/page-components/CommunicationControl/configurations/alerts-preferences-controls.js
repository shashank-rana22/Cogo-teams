const controls = {
	user: {
		name        : 'user',
		type        : 'select',
		placeholder : 'select',
	},
	select_all: {
		name    : 'select_all',
		type    : 'checkbox',
		options : [{ label: 'Select All', value: true }],
		span    : 6,
		theme   : 'admin',
	},
	offers_discounts: {
		name    : 'offers_discounts',
		type    : 'checkbox',
		options : [{ label: 'Offers/Discounts', value: true }],
		span    : 6,
		theme   : 'admin',
	},
	subscriber_special: {
		name    : 'subscriber_special',
		type    : 'checkbox',
		options : [{ label: 'Subscriber Special', value: true }],
		span    : 6,
		theme   : 'admin',
	},
	new_product_service_launches_and_updates: {
		name    : 'new_product_service_launches_and_updates',
		type    : 'checkbox',
		options : [
			{ label: 'New product/Service launches and updates', value: true },
		],
		span  : 6,
		theme : 'admin',
	},
	product_service_explainers: {
		name    : 'product_service_explainers',
		type    : 'checkbox',
		options : [{ label: 'Product/service Explainers', value: true }],
		span    : 6,
		theme   : 'admin',
	},
	newsletter: {
		name    : 'newsletter',
		type    : 'checkbox',
		options : [{ label: 'Newsletter', value: true }],
		span    : 2,
		theme   : 'admin',
	},
	general_news: {
		name    : 'general_news',
		type    : 'checkbox',
		options : [{ label: 'General News', value: true }],
		span    : 2,
		theme   : 'admin',
	},
};
export default controls;
