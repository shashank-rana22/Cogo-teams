const saasSubscription = {
	'/[partner_id]/saas-subscription/customer': {
		navigation: 'saas_subscription-customer',
	},
	'/[partner_id]/saas-subscription/plan': {
		navigation: 'saas_subscription-plan',
	},
	'/[partner_id]/saas-subscription/plan/[sub_id]': {
		navigation : 'saas_subscription-plan',
		isMainNav  : false,
	},
};

export default saasSubscription;
