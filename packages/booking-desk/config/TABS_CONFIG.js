const FCL_OTHER_TABS = [
	{
		name  : 'place_booking',
		title : 'Place Booking',
	},
	{
		name  : 'completed',
		title : 'Completed',
	},
	{
		name  : 'cancelled',
		title : 'Cancelled',
	},
];

const LCL_COMMON_TABS = [
	{
		name              : 'place_booking',
		title             : 'Place Booking',
		isCriticalVisible : true,
	},
	{
		name  : 'completed',
		title : 'Completed',
	},
	{
		name  : 'cancelled',
		title : 'Cancelled',
	},
];

const FCL_FREIGHT_TABS = [
	{
		name              : 'place_booking',
		title             : 'Place Booking',
		isCriticalVisible : true,
	},
	{
		name              : 'upload_bn',
		title             : 'Upload BN',
		isCriticalVisible : true,
	},
	{
		name              : 'amend_bn',
		title             : 'Amend BN',
		isCriticalVisible : true,
	},
	{
		name              : 'container_pick_up',
		title             : 'Container Pick Up',
		isCriticalVisible : true,
	},
	{
		name  : 'completed',
		title : 'Completed',
	},
	{
		name  : 'cancelled',
		title : 'Cancelled',
	},
];

const TABS_CONFIG = {
	fcl_freight: {
		title: 'FCL',

		segmented_tabs: {
			freight: {
				title : 'Freight',
				tabs  : FCL_FREIGHT_TABS,
			},
			local: {
				title : 'Local',
				tabs  : FCL_OTHER_TABS,
			},
			cfs: {
				title : 'CFS',
				tabs  : FCL_OTHER_TABS,
			},
			custom: {
				title : 'Custom',
				tabs  : FCL_OTHER_TABS,
			},
		},
	},

	lcl_freight: {
		title: 'LCL',

		segmented_tabs: {
			freight: {
				title : 'Freight',
				tabs  : LCL_COMMON_TABS,
			},
		},
	},
};

export default TABS_CONFIG;
