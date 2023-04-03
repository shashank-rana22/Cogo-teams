const filtersSourceMapping = {
	hr_pip_stats: {
		right: [
			{ name: 'manager_id' },
			{ name: 'year', isClearable: false },
			{ name: 'month' },
			{ name: 'department' },
			{ name: 'designation' },
		],
	},
	hr_kpi_dashboard: {
		left: [
			{ name: 'department' },
			{ name: 'designation' },
			{ name: 'manager_name', placeholder: 'Search Manger' },
			{ name: 'year' },
			{ name: 'month' },
		],
	},
	hr_feedback: {
		left: [
			{ name: 'department' },
			{ name: 'designation' },
			{ name: 'manager_id' },
			{ name: 'year' },
			{ name: 'month' },
		],
		right: [
			{ name: 'manager_name' },
		],
	},
	hr_pip_dashboard: {
		left: [
			{ name: 'department' },
			{ name: 'designation' },
			{ name: 'manager_id' },
		],
		right: [
			{ name: 'manager_name' },
		],
	},
	uploaded_files: {
		left: [
			{ name: 'date_range' },
		],
	},
	user_dashboard: {
		left: [
			{ name: 'year' },
			{ name: 'month' },
			{ name: 'rating' },
		],
	},
};
export default filtersSourceMapping;
