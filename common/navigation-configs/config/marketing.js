const marketing = {
	'/[partner_id]/marketing/campaign-dashboard': {
		layoutType : 'no_header',
		navigation : 'marketing-campaign_dashboard',
		isMainNav  : true,
	},
	'/[partner_id]/marketing/segmentation': {
		layoutType : 'no_header',
		navigation : 'marketing-marketing_segmentation',
		isMainNav  : true,
	},
	'/[partner_id]/marketing/communication-control': {
		layoutType : 'no_header',
		navigation : 'marketing-marketing_communication_control',
		isMainNav  : true,
	},
	'/[partner_id]/marketing/communication-control/[company_id]': {
		layoutType : 'no_header',
		navigation : 'marketing-marketing_communication_control',
		isMainNav  : false,
	},
};

export default marketing;
