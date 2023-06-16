const FCL_COMMON_TABS = [
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

const FCL_EXPORT_TABS = [
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
			export: {
				title : 'Export',
				tabs  : FCL_EXPORT_TABS,
			},
			import: {
				title : 'Import',
				tabs  : FCL_EXPORT_TABS,
			},
			local: {
				title : 'FCL Local',
				tabs  : FCL_COMMON_TABS,
			},
			cfs: {
				title : 'FCL CFS',
				tabs  : FCL_COMMON_TABS,
			},
			custom: {
				title : 'FCL Custom',
				tabs  : FCL_COMMON_TABS,
			},
		},
	},

	lcl_freight: {
		title: 'LCL',

		segmented_tabs: {
			export: {
				title : 'Export',
				tabs  : LCL_COMMON_TABS,
			},
			import: {
				title : 'Import',
				tabs  : LCL_COMMON_TABS,
			},
		},
	},
};

export default TABS_CONFIG;
