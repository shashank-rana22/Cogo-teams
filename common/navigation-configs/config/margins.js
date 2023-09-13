const margins = {
	'/[partner_id]/margins': {
		navigation : 'margin',
		isMainNav  : true,
	},
	'/[partner_id]/margins/create': {
		isMainNav  : false,
		navigation : 'margin',
	},
	'/[partner_id]/margins/edit/[id]': {
		isMainNav  : false,
		navigation : 'margin',
	},
};

export default margins;
