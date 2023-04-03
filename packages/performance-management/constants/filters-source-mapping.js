const filtersSourceMapping = {
	hr_pip_stats: {
		left: [
			{ name: 'ManagerID' },
			{ name: 'Year', isClearable: false },
			{ name: 'Month' },
			{ name: 'Department' },
			{ name: 'Designation' },
		],
	},
	hr_kpi_dashboard: {
		left: [
			{ name: 'Department' },
			{ name: 'Designation' },
			{ name: 'manager_name', placeholder: 'Search Manger' },
			{ name: 'Year' },
			{ name: 'Month' },
		],
	},
	hr_feedback: {
		left: [
			{ name: 'Department' },
			{ name: 'Designation' },
			{ name: 'ManagerID' },
			{ name: 'Year' },
			{ name: 'Month' },
		],
		right: [
			{ name: 'manager_name' },
		],
	},
	hr_pip_dashboard: {
		left: [
			{ name: 'Department' },
			{ name: 'Designation' },
			{ name: 'ManagerID' },
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
			{ name: 'Year' },
			{ name: 'Month' },
			{ name: 'Rating' },
		],
	},
};
export default filtersSourceMapping;
