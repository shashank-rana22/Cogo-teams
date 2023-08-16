const GRAPH_PROPS_MAPPING = {
	leaderboard: {
		margin: {
			top    : 0,
			right  : 0,
			bottom : 0,
			left   : 0,
		},
		enableGridX  : false,
		enableGridY  : false,
		axisBottom   : null,
		axisLeft     : null,
		enableArea   : false,
		enablePoints : false,
	},
	modal: {
		margin: {
			top    : 40,
			right  : 10,
			bottom : 80,
			left   : 80,
		},
		enableGridX : false,
		enableGridY : true,
		axisBottom  : {
			tickSize       : 5,
			tickPadding    : 5,
			tickRotation   : -45,
			legend         : 'Date',
			legendOffset   : 70,
			legendPosition : 'middle',
		},
		axisLeft: {
			tickSize       : 5,
			tickPadding    : 5,
			tickRotation   : 0,
			legend         : 'Engagement Score',
			legendOffset   : -70,
			legendPosition : 'middle',
		},
		enableArea   : true,
		enablePoints : true,
	},
};

export default GRAPH_PROPS_MAPPING;
