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
	Affiliate : 'affiliate',
};

export const STATUS_MAPPING = {
	invalid  : 'Referral Invalid',
	pending  : 'Verification Pending',
	accepted : 'Invite Accepted',
};

export const USER_TYPES = [
	{
		label : 'Affiliate',
		value : 'affiliate',
	},
	{
		label : 'Importer Exporter',
		value : 'importer_exporter',
	},
	{
		label : 'Channel Partner',
		value : 'channel_partner',
	},

];

export const ACTIVITY_STATUS = {
	rewarded    : '#ABCD62',
	provisional : '#c0392b',
};

export const listEmptyState = 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/list_emptystate.png';
export const cogopointImg = 'https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/cogopoints.svg';
