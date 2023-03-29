export const serviceDataMapping = {
	Ocean: {
		overall: {
			AR : 'overdueAmount',
			AP : 'overdueAmount',
		},
		import: {
			AR : 'totalOceanImportDue',
			AP : 'totalOceanImportDue',
		},
		export: {
			AR : 'totalOceanExportDue',
			AP : 'totalOceanExportDue',
		},
	},
	Air: {
		overall: {
			AR : 'overdueAmount',
			AP : 'overdueAmount',
		},
		import: {
			AR : 'totalAirImportDue',
			AP : 'totalAirImportDue',
		},
		export: {
			AR : 'totalAirExportDue',
			AP : 'totalAirExportDue',
		},
		other: {
			AR : 'totalAirOthersDue',
			AP : 'totalAirOthersDue',
		},
	},
	Surface: {
		overall: {
			AR : 'overdueAmount',
			AP : 'overdueAmount',
		},
		domestic: {
			AR : 'totalSurfaceDomesticDue',
			AP : 'totalSurfaceDomesticDue',
		},
		local: {
			AR : 'totalSurfaceLocalDue',
			AP : 'totalSurfaceLocalDue',
		},
	},

};
