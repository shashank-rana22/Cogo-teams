const commonTabs = [
	{
		name              : 'assigned',
		title             : 'New',
		isCriticalVisible : true,
	},
	{
		name              : 'in_progress',
		title             : 'In Progress',
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

const TABS = {
	fcl_freight: {
		import      : commonTabs,
		export      : commonTabs,
		fcl_customs : commonTabs,
		fcl_local   : commonTabs,
	},
	lcl_freight: {
		import      : commonTabs,
		export      : commonTabs,
		lcl_customs : commonTabs,
	},
};

export default TABS;
