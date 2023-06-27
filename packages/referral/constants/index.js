export const TYPE = {
	importer_exporter : 'IE',
	channel_partner   : 'CP',
	service_provider  : 'SP',

};

export const USER_STATUS_COLOUR = {
	active   : '#4F4F4F',
	inactive : '#828282',
};

export const USER_STATUS_MAPPING = {
	active    : 'Active',
	inactive  : 'In-Active',
	affiliate : 'Affiliate',
};

export const STATUS_COLOUR = {
	pending  : '#D6B300',
	accepted : '#849E4C',
	invalid  : ' #BF291E',
};

export const ACTIVITY_STATUS = {
	rewarded    : '#ABCD62',
	provisional : '#c0392b',
};

export const FIRST_LEVEL_DATA = ['L1', 'L2', 'L3', 'L4', 'L5', 'L6', 'L7'];

export const SECOND_LEVEL_DATA = ['L1', 'L3', 'L6', 'L9', 'L12', 'L15', 'L17', 'L19'];

export const THIRD_LEVEL_DATA = ['L1', 'L10', 'L20', 'L30', 'L40', 'L50', 'L60'];

export const REFERRAL_TYPES = [
	{
		color : '#ABCD62',
		name  : 'KYC',
	},
	{
		color : '#88CAD1',
		name  : 'Shipment',
	},
	{
		color : '#FCDC00',
		name  : 'Subscription',
	},
];

export const TABS_OPTIONS = [
	{
		label : 'Invited',
		name  : 'invited',
	},
	{
		label : 'Signed Up',
		name  : 'signed_up',
	},
	{
		label : 'Have KYC Registered Orgs',
		name  : 'kyc_verified',
	},
	{
		label : 'Affiliates',
		name  : 'affiliate',
	},

];

export const BUSINESS_TAB_OPTIONS = [
	{
		label : 'Total',
		name  : 'total',
	},
	{
		label : 'KYC Verified',
		name  : 'kyc_verified',
	},
	{
		label : 'Shipment',
		name  : 'shipment',
	},
	{
		label : 'Subscription',
		name  : 'subscription',
	},
];

export const BUSINESS_REWARDS_OPTIONS = [
	{
		label : 'Total',
		name  : 'total',
	},
	{
		label : 'KYC',
		name  : 'kyc_verified',
	},
	{
		label : 'Shipment',
		name  : 'shipment',
	},
	{
		label : 'Subscription',
		name  : 'subscription',
	},
];

export const MAX_LEVEL = 30;
export const REVENUE_START_PRICE = 5000;
export const REVENUE_END_PRICE = 200000;

export const SUB_TITLE_OPTIONS = [
	{
		title : 'Pending',
		name  : 'pending',
	},
	{
		title : 'Accepted',
		name  : 'accepted',
	},
	{
		title : 'Rejected',
		name  : 'rejected',
	},
];

export const SIGN_UP_TITLE_OPTIONS = [
	{
		title : 'Users',
		name  : 'active_user_count',
	},
	{
		title : 'Affiliates',
		name  : 'affiliate_count',
	},
];
