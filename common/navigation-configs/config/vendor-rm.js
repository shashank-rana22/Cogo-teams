const vendorRM = {
	'/[partner_id]/vendors-list': {
		navigation : 'vendor_rm',
		isMainNav  : true,
	},
	'/[partner_id]/onboard-vendor': {
		navigation: 'vendor_rm',
	},
	'/[partner_id]/onboard-vendor/[vendor_id]': {
		navigation: 'vendor_rm',
	},
};

module.exports = vendorRM;
