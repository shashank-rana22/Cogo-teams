const importExportFcl = [
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
	{
		name  : 'job_closed',
		title : 'Closed Jobs',
	},
];

const commonTabs = [
	{
		name  : 'assigned',
		title : 'New',
	},
	{
		name  : 'in_progress',
		title : 'In Progress',
	},
	{
		name  : 'completed',
		title : 'Completed',
	},
	{
		name  : 'cancelled',
		title : 'Cancelled',
	},
	{
		name  : 'job_closed',
		title : 'Closed Jobs',
	},
];

const TABS = {
	fcl_freight: {
		export      : importExportFcl,
		import      : importExportFcl,
		fcl_customs : commonTabs,
		fcl_local   : commonTabs,
	},
	lcl_freight: {
		export      : commonTabs,
		import      : commonTabs,
		lcl_customs : commonTabs,
	},
};

export default TABS;
