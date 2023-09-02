const exportFcl = [
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

const importFcl = [
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
	{
		name  : 'security_deposit',
		title : 'Security Deposits',
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
		export      : exportFcl,
		import      : importFcl,
		fcl_customs : commonTabs,
		fcl_local   : commonTabs,
	},
	lcl_freight: {
		export      : commonTabs,
		import      : commonTabs,
		lcl_customs : commonTabs,
	},
	fcl_cfs: {
		export : commonTabs,
		import : commonTabs,
	},
};

export default TABS;
